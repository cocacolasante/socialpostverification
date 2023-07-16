const {ethers} = require("hardhat")
const {expect} = require("chai")

const SAMPLEIPFS = "SAMPLEHASH"

describe("Verification contract", () =>{
    let VerificationContract, deployer, user1, user2, user3, post1

    beforeEach(async () =>{
        [deployer, user1, user2, user3] = await ethers.getSigners()

        const verificationContractFactory = await ethers.getContractFactory("Verification")
        VerificationContract = await verificationContractFactory.deploy()
        await VerificationContract.deployed()

        // console.log(`Verification Deployed ${VerificationContract.address}`)
    })
    it("checks the admin", async () =>{
        expect(await VerificationContract.getAdmin()).to.equal(deployer.address)
    })
    it("checks the fee is set to 1 wei", async () =>{
        expect(await VerificationContract.fee()).to.equal(1)
    })
    it("checks the set fee function to be 2 and 5 wei", async () =>{
        await VerificationContract.connect(deployer).setFee(2)
        expect(await VerificationContract.fee()).to.equal(2)
        await VerificationContract.connect(deployer).setFee(5)
        expect(await VerificationContract.fee()).to.equal(5)
    })
    it("checks the only admin fail case modifier", async () =>{
        await expect(VerificationContract.connect(user2).setFee(10)).to.be.reverted
    })
    it("checks the changing admin function", async () =>{
        await VerificationContract.connect(deployer).setAdmin(user2.address)
        expect(await VerificationContract.getAdmin()).to.equal(user2.address)

    })
    describe("Make Post Function", async () =>{
        beforeEach(async () =>{
            await VerificationContract.connect(user1).makePost(SAMPLEIPFS, {value: "1"})
            await VerificationContract.connect(user1).makePost(SAMPLEIPFS, {value: "1"})
            post1 = await VerificationContract.getSpecificPost(user1.address, 1)
            // console.log(post1)
        })
        it("checks the hash was set", async () =>{
            expect(post1.ipfsHash ).to.equal(SAMPLEIPFS)
            expect(post1.postNumber).to.equal(1)
            
        })
        it("checks the get all users post function to return an array", async () =>{
            const postsArray = await VerificationContract.getAllUsersPost(user1.address)
            
            expect(postsArray.length).to.equal(2)
        })
        it("checks the admin received the fee", async () =>{
            const initialBalance = await ethers.provider.getBalance(deployer.address)
            await VerificationContract.connect(user1).makePost(SAMPLEIPFS, {value: "1"})
            expect(await ethers.provider.getBalance(deployer.address)).to.equal(BigInt(initialBalance) + BigInt(1))

        })
    })
})