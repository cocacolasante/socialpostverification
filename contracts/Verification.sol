// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Verification{
    // admin address
    address private admin;

    // cost to mint post
    uint public fee = 1 wei;

    // mapping of post struct to user
    mapping(address=>Post[]) public usersPosts;

    // post struct
    struct Post{
        uint postNumber;
        string ipfsHash;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Verification: Only Admin Can Call function");
        _;
    }

    constructor (){
        admin = msg.sender;
    }

    // complete make post function
    function makePost(string memory _ipfsHash) public payable returns(Post memory){
        require(msg.value >= fee, "Verification: Pay Required Fee");
        // grabs the users current post number from the current length of the posts array in the mapping
        uint currentPostCount = usersPosts[msg.sender].length +1;

        Post memory newPost = Post(currentPostCount, _ipfsHash);

        usersPosts[msg.sender].push(newPost);

        return newPost;
    }


    // setter 
    function setFee(uint newFee) public onlyAdmin{
        require(fee >0, "Verification: Fee cannot be zero");
        fee = newFee;
    }

    // get all users posts

    function getAllUsersPost(address user) public view returns(Post[] memory){
        return usersPosts[user];
    }


    // get specific post by user

    function getSpecificPost(address user, uint postNum) public view returns(Post memory){
        // ensures postnum cannot be less than 0 ideally preventing underflow hack
        require(postNum >0, "Verification: underflow protection");
        return usersPosts[user][postNum -1];
    }

    // get admin
    function getAdmin() public view returns(address){
        return admin;
    }

}