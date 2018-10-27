var Users = artifacts.require("./Users.sol");
var ProductManager = artifacts.require("./ProductManager.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(ProductManager);
};
