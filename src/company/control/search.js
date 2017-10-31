import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {
  lensProp,
  compose,
  set,
  flip,
  apply,
  append,
  merge,
  mergeAll,
  view,
  propOr,
  dissoc
} from "ramda";
import { ajax } from "rxjs/observable/dom/ajax";

const selectCardNumber$ = new Subject();
const selectExternalAccountNumber$ = new Subject();
const selectOrderNumber$ = new Subject();
const selectRRN$ = new Subject();
const selectReloadIt$ = new Subject();
const myAsync$ = new Subject();
const searchExternal$ = new Subject();
const searchOrder$ = new Subject();
const searchRRN$ = new Subject();
const searchReloadit$ = new Subject();
const externalChanged$ = new Subject();
const orderChanged$ = new Subject();
const rrnChanged$ = new Subject();
const reloaditChanged$ = new Subject();
const balanceInquiry$ = new Subject();
const resendEGift$ = new Subject();
const dateCriteria$ = new Subject();
const country$ = new Subject();
const rangeStart$ = new Subject();
const rangeEnd$ = new Subject();
const searchReloaditExtension$ = new Subject();
const popupOpen$ = new Subject();
const popupClose$ = new Subject;
const extensionOpen$ = new Subject();
const extensionClose$ = new Subject();


export const handlers = {
  selectCardNumber: val => selectCardNumber$.next(val),
  selectExternalAccountNumber: val => selectExternalAccountNumber$.next(val),
  selectOrderNumber: val => selectOrderNumber$.next(val),
  selectRRN: val => selectRRN$.next(val),
  selectReloadIt: val => selectReloadIt$.next(val),

  searchExternal: () => searchExternal$.next(),
  searchOrder: () => searchOrder$.next(),
  searchRRN: () => searchRRN$.next(),
  searchReloadit: () => searchReloadit$.next(),

  externalChanged: val => externalChanged$.next(val),
  orderChanged: val => orderChanged$.next(val),
  rrnChanged: val => rrnChanged$.next(val),
  reloaditChanged: val => reloaditChanged$.next(val),

  balanceInquiry: val => balanceInquiry$.next(val),
  resendEGift: val => resendEGift$.next(val),

  dateCriteria: val => dateCriteria$.next(val),
  country: val => country$.next(val),
  rangeStart: val => rangeStart$.next(val),
  rangeEnd: val => rangeEnd$.next(val),
  searchReloaditExtension: () => searchReloaditExtension$.next(),

  popupOpen: val => popupOpen$.next(val),
  popupClose: val => popupClose$.next(val),
  extensionOpen: () => extensionOpen$.next(),

  extensionClose: () => extensionClose$.next(),

};


const popupOpenStream$ = popupOpen$.map(currentState => state => flip(append)([])(merge(currentState, { isPopupOpen: false })));
const popupCloseStream$ = popupClose$.next(currentState => state => flip(append)([])(merge(currentState, dissoc('isPopupOpen', state))));
const extensionOpenStream$ = extensionOpen$.map(() => state => flip(append)([])(merge(state, { isExtensionOpen: true })));
const extensionCloseStream$ = extensionClose$.map(() => state => flip(append)([])(merge(state, { isExtensionOpen: false })));



const init = (
  placeholder,
  inputValue,
  inputAction,
  searchAction,
  content,
  selections,
  disabled,
  loader // to show/hide loader when search button is clicked
) =>
  compose(
    set(lensProp("payload"))({}),
    set(lensProp("placeholder"))(placeholder),
    set(lensProp("content"))(content),
    set(lensProp("inputValue"))(inputValue),
    set(lensProp("inputAction"))(inputAction),
    set(lensProp("selections"))(selections),
    set(lensProp("disabled"))(disabled),
    set(lensProp("loader"))(loader),
    set(lensProp("searchAction"))(searchAction),
    set(lensProp("transactionRecords"))(undefined)
  );

const selectExternalAccountNumberCmd = val => state =>
  flip(append)([])(
    init(
      "Enter Card Number...",
      "",
      "externalChanged",
      "searchExternal",
      "Search",
      [
        {
          name: "balanceInquiry",
          content: "Balance Inquiry",
          handler: "balanceInquiry"
        }
      ],
      true,
      false //hide loader during init
    )(state)
  );

export default Observable.merge(
    popupOpenStream$,
    extensionOpenStream$,
    extensionCloseStream$,

  dateCriteria$
    .map(dateCriteria => state =>
      flip(append)([])(merge(state, { dateCriteria }))
    )
    .startWith(
      (val => state => flip(append)([])(merge(state, { dateCriteria: val })))(
        "Last30days"
      )
    ),

  country$.map(country => state => flip(append)([])(merge(state, { country }))),

  rangeStart$.map(start => state => {
    const { dateStart, timeStart } = start;
    return flip(append)([])(mergeAll([state, { dateStart }, { timeStart }]));
  }),

  rangeEnd$.map(end => state => {
    const { dateEnd, timeEnd } = end;
    return flip(append)([])(mergeAll([state, { dateEnd }, { timeEnd }]));
  }),

  searchReloaditExtension$.map(() => state => {
    const term = state.inputValue;
    const extension = true;
    const country = state.country || "''";
    const dateCriteria = state.dateCriteria || "''";
    const dateStart = state.dateStart || "''";
    const dateEnd = state.dateEnd || "''";
    const timeStart = state.timeStart || "''";
    const timeEnd = state.timeEnd || "''";

    const URL = `/api/reloadit?cardNumber=${term}&country=${country}&dateCriteria=${dateCriteria}&dateStart=${dateStart}&dateEnd=${dateEnd}&filter=${extension}&timeStart=${timeStart}&timeEnd=${timeEnd}`;

    Observable.of({})
      .switchMap(() => ajax.getJSON(URL))
      .map(response => {
        console.log("#### reloadit response: ", response);
        return response;
      })
      .map(response => response.transactionRecords)
      .subscribe(transactionRecords => {
        Observable.concat(
            myAsync$.next(Object.assign(state, { transactionRecords })),
            extensionCloseStream$.next(Object.assign(state, { transactionRecords }))
        );
      });
  }),

  selectExternalAccountNumber$
    .map(selectExternalAccountNumberCmd)
    .startWith(selectExternalAccountNumberCmd("searchExternal")),

  selectOrderNumber$.map(val => state =>
    flip(append)([])(
      init(
        "Enter Order Number...",
        "",
        "orderChanged",
        "searchOrder",
        "Search",
        /*[
          {
            name: "resendEGift",
            content: "Resend eGift",
            handler: "resendEGift"
          }
        ],*/
        val,
        true,
        false //hide loader during init
      )(state)
    )
  ),

  selectRRN$.map(val => state =>
    flip(append)([])(
      init(
        "Enter RRN Number...",
        "",
        "rrnChanged",
        "searchRRN",
        "Search",
        /*
        [
          {
            name: "suspendEGift",
            content: "Suspend eGift",
            handler: "suspendEGift"
          },
          {
            name: "unsuspendEGift",
            content: "Unsuspend eGift",
            handler: "unsuspendEGift"
          },
          {
            name: "voidEGift",
            content: "Void eGift",
            handler: "voidEGift"
          }
        ],*/
        val,
        true,
        false //hide loader during init
      )(state)
    )
  ),

  selectReloadIt$.map(val => state =>
    flip(append)([])(
      init(
        "Enter Card Number...",
        "",
        "reloaditChanged",
        "searchReloadit",
        "Search",
        /*[
          {
            name: "balanceInquiry",
            content: "Balance Inquiry",
            handler: "balanceInquiry"
          }
        ],*/
        val,
        false,
        false //hide loader during init
      )(state)
    )
  ),

  searchExternal$.map(() => state => {
    if (state != null && state !== "undefined") {
      const term = state.inputValue;
      const URL = `/api/transactions?externalCardNumber=${term}&genre=physical`;
      // change search button to loading
      state.loader = true;

      Observable.of({})
        .switchMap(() => ajax.getJSON(URL))
        .map(response => {
          state.loader = false;
          return response;
        })
        .map(response => response.transactionRecords)
        .subscribe(transactionRecords => {
          console.log("items: ", transactionRecords);
          myAsync$.next(Object.assign(state, { transactionRecords }));
        });
    }
  }),

  searchOrder$.map(() => state => {
    if (state != null && state !== "undefined") {
      const term = state.inputValue;
      const URL = `/api/transactions?externalCardNumber=${term}&genre=digital`;
      // change search button to loading
      state.loader = true;

      Observable.of({})
        .switchMap(() => ajax.getJSON(URL))
        .map(response => {
          state.loader = false;
          return response;
        })
        .map(response => response.transactionRecords)
        .subscribe(transactionRecords => {
          console.log("#### items: ", transactionRecords);
          myAsync$.next(Object.assign(state, { transactionRecords }));
        });
    }
  }),

  searchRRN$.map(() => state => {
    if (state != null && state !== "undefined") {
      const term = state.inputValue;
      const URL = `/api/egift?RRN=${term}&tenantId=BHN Digital Testing`;
      state.loader = true;

      Observable.of({})
        .switchMap(() => ajax.getJSON(URL))
        .map(response => {
          state.loader = false;
          if (response.status === "404") {
            alert(response.statusMessage);
          }

          return response;
        })
        .map(response => response.egiftResult)
        .subscribe(egiftRecords => {
          if (egiftRecords !== null) {
            console.log("#### items: ", egiftRecords);
            myAsync$.next(Object.assign(state, { egiftRecords }));
          }
        });
    }
  }),

  searchReloadit$.map(() => state => {
    if (state != null && state !== "undefined") {
      const term = state.inputValue;
      const extension = false;
      // change search button to loading
      state.loader = true;
      const URL = `/api/reloadit?cardNumber=${term}&country=''&dateCriteria=''&dateStart=''&dateEnd=''&filter=${extension}&timeStart=''&timeEnd=''`;

      Observable.of({})
        .switchMap(() => ajax.getJSON(URL))
        .map(response => {
          console.log("#### reloadit response: ", response);
          state.loader = false;
          return response;
        })
        .map(response => response.transactionRecords)
        .subscribe(transactionRecords => {
          console.log("#### items: ", transactionRecords);
          myAsync$.next(Object.assign(state, { transactionRecords }));
        });
    }
  }),

  externalChanged$.map(val => state =>
    flip(append)([])(Object.assign(state, { inputValue: val }))
  ),

  orderChanged$.map(val => state =>
    flip(append)([])(Object.assign(state, { inputValue: val }))
  ),

  rrnChanged$.map(val => state =>
    flip(append)([])(Object.assign(state, { inputValue: val }))
  ),

  reloaditChanged$.map(val => state =>
    flip(append)([])(Object.assign(state, { inputValue: val }))
  ),

  myAsync$.map(currentState => state =>
    flip(append)([])(merge(currentState, state))
  ),

    balanceInquiry$.map(val => state => {
      //cardNumber=6039535000912727621
      console.log("balance inquiry - card number", val);
      const cardNumber = "6039535000912727621";

      Observable.of({})
      // .switchMap(() => ajax.getJSON(`/api/balanceInquiry?cardNumber=${val}&upc=02113001520&pin=7621`))
          .switchMap(() =>
              ajax.getJSON(
                  `/api/balanceInquiry?cardNumber=${cardNumber}&upc=02113001520&pin=7621`
              )
          )
          .subscribe(balanceResult => {

            Observable.concat(
                myAsync$.next(Object.assign(state, { balanceResults: balanceResult })),
                popupOpenStream$.next(Object.assign(state, { balanceResults: balanceResult }))
            );
          });
    }),



  resendEGift$.map(val => state => {
    console.log("resend eGift card number", val);
    Observable.of({})
      .switchMap(() =>
        ajax.getJSON(`/api/resendEgift?cardNumber=6039535000912727621`)
      )
      .subscribe(resendResult => {
        console.log("======resend egift results-----: ", resendResult);


        Observable.concat(
            myAsync$.next(Object.assign(state, { resendResults: resendResult })),
            popupOpenStream$.next(Object.assign(state, { resendResults: resendResult }))
        );
        //myAsync$.next(Object.assign(state, { resendResults: resendResult }));
      });
  })
).scan(flip(apply), [{}]);
