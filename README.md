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

### Install Node, Ganache GUI, Metamask

- Node: https://nodejs.org/en/
- Ganache: https://truffleframework.com/ganache
- Metamask: https://metamask.io/

### Setup Dev folder

- Clone repo: `git clone https://github.com/cadaroya/DRMblockchain`
- Install truffle: `npm install -g truffle`
- Ganache CLI: `npm install -g ethereumjs-testrpc`
- Install dependencies: `npm install`

### Start Listening to ports

- To run VueJS: `npm run start` in the project directory (port 8080)
- To start fake blockchain for development: `testrpc` (default on 8545)

### Sync testrpc to Ganache GUI

- Note the `port` and `mnemonic` when running the `testrpc` command.
- Start Ganache GUI, then click settings (top-right)
- Under SERVER tab, change `port` number accordingly.
- Under ACCOUNTS AND KEYS, change `mnemonic` accordingly.
- Press save and restart

