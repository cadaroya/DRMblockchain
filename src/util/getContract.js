import Web3 from 'web3'
import JSONInterface from '../../build/contracts/LicenseManager.json'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  // '0x582e81be13caffc69753108296be075c6059c425' LOCAL GANACHE
  // '0xd73b1df53f329c7f50c2550a7cd40cbf61ae8c53' ROPSTEN ONLINE
  let licenseContractInstance = new web3.eth.Contract(JSONInterface.abi, '0x582e81be13caffc69753108296be075c6059c425')
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
