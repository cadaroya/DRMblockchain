import Web3 from 'web3'
import JSONInterface from '../../build/contracts/LicenseManager.json'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let licenseContractInstance = new web3.eth.Contract(JSONInterface.abi, '0xe33e08cface501961a3c50b10378ea0ddc5f93f9')
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
