import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";
const initialStateAccount = { balance: 0, loan: 0, loanPurpose: "" };

const initialStateCustomer = { fullName: "", nationalID: "", createdAt: "" };

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loan,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch({ type: "account/deposite", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 100 });

// console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { loan: 600, loanPurpose: "buy ps5" },
});

// console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("mohsen usefi", "24"));

console.log(store.getState());
