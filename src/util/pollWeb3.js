import Web3 from 'web3'
import {store} from '../store/'

let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      var tempCoinbase
      web3.eth.getCoinbase((err, res) => {
        if (!err) {
          tempCoinbase = res
        } else {
          console.log(err)
        }
      }).then(() => {
        if (tempCoinbase !== store.state.web3.coinbase) {
          let newCoinbase = tempCoinbase
          web3.eth.getBalance(newCoinbase, function (err, newBalance) {
            if (err) {
              console.log(err)
            } else {
              store.dispatch('pollWeb3', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10)
              })
            }
          })
        } else {
          web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
            if (err) {
              console.log(err)
            } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
              store.dispatch('pollWeb3', {
                coinbase: store.state.web3.coinbase,
                balance: polledBalance
              })
            }
          })
        }
      })
    }
  }, 2000)
}

export default pollWeb3
