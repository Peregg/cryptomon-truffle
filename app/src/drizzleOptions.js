import Web3 from "web3";
import CryptomonContract from "contracts/CryptomonContract.json";

let customProvider = new Web3('ws://127.0.0.1:7545');

// Is there is an injected web3 instance?
if (typeof Web3 !== 'undefined') {
  customProvider = Web3.currentProvider;
}

const options = {
  web3: {
    block: false,
    customProvider,
  },
  contracts: [CryptomonContract],
  events: {
    // SimpleStorage: ["StorageSet"],
  },
};

export default options;
