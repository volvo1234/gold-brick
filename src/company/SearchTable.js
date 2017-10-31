import React from "react";
import { compose, view, lensProp } from "ramda";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PopupMenu from "./PopupMenu";
import { Modal, Header } from "semantic-ui-react";

const MyModal = (open, item) => {
  const accountNumber = view(lensProp("accountNumber"), item);
  const balance = view(lensProp("balance"), item);
  return (
    <Modal open={open}>
      <Modal.Header>Balance Inquiry</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Account Number: {accountNumber}</Header>
          <Header>Balance: {balance}</Header>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};


const ResendModal = (open, item) => {
  const transactionId = view(lensProp("transactionId"), item);
  const isCompleted = view(lensProp("isCompleted"), item);
  return (
      <Modal open={open}>
        <Modal.Header>Resend E-Gift</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>transactionId: {transactionId}</Header>
            <Header>isCompleted: {isCompleted}</Header>
          </Modal.Description>
        </Modal.Content>
      </Modal>
  );
};

function getContentFn(props) {
  const headerColumn = {
    Header: "Transaction Records",
    columns: [
      {
        Header: "Action",
        Cell: row => {
          const newProps = Object.assign({}, props["0"], {
            cardNumber: row.original.cardNumber
          });
          return PopupMenu(newProps);
        }
      },
      {
        Header: "Transaction Time (PDT)",

        accessor: "transactionTimestamp"
      },
      {
        Header: "Card Number",

        accessor: "cardNumber"
      },
      {
        Header: "Merchant Id",

        accessor: "merchantId"
      },
      {
        Header: "Merchant Name",

        accessor: "merchantName"
      },
      {
        Header: "Product Id",

        accessor: "UPC"
      },
      {
        Header: "Product Name",

        accessor: "productName"
      },

      {
        Header: "Store Id",

        accessor: "storeId"
      },
      {
        Header: "Store Name",

        accessor: "storeName"
      },

      {
        Header: "Terminal Id",

        accessor: "terminalId"
      },

      {
        Header: "Amount ($)",

        accessor: "transactionAmount"
      },

      {
        Header: "Status",

        accessor: "transactionStatus.status"
      },
      {
        Header: "Transaction Type",

        accessor: "transactionType"
      },

      {
        Header: "Message Type",

        accessor: "messageType"
      },
      {
        Header: "Retrieval Reference Number",

        accessor: "retrievalReferenceNumber"
      },
      {
        Header: "Redemption Account Number",
        show: false,
        accessor: "redemptionAccountNumber"
      },
      {
        Header: "PIN",
        show: false,
        accessor: "pin"
      }
    ]
  };

  var data;
  if (props["0"]) {
    data = props["0"].transactionRecords;
  }

  return { data, headerColumn };
}



function withContent(fn) {
  return function(Component) {
    return function(props) {
      const { data, headerColumn } = fn(props);
      // const open = props["0"].balanceResults ? true : false;
      const open = props["0"].resendResults ? true : false;
      return (
          <div>
            {ResendModal(open, props["0"].resendResults)}
            {Component(data, headerColumn)}
          </div>
      );
    };
  };
}

function TableWrapper(Component) {
  return function(data, headerColumn) {
    return (
      <Component
        data={data}
        columns={[headerColumn]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  };
}

const SearchTable = compose(withContent(getContentFn))(
  TableWrapper(ReactTable)
);

export default SearchTable;
