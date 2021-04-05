export const reducer = function (state = {}, action) {
  switch (action.type) {
    case "START":
      return {...state, contract : state.contract};
    default:
      return state;
  }
};


export function addContractInfo(contract) {
	return {
	  type: 'START',
	  contract
	}
}
  