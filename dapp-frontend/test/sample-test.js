const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User", function () {
  it("Should create an user", async function () {
    const UserProfileManager = await ethers.getContractFactory(
      "UserProfileManager"
    );
    const user = await UserProfile.deploy("User");

    const userName = await user.getName();
    expect(userName).to.equal("User");
  });
});

describe("PostsManager", function () {
  it("Should create a post", async function () {
    const PostsManager = await ethers.getContractFactory("PostsManager");
    const manager = await PostsManager.deploy();
    await manager.createPost("Title", "123");

    const post = await manager.fetchPost("123");

    expect(post.title).to.equal("Title");
  });
});
