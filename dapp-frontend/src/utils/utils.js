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

  let user;
  try {
    user = await contract.fetchUser(address);
  } catch (error) {
    user = null;
  }

  return user.name;
}
