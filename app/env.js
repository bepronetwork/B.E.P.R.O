import { store } from "./redux/reducer";

export const BEPRO_PRICE = process.env.BEPRO_PRICE;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const ENV =  process.env.ENV;


export const getContract = async () => {
    let contract = global.app.getERC721Collectibles({contractAddress : CONTRACT_ADDRESS})
    await contract.__init__();
    return contract;
}