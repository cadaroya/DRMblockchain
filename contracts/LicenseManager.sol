pragma solidity ^0.4.15;

import "./ProductManager.sol";

contract LicenseManager is ProductManager {
        
    struct License {
        uint256 productId;
        uint256 attributes;
        uint256 issuedTime;
        uint256 expirationTime;
        address affiliate;
    }

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

    License[] public licenses;
    mapping (uint256 => address) public licenseToOwner;
    mapping (address => uint256) public ownerLicenseCount;

    modifier licenseNotExpired(uint256 _licenseId) {
        require(licenses[_licenseId].expirationTime >= now || licenses[_licenseId].expirationTime == 0, "License has expired");
        _;
    }

    function _createLicense(uint256 _productId, uint256 _attributes, uint256 _issuedTime, 
            uint256 _expirationTime, address _affiliate) internal {

        License memory license = License(_productId, _attributes, now, _expirationTime, _affiliate);
        uint256 id = licenses.push(license) - 1;
    }

}