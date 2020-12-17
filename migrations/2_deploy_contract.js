const UserList = artifacts.require("./UserList.sol");

module.exports = (deployer) => {
  deployer.deploy(UserList);
};
