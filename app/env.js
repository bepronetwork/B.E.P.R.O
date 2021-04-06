import { store } from "./redux/reducer";

console.log(process.env.REACT_APP_BEPRO_PRICE)
export const BEPRO_PRICE = 0.019;



export const getContract = async () => {
    console.log("store", store.getState())
    let contract = global.app.getERC721Collectibles({contractAddress : store.getState().contract.getAddress()})
    await contract.__init__();
    return contract;
}