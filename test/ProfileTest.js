const {ethers} = require("hardhat")
const {expect} = require("chai")


describe("Profile Contract", () =>{
    let ProfileContract, deployer, user1, user2

    beforeEach(async () =>{
        [deployer, user1, user2] = await ethers.getSigners()

        const profileContractFactory = await ethers.getContractFactory("Profile")
        ProfileContract = await profileContractFactory.deploy()
        await ProfileContract.deployed()

        // console.log(`Profile was deployed to ${ProfileContract.address}`)


    })
    it("checks the owner", async () =>{
        expect(await ProfileContract.owner()).to.equal(deployer.address)
    })
    it("checks the profile was made", async ()=>{
        await ProfileContract.connect(user1).createProfile("testing", "qrtesting svg")
        const profile = await ProfileContract.profiles(user1.address)
        console.log(profile)
        expect(profile.profileAddress).to.equal(user1.address)
        expect(profile.username).to.equal("testing")
        expect(profile.profileQRCode).to.equal("qrtesting svg")
    })
})