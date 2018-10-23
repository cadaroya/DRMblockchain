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

    struct License {
        uint256 productId;
        uint256 attributes;
        uint256 issuedTime;
        uint256 expirationTime;
        address affiliate;
    }

    Product[] public products; 
    License[] public licenses;

    mapping (address => uint256) public vendorProductCount;
    mapping (address => uint256) public ownerLicenseCount;
    mapping (uint256 => address) public productToVendor;
    mapping (uint256 => address) public licenseToOwner;

    event ProductRegistered(uint256 productId, uint256 productIdentifier);

    /*
    event LicenseIssued(
        address indexed vendor,
        address indexed buyer,
        uint256 licenseId,
        uint256 productId,
        uint256 attributes,
        uint256 issuedTime,
        uint256 expirationTime,
        address affiliate
    );
    */

    modifier licenseNotExpired(uint256 _licenseId) {
        require(licenses[_licenseId].expirationTime >= now || licenses[_licenseId].expirationTime == 0, "License has expired");
        _;
    }

    modifier onlyVendor(uint256 _id) {
        require(msg.sender == productToVendor[_id], "Sender is not the vendor of this product");
        _;
    }

    function _registerProduct(uint256 _id, uint256 _price, uint256 _available, 
            uint256 _supply, uint256 _sold, uint256 _interval, 
            bool _renewable) internal {
        Product storage product = Product(_id, _price, _available, _supply, _sold, _interval, _renewable);
        uint256 id = products.push(product) - 1;
        productToVendor[id] = msg.sender;
        vendorProductCount[msg.sender]++;
        emit ProductRegistered(id, _id);
    }

    /*
    function _createLicense(uint256 _productId, uint256 _attributes, uint256 _issuedTime, 
            uint256 _expirationTime, address _affiliate) internal {

        License storage license = License(_productId, _attributes, now, _expirationTime, _affiliate);
        uint256 id = licenses.push(license) - 1;
    }
    */

    /*
    function _buyProduct(uint256 _productId, address _buyer) {
        Product product = products[_productId];
        product.supply--;
        product.available--;
        product.sold++;

    }
    */


  
}