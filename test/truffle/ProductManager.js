var LicenseManager = artifacts.require("./contracts/LicenseManager.sol");
const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
contract('LicenseManager', async accounts => {

    console.log(accounts[0])
    var messageHash = 0x0a28eed6ef325a434df60c5fb7d8dce9b99eb146c2b200251440e3b8b737d684;
    var messageSign = 0xf0f2126e177bbe1ff49b7eb1313973bcb39e5fbedb4bdc64a331d5663fc5cd97480329c4f1c153cbd8ad480e52b79d910c032f8644f04e7b56b06f0c0b08282c1c;
    let instance = null;

    beforeEach(async () => {
        instance = await LicenseManager.deployed();
        
    });
    
    it("should register product", async () => {
        web3.eth.defaultAccount = accounts[0]
        for(var i = 1; i <= 10; i++){
            var productName = 'TestProduct' + i.toString();
            var productDescription = 'TestDescription' + i.toString();
            messageHash = await web3.utils.soliditySha3(productName);
            messageSign = await web3.eth.sign(messageHash, accounts[0]);
            await instance.registerProduct(i, '50', '100', '100', '10000', productName, productDescription, '1', messageHash, messageSign);
        }
        
        // (uint256 _id, uint256 _price, uint256 _available, uint256 _initialSupply, uint256 _interval, string _name, string _description, bool _renewable, bytes32 _productHash, bytes _vendorSign)
        var testChecker = true;
        for(var i = 1; i <= 10; i++){
            var tempProduct = await instance.products(i);
            var expectedName = 'TestProduct' + i.toString();
            //ProductName is not equal expectedName
            if(tempProduct[6] != expectedName){
                testChecker = false;
            }
        }

        assert.equal(true,testChecker, "A Product FAILED to be created")
    });

    it("users should be able to buy products", async () => {
        var productId = 1;
        // Purchase TestProduct1 created by accounts[0] 10 times, 1 for each user (accounts[1] to accounts[9])
        for(var i = 1; i < 10; i++){
            web3.eth.defaultAccount = accounts[i];
            hashedMessage = await web3.utils.soliditySha3("HashThisString" + i.toString());
            consumerSign = await web3.eth.sign(hashedMessage, accounts[i]);
            await instance.purchaseLicense(productId, 1, 1, accounts[0], hashedMessage, consumerSign);
        }
    });

    it("users should be able to transfer licenses to other users", async () => {
        
    });


});
