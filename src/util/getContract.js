import Web3 from 'web3'
import JSONInterface from '../../build/contracts/LicenseManager.json'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let licenseContract = web3.eth.contract(JSONInterface.abi)
  let licenseContractInstance = licenseContract.at('0x044C797182A5b005A77bd70ce78263919b831BFC')
  // licenseContractInstance = () => licenseContractInstance
  // resolve(licenseContractInstance)
  resolve(licenseContractInstance)
})
export default getContract
