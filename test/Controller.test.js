const { checkAddress, getEvent } = require("./utils");

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

  it("deploys successfully", () => checkAddress(controller));

  it("create and update post", async () => {
    const _message = "Hello";
    const { id: _userId } = await getEvent(
      userList.createUser("asd", 12, "qwe")
    );
    const { postId, userId, message } = await getEvent(
      controller.createPost(_userId.toNumber(), _message)
    );
    assert.equal(userId.toNumber(), _userId.toNumber());
    assert.equal(message, _message);
    const post = await postList.posts(postId.toNumber());
    assert.equal(post.userId.toNumber(), _userId.toNumber());
    assert.equal(post.message, _message);
    const { posts } = await getEvent(userList.getPosts(_userId.toNumber()));
    assert.equal(
      posts.map((i) => i.toNumber()).includes(postId.toNumber()),
      true
    );
  });
});
