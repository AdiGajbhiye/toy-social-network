const UserList = artifacts.require("./UserList.sol");
const PostList = artifacts.require("./PostList.sol");
const Controller = artifacts.require("./Controller.sol");

module.exports = async (deployer) => {
  await deployer.deploy(UserList);
  await deployer.deploy(PostList);
  await deployer.deploy(Controller, UserList.address, PostList.address);
};
