import { createStore } from 'redux';


export const reducer = function (state = {}, action) {
  switch (action.type) {
    case "START":{
      return {...state, contract : action.contract};
    }
    case "LOG":{
      return {...state, address : action.address};
    }
    default:
      return state;
  }
};
export const store = createStore(reducer);


export function addContractInfo(contract) {
	return {
	  type: 'START',
	  contract
	}
}
  


export function log(address) {
	return {
	  type: 'LOG',
	  address
	}
}
  