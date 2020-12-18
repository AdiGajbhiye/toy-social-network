const UserList = artifacts.require("./UserList.sol");
const PostList = artifacts.require("./PostList.sol");

module.exports = (deployer) => {
  deployer.deploy(UserList);
  deployer.deploy(PostList);
};
