import UserProfileManager from "../../artifacts/contracts/UserProfileManager.sol/UserProfileManager.json";
import { ethers } from "ethers";
import { userProfileManagerAddress } from "../../config";

export async function getUsername(address) {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(
    userProfileManagerAddress,
    UserProfileManager.abi,
    provider
  );

  let username;
  try {
    const user = await contract.fetchUser(address);
    username = user.name;
  } catch (error) {
    username = "";
  }

  return username;
}
