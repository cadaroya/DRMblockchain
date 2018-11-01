# DRMblockchain
CS 198 Requirement for S.Y. 2018-2019

## Tutorials

1. For basic understanding of solidity: https://cryptozombies.io
2. 3 MIN Introduction vid: https://www.youtube.com/watch?v=OdN10MnU5gs
3. Election DAPP 2HR: https://www.youtube.com/watch?v=3681ZYbDSSk
4. Ganache Setup: https://www.youtube.com/watch?v=aRJA1r1Gwu0


## Basis 
1. https://github.com/cryppadotta/dotta-license

## Configuration Instructions

### Install Node, Ganache GUI, Metamask, and Node-gyp

- Node: https://nodejs.org/en/
- Ganache: https://truffleframework.com/ganache
- Metamask: https://metamask.io/
- Node-gyp: https://github.com/nodejs/node-gyp (To allow web3 1.0 to be installed)

### Setup Dev folder

- Clone repo: `git clone https://github.com/cadaroya/DRMblockchain`
- Install truffle: `npm install -g truffle`
- Ganache CLI: `npm install -g ethereumjs-testrpc`
- Install dependencies: `npm install`

### Start Listening to ports

- To run VueJS: `npm run start` in the project directory (port 8080)
- To start fake blockchain for development: run Ganache GUI on port 8545

### Setting up Ganache GUI

- Go to `settings` by pressing the top right gear
- At `Accounts & Keys` set the mnemonic to `because swear fall artwork prosper harvest mixture birth width music hurry acquire`

### Connecting web3 and contract deployed in Ganache (upon modification of a .sol file)
- Open a powershell console in project directory then run `truffle migrate --reset`.
- When contracts are generated, the contract addresses will be displayed in the console. Note the address for `LicenseManager`
- Navigate to drmblockchain/src/util/getContract
- In line 6, change the contract address that you noted in the earlier step


