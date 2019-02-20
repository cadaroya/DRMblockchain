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
        string name;
        string description;
        bool renewable;
        bytes32 productHash;
        bytes vendorSign;
    }


    uint256[] public productIndex; 


    mapping (address => uint256) public vendorProductCount;
    

    mapping (uint256 => Product) public products;
    mapping (uint256 => uint256) public productIndexToId;
    mapping (uint256 => address) public productIdToVendor;

    mapping (address => mapping(uint256 => uint256)) public ownerToProductCount;

    event ProductCreated(uint256 productId, uint256 price, uint256 available, uint256 supply, uint256 sold, uint256 interval, string name, string description, bool renewable, bytes32 productHash, bytes vendorSign);
    event ProductBought(uint256 productId, address vendor, address buyer);


    modifier onlyVendor(uint256 _id) {
        require(msg.sender == productIdToVendor[_id], "Sender is not the vendor of this product");
        _;
    }

    function getTotalProductCount() public view returns (uint){
        return productIndex.length;
    }

    function priceOf(uint256 _productId) public view returns (uint256) {
        return products[_productId].price;
    }

    function availableAmountOf(uint256 _productId) public view returns (uint256 available) {
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

    function nameOf(uint256 _productId) public view returns (string) {
        return products[_productId].name;
    }

    function descriptionOf(uint256 _productId) public view returns (string) {
        return products[_productId].description;
    }

    function isRenewable(uint256 _productId) public view returns (bool) {
        return products[_productId].renewable;
    }

    function productHashOf(uint256 _productId) public view returns (bytes32) {
        return products[_productId].productHash;
    }

    function vendorSignOf(uint256 _productId) public view returns (bytes) {
        return products[_productId].vendorSign;
    }

    function _productExists(uint256 _productId) internal view returns (bool) {
        return (products[_productId].id != 0);
    } 

    function _productDoesNotExist(uint256 _productId) internal view returns (bool) {
        return (products[_productId].id == 0);
    } 

    

    function _createProduct(uint256 _id, uint256 _price, uint256 _available, 
            uint256 _supply, uint256 _sold, uint256 _interval, string _productName,
            string _description, bool _renewable, bytes32 _productHash, bytes _vendorSign) internal {
        require(_productDoesNotExist(_id), "Product does not exist");
        Product memory product = Product({
            id: _id,
            price: _price,
            available: _available, 
            supply: _supply,
            sold: _sold,
            interval: _interval,
            name: _productName,
            description: _description,
            renewable: _renewable,
            productHash: _productHash,
            vendorSign: _vendorSign
        });
        uint256 index = productIndex.push(_id) - 1;
        products[_id] = product;
        productIndexToId[index] = _id;
        productIdToVendor[_id] = msg.sender;
        vendorProductCount[msg.sender]++;
        emit ProductCreated(_id, _price, _available, _supply, _sold, _interval, _productName, _description, _renewable, _productHash, _vendorSign);
    }

    
    function registerProduct(uint256 _id, uint256 _price, uint256 _available, uint256 _initialSupply, uint256 _interval, string _name, string _description, bool _renewable, bytes32 _productHash, bytes _vendorSign) public {
        require(_available <= _initialSupply, "Supply should be greater than or equal to amount available");
        _createProduct(_id, _price, _available, _initialSupply, 0, _interval, _name, _description, _renewable, _productHash, _vendorSign);
    }

    
    function _buyProduct(uint256 _productId, address _buyer) internal {
        require(availableAmountOf(_productId) > 0, "Not enough stock available");
        Product storage product = products[_productId];
        product.supply--;
        product.available--;
        product.sold++;
        ownerToProductCount[_buyer][_productId]++;
        emit ProductBought(_productId, productIdToVendor[_productId], _buyer);
    }
    
    function viewProduct(address _owner) external view returns (uint[]) {
        uint[] memory result = new uint[](vendorProductCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < productIndex.length; i++) {
            if (productIdToVendor[productIndexToId[i]] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function checkIfDuplicateProduct(uint256 _productId) public view returns (uint256 matchingId) {
        string memory givenName = nameOf(_productId);
        string memory givenDesc = descriptionOf(_productId);
        string memory name;
        string memory description;
        uint256 productId;
        uint256 i = 0;
        for(i = 0 ; i < productIndex.length ; ++i){
            productId = productIndexToId[i];
            if(productId == _productId){
                continue;
            }
            name = nameOf(productId);
            description = descriptionOf(productId);
            if(keccak256(givenName) == keccak256(name) && keccak256(givenDesc) == keccak256(description)){
                return productId;
            }
        }
        return 0;
    }
}