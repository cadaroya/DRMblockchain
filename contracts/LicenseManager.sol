pragma solidity ^0.4.15;

import "./ProductManager.sol";

contract LicenseManager is ProductManager {
    
    bool public test = false;

    function testBool (bool _test) public payable {
        test = _test;
    }

    function readBool () public view returns (bool) {
        return test;
    }


    struct License {
        uint256 productId;
        uint256 attributes;
        uint256 issuedTime;
        uint256 expirationTime;
        address affiliate;
        string name;
        bytes32 licenseHash;
        bytes userSign;
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
        string name,
        bytes userSign
    );

    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
    
    License[] public licenses;
    mapping (uint256 => address) public licenseToOwner;
    mapping (address => uint256) public ownerLicenseCount;

    mapping (uint => address) licenseTransferApprovals;

    modifier onlyOwnerOf(uint256 _id) {
        require(msg.sender == licenseToOwner[_id], "Sender is not the owner of this license");
        _;
    }


    function licenseNotExpired(uint256 _licenseId) public view returns (bool){
        return (licenses[_licenseId].expirationTime >= now || licenses[_licenseId].expirationTime == 0);
    }


    function isSubscriptionProduct(uint256 _productId) public view returns (bool) {
        return intervalOf(_productId) > 0;
    }

    function _createLicense(uint256 _productId, uint256 _attributes, 
            uint256 _noOfCycles, address _affiliate, bytes32 _licenseHash, bytes _userSign) internal returns (uint256) {
        
        if(isSubscriptionProduct(_productId)) {
            require(_noOfCycles != 0);
        }
        require(_productExists(_productId));
        string memory name = nameOf(_productId);
        uint256 expirationTime = (intervalOf(_productId) * _noOfCycles) ;
        License memory license = License(_productId, _attributes, now, expirationTime, _affiliate, name, _licenseHash, _userSign);
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
            name,
            _userSign
        );
        return id;
    }

    function purchaseLicense(uint256 _productId, uint256 _attributes, uint256 _noOfCycles, address _affiliate, bytes32 _licenseHash, bytes _userSign) public {
        _buyProduct(_productId, msg.sender);

        //tentative licensekey generation 
        //uint256 licenseKey = uint256(keccak256(uint256(msg.sender) ^ uint256(_affiliate) ^ _productId));
        uint256 licenseId = _createLicense(_productId, _attributes, _noOfCycles, _affiliate, _licenseHash, _userSign);
        licenseToOwner[licenseId] = msg.sender;
        ownerLicenseCount[msg.sender]++;
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerLicenseCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return licenseToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerLicenseCount[_to]++;
        ownerLicenseCount[msg.sender]--;
        licenseToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        licenseTransferApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(licenseTransferApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }

    function viewOwnerLicenses(address _owner) public view returns (uint[]) {
        uint[] memory result = new uint[](ownerLicenseCount[_owner]);
        uint counter = 0;
        for(uint i = 0; i < licenses.length; i++){
            if(licenseToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }

        return result;
    }

    function verifyLicenseOwnership(address _user, uint256 _productId) public view returns (bool) {
        uint[] memory userLicenses = viewOwnerLicenses(_user);
        for (uint i = 0; i < userLicenses.length; i++) {
            if (licenses[userLicenses[i]].productId == _productId) {
                return true;
            }
        }

        return false;
    } 

}