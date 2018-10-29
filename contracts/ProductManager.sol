pragma solidity ^0.4.15;

import "./Users.sol";

contract ProductManager is Users {
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

    mapping (address => mapping(uint256 => uint256)) public ownerToProductCount;

    event ProductCreated(uint256 productId, uint256 price, uint256 available, uint256 supply, uint256 sold, uint256 interval, bool renewable);
    event ProductBought(uint256 productId, address vendor, address buyer);


    modifier onlyVendor(uint256 _id) {
        require(msg.sender == productIdToVendor[_id], "Sender is not the vendor of this product");
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

    function _createProduct(uint256 _id, uint256 _price, uint256 _available, 
            uint256 _supply, uint256 _sold, uint256 _interval, 
            bool _renewable) internal {
        require(_productDoesNotExist(_id), "Product does not exist");
        Product memory product = Product(_id, _price, _available, _supply, _sold, _interval, _renewable);
        productIds.push(_id);
        products[_id] = product;
        productIdToVendor[_id] = msg.sender;
        vendorProductCount[msg.sender]++;
        emit ProductCreated(_id, _price, _available, _supply, _sold, _interval, _renewable);
    }

    
    function registerProduct(uint256 _id, uint256 _price, uint256 _available, uint256 _initialSupply, uint256 _interval, bool _renewable) public {
        require(_available <= _initialSupply);
        _createProduct(_id, _price, _available, _initialSupply, 0, _interval, _renewable);
    }

    
    function _buyProduct(uint256 _productId, address _buyer) internal {
        require(availableAmountOf(_productId) > 0, "Not enough stock available");
        Product product = products[_productId];
        product.supply--;
        product.available--;
        product.sold++;
        ownerToProductCount[_buyer][_productId]++;
        emit ProductBought(_productId, productIdToVendor[_productId], _buyer);
    }
    


  
}