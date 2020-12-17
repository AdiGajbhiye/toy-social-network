const UserList = artifacts.require("./UserList.sol");

contract("UserList", () => {
  let userList;

  before(async () => {
    userList = await UserList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await userList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("create user", async () => {
    const userCount = await userList.userCount();
    assert.equal(userCount.toNumber(), 0);
    const result = await userList.createUser("asd", 12, "qwe");
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.name, "asd");
    assert.equal(event.age, 12);
    assert.equal(event.description, "qwe");
  });

  it("update user", async () => {
    const result = await userList.updateUser(1, "asd", 18, "qwe");
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.name, "asd");
    assert.equal(event.age, 18);
    assert.equal(event.description, "qwe");
  });
});
