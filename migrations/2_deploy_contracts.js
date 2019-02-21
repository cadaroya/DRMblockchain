var Users = artifacts.require("./Users.sol");
var ProductManager = artifacts.require("./ProductManager.sol");
var LicenseManager = artifacts.require("./LicenseManager.sol");
var ECRecovery = artifacts.require("installed_contracts/zeppelin/contracts/ECRecovery.sol");

/*
module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(ProductManager).then( () =>{
    return deployer.deploy(LicenseManager);
  });
  
};
*/

async function doDeploy(deployer) {
  await deployer.deploy(Users);
  await deployer.deploy(ECRecovery);
  await deployer.link(ECRecovery, ProductManager);
  await deployer.deploy(ProductManager);
  await deployer.link(ECRecovery, LicenseManager);
  await deployer.deploy(LicenseManager);
  
}


module.exports = (deployer) => {
  deployer.then(async () => {
      await doDeploy(deployer);
  });
};