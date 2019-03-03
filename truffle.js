var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "v3/364927086af848659e0a9847cba3f183";
var mnemonic = "cook slight another cart museum strategy disorder remove try tray believe help";// "twelve words you can find in metamask/settings/reveal seed words";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 4000000,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      gas: 3000000,
      network_id: 3
      // truffle migrate --reset --compile-all --network ropsten
    }
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'CHF',
      gasPrice: 21,
      onlyCalledMethods: false,
    }
  }
};
