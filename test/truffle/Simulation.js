var LicenseManager = artifacts.require("./contracts/LicenseManager.sol");
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


var nUsers = 2;
var nTxns = 1;
contract('LicenseManager', async accounts => {
    let instance = null;

    beforeEach(async () => {
        instance = await LicenseManager.deployed();
    });

    it("Should simulataneously register products", async () => {

        console.log(nTxns);

        async function doRegisterTransaction(productName, productDescription, count,i){
            web3.eth.defaultAccount = accounts[i];
            messageHash = await web3.utils.soliditySha3(productName);
            messageSign = await web3.eth.sign(messageHash, accounts[i]);
            console.log("This signature is from ACCOUNT#" + i);
            console.log(messageSign);
            return instance.registerProduct(count, '50', '1000', '1000', '10000', productName, productDescription, '1', messageHash, messageSign, {from: accounts[i]});
        }

        // 2, 20, 200 Accounts
        // Each account does use cases 20 times
        // Use cases : Register, Purchase, Verify, Transfer
        // Over a period of time
        // TPS = (2,20,200)*20/period of time in seconds OR real time

        console.log("Im here");

        var promises = new Array(nUsers * nTxns);
        var count = 1;

        for(var i = 0; i < nUsers; i++){
            for(var j = 0; j < nTxns; j++){
                var productName = 'TestProduct' + count.toString();
                var productDescription = 'TestDescription' + count.toString();
                promises[count-1]  = doRegisterTransaction(productName, productDescription, count,i);
                count = count + 1;
            }
        }

        console.log("Im here d " + count);

        console.log("FIRST Promises count: " + (count-1));
        var txnList = await Promise.all(promises);
        console.log("Done");
    });

    
    it("should simultaneously purchase licenses", async ()=>{
        async function doPurchaseTransaction(productId, affiliate, count,i){
            web3.eth.defaultAccount = accounts[i];
            var hashedMessage = await web3.utils.soliditySha3("HashThisString" + count.toString());
            var consumerSign = await web3.eth.sign(hashedMessage, accounts[i]);
            console.log("purchase product #: " + productId);
            console.log((await instance.products(1))[10]);
            return instance.purchaseLicense(productId, 1, 1, affiliate, hashedMessage, consumerSign, {from: accounts[i]});
        }

        var promises = new Array(nUsers * nTxns);
        var count = 1;

        for(var i = 1; i < nUsers; i++){
            var affiliate = accounts[(i+1)%nUsers];
            console.log("STARTING!!! step " + i);
            for(var j = 1; j <= nTxns; j++){
                var productId = ((i+1)*nTxns)%(nUsers*nTxns)+j;
                console.log(await doPurchaseTransaction(productId, affiliate, count,i));
                //promises[count-1] =  doPurchaseTransaction(productId, affiliate, count,i);
                count = count + 1; 
            }
            console.log("Account #"+i + "has AFFILIATE: Account #" + ((i+1)%nUsers));
            console.log("& Will purchase From product " + (((i+1)*nTxns)%(nUsers*nTxns)+1) + "to " + (((i+1)*nTxns)%(nUsers*nTxns)+nTxns));
        }

        console.log("SECOND Promises count: " + (count-1));
        //var txnList = await Promise.all(promises);
        //console.log(txnList)
        console.log("Done");

    })
    

});