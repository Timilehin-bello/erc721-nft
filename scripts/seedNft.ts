// const config = require("../config/config.json");

import NftTokenAbi from "../artifacts/contracts/NftToken.sol/NftToken.json";

import { ethers } from "hardhat";

const { API_URL, PRIVATE_KEY, API_KEY }: any = process.env;

async function main() {
  // Fetch accounts from wallet - these are unlocked
  const accounts = await ethers.getSigners();

  // Define an Alchemy Provider
  const provider = new ethers.AlchemyProvider("sepolia", API_KEY);
  const signer: any = new ethers.Wallet(PRIVATE_KEY, provider);
  // Fetch  network
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using chainId:", chainId);

  // Fetch deployed NFT Marketplace
  const NftToken = new ethers.Contract(
    "0x133B3Acf9539ca7A17d5Df58ec2C117F3bca2AFD",
    NftTokenAbi.abi,
    signer
  );

  console.log(`NftToken Token fetched: ${NftToken.target}\n`);

  //   Give tokens to accounts[1]
  const creator = signer.address;

  // Create NFTs
  let transaction;

  const tokenURLs = [
    "https://cyclone-nft-marketplace.infura-ipfs.io/ipfs/QmTd6XitrCDsk1QFGYHz3yQAja2wE1aY2Em9uSEXVpC4mb",
    "https://cyclone-nft-marketplace.infura-ipfs.io/ipfs/QmPfBs7LJPXjzKUxDmqffemLxPt3TjaAe7TVXiGd673cfB",
    "https://cyclone-nft-marketplace.infura-ipfs.io/ipfs/QmWgFB1tFHcFqnN82RtNFGdP4wXuxVqmBTBDnh6dERZXPN",
    "https://cyclone-nft-marketplace.infura-ipfs.io/ipfs/Qma8uG23tyMStjeWhB4E61gm1sb1c9C726KjgdRLZUHQHW",
  ];

  for (let i = 0; i < tokenURLs.length; i++) {
    console.log(`Minting NFT ${i + 1} of ${tokenURLs.length}...`);
    transaction = await NftToken.mint(signer.address, tokenURLs[i]);

    await transaction.wait();
  }

  console.log(`Created Seed NFTs from ${creator.address}\n`);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
