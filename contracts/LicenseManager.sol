pragma solidity ^0.4.15;

import "./ProductManager.sol";

contract LicenseManager is ProductManager {
        
    struct License {
        uint256 productId;
        uint256 attributes;
        uint256 issuedTime;
        uint256 expirationTime;
        address affiliate;
        string name;
    }

    
    event LicenseIssued(
        address indexed vendor,
        address indexed buyer,
        uint256 licenseId,
        uint256 productId,
        uint256 attributes,
        uint256 issuedTime,
        uint256 expirationTime,
        address affiliate,
        string name
    );
    

    License[] public licenses;
    mapping (uint256 => address) public licenseToOwner;
    mapping (address => uint256) public ownerLicenseCount;

    function licenseNotExpired(uint256 _licenseId) public view returns (bool){
        return (licenses[_licenseId].expirationTime >= now || licenses[_licenseId].expirationTime == 0);
    }


    function isSubscriptionProduct(uint256 _productId) public view returns (bool) {
        return intervalOf(_productId) > 0;
    }

    function _createLicense(uint256 _productId, uint256 _attributes, 
            uint256 _noOfCycles, address _affiliate) internal returns (uint256) {
        
        if(isSubscriptionProduct(_productId)) {
            require(_noOfCycles != 0);
        }
        require(_productExists(_productId));
        string memory name = nameOf(_productId);
        uint256 expirationTime = (intervalOf(_productId) * _noOfCycles) ;
        License memory license = License(_productId, _attributes, now, expirationTime, _affiliate, name);
        uint256 id = licenses.push(license) - 1;

        emit LicenseIssued(
            productIdToVendor[_productId],
            msg.sender,
            id,
            _productId,
            _attributes,
            now,
            expirationTime,
            _affiliate,
            name
        );
        return id;
    }

    function purchaseLicense(uint256 _productId, uint256 _attributes, uint256 _noOfCycles, address _affiliate) public {
        _buyProduct(_productId, msg.sender);
        uint256 licenseId = _createLicense(_productId, _attributes, _noOfCycles, _affiliate);
        licenseToOwner[licenseId] = msg.sender;
        ownerLicenseCount[msg.sender]++;
    }

}