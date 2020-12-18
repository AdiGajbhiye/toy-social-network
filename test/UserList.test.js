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

  it("add friend", async () => {
    await userList.createUser("asd", 12, "qwe");
    const result = await userList.addFriend(1, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.friendId.toNumber(), 2);
    const result1 = await userList.isFriend(1, 2);
    const event1 = result1.logs[0].args;
    assert.equal(event1.id.toNumber(), 1);
    assert.equal(event1.friendId.toNumber(), 2);
    assert.equal(event1.isFriend, true);
  });

  it("remove friend", async () => {
    const result = await userList.removeFriend(1, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.friendId.toNumber(), 2);
    const result1 = await userList.isFriend(1, 2);
    const event1 = result1.logs[0].args;
    assert.equal(event1.id.toNumber(), 1);
    assert.equal(event1.friendId.toNumber(), 2);
    assert.equal(event1.isFriend, false);
  });

  it("add post to user", async () => {
    let result;
    result = await userList.createUser("asd", 12, "qwe");
    const { id } = result.logs[0].args;
    result = await userList.addPost(id.toNumber(), 1);
    const { userId, postId } = result.logs[0].args;
    assert(userId.toNumber(), id.toNumber());
    assert(postId.toNumber(), 1);
  });

  it("remove post from user", async () => {
    let result;
    result = await userList.createUser("asd", 12, "qwe");
    const { id } = result.logs[0].args;
    result = await userList.removePost(id.toNumber(), 1);
    const { userId, postId } = result.logs[0].args;
    assert(userId.toNumber(), id.toNumber());
    assert(postId.toNumber(), 1);
  });
});
