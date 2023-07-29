// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const verficationContractFactory = await hre.ethers.getContractFactory("Verification")
  const VerificationContract = await verficationContractFactory.deploy()
  await VerificationContract.deployed()

  console.log(`Verfication delpoyed to ${VerificationContract.address}`)

  const profileContractFactory = await hre.ethers.getContractFactory("Profile")
  const ProfileContract = await profileContractFactory.deploy()
  await ProfileContract.deployed()

  console.log(`Profile contract deployed to ${ProfileContract.address}`)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
