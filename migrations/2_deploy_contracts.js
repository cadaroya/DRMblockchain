var Users = artifacts.require("./Users.sol");
var ProductManager = artifacts.require("./ProductManager.sol");
var LicenseManager = artifacts.require("./LicenseManager.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(ProductManager).then( () =>{
    return deployer.deploy(LicenseManager);
  });
  
};
