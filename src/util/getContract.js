import Web3 from 'web3'
import {address, ABI} from './constants/licenseContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let licenseContract = web3.eth.contract(ABI)
  let licenseContractInstance = licenseContract.at(address)
  // casinoContractInstance = () => casinoContractInstance
  resolve(licenseContractInstance)
})
export default getContract
