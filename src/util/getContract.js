import Web3 from 'web3'
import JSONInterface from '../../build/contracts/LicenseManager.json'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  // '0xb46e2d50cde22962b5b840107e1b652ad764988e' LOCAL GANACHE
  // '0xd73b1df53f329c7f50c2550a7cd40cbf61ae8c53' ROPSTEN ONLINE
  // '0x61fab8dc1e3f90436fda5cc9c92c3ffa2c632562' Truffle test instance.address
  let licenseContractInstance = new web3.eth.Contract(JSONInterface.abi, '0x61fab8dc1e3f90436fda5cc9c92c3ffa2c632562')
  licenseContractInstance.methods.test().call((err, res) => {
    if (!err) {
      console.log(res)
    } else {
      console.log(err)
    }
  })
  resolve(licenseContractInstance)
})
export default getContract
