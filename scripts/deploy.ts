import { ethers } from "hardhat";

async function main() {
  const nftToken = await ethers.deployContract("NftToken");

  await nftToken.waitForDeployment();

  console.log(`NftToken deployed to ${nftToken.target} `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
