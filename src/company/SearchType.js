import React from "react";
import { Dropdown } from "semantic-ui-react";
import { handlers } from "../../controls/search/search";

//Adding action arrays for authorization
const SearchExternalAccountAction = [];
const SearchOrderNumberAction = [];
const RRNAction = [];
const ReloaditAction = [];

const balanceInquiryAction = {
  name: "balanceInquiry",
  content: "Balance Inquiry",
  handler: "balanceInquiry"
};
const resendEGiftAction = {
  name: "resendEGift",
  content: "Resend eGift",
  handler: "resendEGift"
};
const suspendEGiftAction = {
  name: "suspendEGift",
  content: "Suspend eGift",
  handler: "suspendEGift"
};
const unsuspendEGiftAction = {
  name: "unsuspendEGift",
  content: "Unsuspend eGift",
  handler: "unsuspendEGift"
};
const voidEGiftAction = {
  name: "voidEGift",
  content: "Void eGift",
  handler: "voidEGift"
};

const SearchType = state => {
  const _handleChange = (e, { value }) => {
    if (value === "externalAccountNumber") {
      handlers.selectExternalAccountNumber(SearchExternalAccountAction);
    }

    if (value === "orderNumber") {
      handlers.selectOrderNumber(SearchOrderNumberAction);
    }

    if (value === "rrn") {
      handlers.selectRRN(RRNAction);
    }

    if (value === "reloadIt") {
      handlers.selectReloadIt(ReloaditAction);
    }
  };

  const options = [];
  /* Please do not delete these 2 lines; it's used for debugging if required
  console.log("Test:" + Array.isArray(state.userInfo.auth.Reloadit));
  console.log("Test2:" + state.userInfo.auth.Reloadit.indexOf("balanceEnquiry"));
  */

  //SearchExternalAccount
  if (
    true ||
    (state.userInfo.memberOf !== "NoUser" &&
      state.userInfo.auth.hasOwnProperty("SearchExternalAccount"))
  ) {
    options.push({
      key: "1",
      text: "External Account Number",
      value: "externalAccountNumber"
    });
    if (
      true ||
      state.userInfo.auth.SearchExternalAccount.indexOf("balanceEnquiry") !== -1
    ) {
      if (SearchExternalAccountAction.indexOf(balanceInquiryAction) === -1)
        SearchExternalAccountAction.push(balanceInquiryAction);
    }
  }

  //SearchOrderNumber
  if (
    true ||
    (state.userInfo.memberOf !== "NoUser" &&
      state.userInfo.auth.hasOwnProperty("SearchOrderNumber"))
  ) {
    options.push({
      key: "2",
      text: "External Order Number",
      value: "orderNumber"
    });
    if (
      true ||
      state.userInfo.auth.SearchOrderNumber.indexOf("resendEgift") !== -1
    ) {
      if (SearchOrderNumberAction.indexOf(resendEGiftAction) === -1)
        SearchOrderNumberAction.push(resendEGiftAction);
    }
  }

  //RRN
  if (
    true ||
    (state.userInfo.memberOf !== "NoUser" &&
      state.userInfo.auth.hasOwnProperty("RRN"))
  ) {
    options.push({
      key: "3",
      text: "RRN",
      value: "rrn"
    });
    if (true || state.userInfo.auth.RRN.indexOf("suspend") !== -1) {
      if (RRNAction.indexOf(suspendEGiftAction) === -1)
        RRNAction.push(suspendEGiftAction);
    }
    if (true || state.userInfo.auth.RRN.indexOf("unsuspend") !== -1) {
      if (RRNAction.indexOf(unsuspendEGiftAction) === -1)
        RRNAction.push(unsuspendEGiftAction);
    }
    if (true || state.userInfo.auth.RRN.indexOf("void") !== -1) {
      if (RRNAction.indexOf(voidEGiftAction) === -1)
        RRNAction.push(voidEGiftAction);
    }
  }

  //Reloadit
  if (
    true ||
    (state.userInfo.memberOf !== "NoUser" &&
      state.userInfo.auth.hasOwnProperty("Reloadit"))
  ) {
    options.push({
      key: "4",
      text: "ReloadIt",
      value: "reloadIt"
    });
    if (true || state.userInfo.auth.Reloadit.indexOf("balanceEnquiry") !== -1) {
      if (ReloaditAction.indexOf(balanceInquiryAction) === -1)
        ReloaditAction.push(balanceInquiryAction);
    }
  }

  //{/*<Dropdown options={options} placeholder='Select Search Type' selection fluid onChange={_handleChange} defaultValue={'cardNumber'} />*/}
  return (
    <Dropdown
      options={options}
      selection
      fluid
      onChange={_handleChange}
      defaultValue={"externalAccountNumber"}
    />
  );
};

export default SearchType;
