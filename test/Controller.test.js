const Controller = artifacts.require("./Controller.sol");
const PostList = artifacts.require("./PostList.sol");
const UserList = artifacts.require("./UserList.sol");

contract("Controller", () => {
  let controller, postList, userList;

  before(async () => {
    [controller, postList, userList] = await Promise.all(
      [Controller, PostList, UserList].map((i) => i.deployed())
    );
  });

  it("deploys successfully", async () => {
    const address = await controller.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("create and update post", async () => {
    let result;
    const _message = "Hello";
    result = await userList.createUser("asd", 12, "qwe");
    const { id: _userId } = result.logs[0].args;
    result = await controller.createPost(_userId.toNumber(), _message);
    const { postId, userId, message } = result.logs[0].args;
    assert.equal(userId.toNumber(), _userId.toNumber());
    assert.equal(message, _message);
    const post = await postList.posts(postId.toNumber());
    assert.equal(post.userId.toNumber(), _userId.toNumber());
    assert.equal(post.message, _message);
    result = await userList.getPosts(_userId.toNumber());
    const { posts } = result.logs[0].args;
    assert.equal(
      posts.map((i) => i.toNumber()).includes(postId.toNumber()),
      true
    );
  });
});
