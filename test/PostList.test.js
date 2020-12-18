const { checkAddress } = require("./utils");

const PostList = artifacts.require("./PostList.sol");

contract("PostList", () => {
  let postList;

  before(async () => {
    postList = await PostList.deployed();
  });

  it("deploys successfully", () => checkAddress(postList));

  it("create post", async () => {
    const message = "Hello";
    const userId = 1;
    const prevCount = await postList.postCount();
    await postList.createPost(userId, message);
    const currCount = await postList.postCount();
    assert.equal(prevCount.toNumber() + 1, currCount.toNumber());
    const post = await postList.posts(currCount.toNumber());
    assert.equal(post.id.toNumber(), currCount.toNumber());
    assert.equal(post.userId.toNumber(), userId);
    assert.equal(post.message, message);
  });

  it("update post", async () => {
    const prevMessage = "Hello";
    const currMessage = "Hello World";
    const userId = 1;
    await postList.createPost(userId, prevMessage);
    const prevCount = await postList.postCount();
    await postList.updatePost(prevCount.toNumber(), currMessage);
    const currCount = await postList.postCount();
    assert.equal(prevCount.toNumber(), currCount.toNumber());
    const post = await postList.posts(currCount.toNumber());
    assert.equal(post.id.toNumber(), currCount.toNumber());
    assert.equal(post.userId.toNumber(), userId);
    assert.equal(post.message, currMessage);
  });
});
