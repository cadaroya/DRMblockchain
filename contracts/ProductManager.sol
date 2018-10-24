pragma solidity ^0.4.15;

contract ProductManager {
    struct Product {
        uint256 id;
        uint256 price;
        uint256 available;
        uint256 supply;
        uint256 sold;
        uint256 interval;
        bool renewable;
    }

    uint256[] public productIds; 


    mapping (address => uint256) public vendorProductCount;
    

    mapping (uint256 => Product) public products;
    mapping (uint256 => address) public productIdToVendor;


    event ProductRegistered(uint256 productId, uint256 price, uint256 available, uint256 supply, uint256 sold, uint256 interval);
    


    modifier onlyVendor(uint256 _id) {
        require(msg.sender == productToVendor[_id], "Sender is not the vendor of this product");
        _;
    }

    function priceOf(uint256 _productId) public view returns (uint256) {
        return products[_productId].price;
    }

    function availableAmountOf(uint256 _productId) public view returns (uint256) {
        return products[_productId].available;
    }

    function supplyOf(uint256 _productId) public view returns (uint256) {
        return products[_productId].supply;
    }

    function amountSold(uint256 _productId) public view returns (uint256) {
        return products[_productId].sold;
    }

    function intervalOf(uint256 _productId) public view returns (uint256) {
        return products[_productId].interval;
    }

    function isRenewable(uint256 _productId) public view returns (bool) {
        return products[_productId].renewable;
    }


    function _productExists(uint256 _productId) internal view returns (bool) {
        return (products[_productId].id != 0);
    } 

    function _productDoesNotExist(uint256 _productId) internal view returns (bool) {
        return (products[_productId].id == 0);
    } 

    function _registerProduct(uint256 _id, uint256 _price, uint256 _available, 
            uint256 _supply, uint256 _sold, uint256 _interval, 
            bool _renewable) internal {
        require(_productDoesNotExist(_id), "Product does not exist");
        Product storage product = Product(_id, _price, _available, _supply, _sold, _interval, _renewable);
        productIds.push(_id);
        products[_id] = product;
        productIdToVendor[_id] = msg.sender;
        vendorProductCount[msg.sender]++;
        emit ProductRegistered(_id, _price, _available, _supply, _sold, _interval, _renewable);
    }

    
    
    

    
    function _buyProduct(uint256 _productId, address _buyer) {
        Product product = products[_productId];
        product.supply--;
        product.available--;
        product.sold++;
    }
    


  
}