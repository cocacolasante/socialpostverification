// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Profile {
    address public owner;

    // mapping profile struct to address
    mapping(address=>ProfileStruct) public profiles;


    struct ProfileStruct{
        address profileAddress;
        string username;
        string profileQRCode;

    }

    constructor(){
        owner = msg.sender;
    }

    function createProfile(string memory _username, string memory _qrCode) public returns(ProfileStruct memory) {
        require(profiles[msg.sender].profileAddress == address(0), "Profile: profile already exists" );

        return profiles[msg.sender] = ProfileStruct(msg.sender, _username, _qrCode);

    }
}