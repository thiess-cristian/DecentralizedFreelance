// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function deployRequestManager() {
  const requestManagerFactory = await hre.ethers.getContractFactory(
    "RequestManager"
  );
  const requestManager = await requestManagerFactory.deploy();

  await requestManager.deployed();
  console.log("RequestManager deployed to:", requestManager.address);

  return requestManager.address;
}

async function deployFileManager() {
  const fileManagerFactory = await hre.ethers.getContractFactory("FileManager");
  const fileManager = await fileManagerFactory.deploy();

  await fileManager.deployed();
  console.log("FileManager deployed to:", fileManager.address);
  return fileManager.address;
}

async function deployPaymentService() {
  const paymentServiceFactory = await hre.ethers.getContractFactory(
    "PaymentService"
  );
  const paymentService = await paymentServiceFactory.deploy();

  await paymentService.deployed();
  console.log("PaymentService deployed to:", paymentService.address);

  return paymentService.address;
}

async function main() {
  /* these two lines deploy the contract to the network */
  const PostsManager = await hre.ethers.getContractFactory("PostsManager");
  const postsManager = await PostsManager.deploy();

  await postsManager.deployed();
  console.log("PostsManager deployed to:", postsManager.address);

  const UserProfileManager = await hre.ethers.getContractFactory(
    "UserProfileManager"
  );
  const userProfileManager = await UserProfileManager.deploy();
  await userProfileManager.deployed();
  console.log("UserProfileManager deployed to:", userProfileManager.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */

  const requestManagerAddress = await deployRequestManager();
  const fileManagerAddress = await deployFileManager();

  const paymentServiceAddress = await deployPaymentService();

  fs.writeFileSync(
    "./config.js",
    `
  export const postsManagerAddress = "${postsManager.address}"
  export const ownerAddress = "${postsManager.signer.address}"
  export const userProfileManagerAddress ="${userProfileManager.address}"
  export const requestManagerAddress="${requestManagerAddress}"
  export const fileManagerAddress="${fileManagerAddress}"
  export const paymentServiceAddress="${paymentServiceAddress}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
