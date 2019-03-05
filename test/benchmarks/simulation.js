// 200 Accounts

var LicenseManager = artifacts.require("./contracts/LicenseManager.sol");
// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")
module.exports = async function (callback) {
    let instance = await LicenseManager.deployed();
    // console.log(instance);
    var result = await instance.products(0);
    console.log(result);
}
