import React from "react";
import { compose } from "ramda";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PopupMenu from "./PopupMenu";

/*
accountId
createdTimestamp
creatorId
eGiftDetails
giftAmount
giftCurrency
giftFrom
giftTo
hasBeenViewed
status
*/
function getContentFn(props) {
  const headerColumn = {
    Header: "Egift Records",
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
        Header: "accountId",

        accessor: "accountId"
      },
      {
        Header: "tenantId",

        accessor: "tenantId"
      },
      {
        Header: "Balance",

        accessor: "balance"
      },
      {
        Header: "Balance as of",

        accessor: "balanceAsOf"
      },

      {
        Header: "Card Number",

        accessor: "accountNumber"
      },
      {
        Header: "Account Status",

        accessor: "acctStatus"
      },

      {
        Header: "createdTimestamp",

        accessor: "createdTimestamp"
      },
      {
        Header: "creatorId",

        accessor: "creatorId"
      },

      {
        Header: "giftAmount",

        accessor: "giftAmount"
      },
      {
        Header: "giftCurrency",

        accessor: "giftCurrency"
      },

      {
        Header: "giftFrom",

        accessor: "giftFrom"
      },
      {
        Header: "giftTo",

        accessor: "giftTo"
      },

      {
        Header: "status",

        accessor: "status"
      }
    ]
  };

  var data;
  if (props["0"]) {
    data = props["0"].egiftRecords;
  }

  return { data, headerColumn };
}

function withContent(fn) {
  return function(Component) {
    return function(props) {
      const { data, headerColumn } = fn(props);
      return Component(data, headerColumn);
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

const SearchEgiftTable = compose(withContent(getContentFn))(
  TableWrapper(ReactTable)
);

export default SearchEgiftTable;
