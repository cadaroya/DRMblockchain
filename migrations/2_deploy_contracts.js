var Users = artifacts.require("./Users.sol");
var ProductManager = artifacts.require("./ProductManager.sol");
var LicenseManager = artifacts.require("./LicenseManager.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
<<<<<<< HEAD
  deployer.deploy(ProductManager);
  deployer.deploy(LicenseManager);
=======
  deployer.deploy(ProductManager).then( () =>{
    return deployer.deploy(LicenseManager);
  });
  
>>>>>>> e178e17c1c43eb80d63fda5503ec618f8dc1728d
};
