var LicenseManager = artifacts.require("./contracts/LicenseManager.sol");
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


var nUsers = 2;
var nTxns = 2;
contract('LicenseManager', async accounts => {
    let instance = null;

    beforeEach(async () => {
        instance = await LicenseManager.deployed();
    });

    it("Should simulataneously register products", async () => {
        console.time("AllRegister");
        console.log(nTxns);

        async function doRegisterTransaction(count,i){
            var productName = 'TestProduct' + count.toString();
            var productDescription = 'TestDescription' + count.toString();
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
            // web3.eth.defaultAccount = accounts[i];
            for(var j = 0; j < nTxns; j++){
                //promises[count-1]  = doRegisterTransaction(count,i);
                console.time("User["+ i + "]Register[" + j +"]");
                var productName = 'TestProduct' + count.toString();
                var productDescription = 'TestDescription' + count.toString();
                messageHash = await web3.utils.soliditySha3(productName);
                messageSign = await web3.eth.sign(messageHash, accounts[i]);
                console.log("This signature is from ACCOUNT#" + i);
                console.log(messageSign);
                await instance.registerProduct(count, '50', '1000', '1000', '10000', productName, productDescription, '1', messageHash, messageSign, {from: accounts[i]});
                count = count + 1;
                console.timeEnd("User["+ i + "]Register[" + j +"]");
            }
        }

        console.log("Im here d " + count);

        console.log("FIRST Promises count: " + (count-1));
        var txnList = await Promise.all(promises);
        console.log("Done");
        console.timeEnd("AllRegister");
    });

    
    it("should simultaneously purchase licenses", async ()=>{
        console.time("AllPurchase");
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
        
        for(var i = 0; i < nUsers; i++){
            var affiliate = accounts[(i+1)%nUsers];
            console.log("STARTING!!! step " + i);
            for(var j = 1; j <= nTxns; j++){
                var productId = ((i+1)*nTxns)%(nUsers*nTxns)+j;
                console.time("User["+ i + "]Purchase[" + j +"]");
                await doPurchaseTransaction(productId, affiliate, count,i);
                //promises[count-1] =  doPurchaseTransaction(productId, affiliate, count,i);
                count = count + 1; 
                console.timeEnd("User["+ i + "]Purchase[" + j +"]");
            }
            console.log("Account #"+i + "has AFFILIATE: Account #" + ((i+1)%nUsers));
            console.log("& Will purchase From product " + (((i+1)*nTxns)%(nUsers*nTxns)+1) + "to " + (((i+1)*nTxns)%(nUsers*nTxns)+nTxns));
        }

        console.log("SECOND Promises count: " + (count-1));
        //var txnList = await Promise.all(promises);
        //console.log(txnList)
        console.log("Done");
        console.timeEnd("AllPurchase");

    })

    
    it("users should be able to verify licenses", async () => {
        var productId = 1;
        var result;
        console.time("AllVerify");
        for(var i = 0; i < nUsers; i++){
            for(var j = 1; j <= nTxns; j++){
                var productId = ((i+1)*nTxns)%(nUsers*nTxns)+j;
                console.time("User["+ i + "]Verify[" + j +"]");
                result = await instance.verifyLicenseOwnership(accounts[i], productId, {from: accounts[i]});
                console.timeEnd("User["+ i + "]Verify[" + j +"]");
                // console.log(result);
            }
        }
        console.timeEnd("AllVerify");


        
    });

    it("users should be able to transfer licenses to other users", async () => {
        // 0: 3,4, 1: 1,2
        // soo... license[0] is product3.
        // too complicated, and unrealistic. SO. lets just transfer everything an account owns to account 0


        console.time("AllTransfer");
        for(var i = 0; i < nUsers; i++){
            console.time("User["+ i + "]View");
            result = await instance.viewOwnerLicenses(accounts[i]);
            console.timeEnd("User["+ i + "]View");
            var length = result.length;
            
            for(var j = 0; j < length; j++){
                var licenseId = result[j]["c"][0];
                console.time("User["+ i + "]Transfer[" + j +"]");
                await instance.transfer(accounts[0], licenseId, {from: accounts[i]});
                console.timeEnd("User["+ i + "]Transfer[" + j +"]");
            }

        }
        console.log(instance.address);
        console.timeEnd("AllTransfer");

    });
    
    it("count size", async () => {
        async function countTotalBlockchainSize() {
            var blocks = await web3.eth.getBlockNumber();
            console.log(blocks + " blocks:")
            var blocksum = 0;
            for(var i = 0; i < blocks; i++){
                var block = await web3.eth.getBlock(i);
                console.log("\tBlock[" + i + "]\n\t\tHash: " + block.hash + "\n\t\tGas used: " + block.gasUsed + "\n\t\tSize: " + block.size);
                blocksum += block.size;
            }
            console.log("==========================");
            console.log(blocksum + " bytes");
        }
        
        await countTotalBlockchainSize();
    })

});

