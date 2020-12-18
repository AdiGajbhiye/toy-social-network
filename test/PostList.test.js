const PostList = artifacts.require("./PostList.sol");

contract("PostList", () => {
  let postList;

  before(async () => {
    postList = await PostList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await postList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("create post", async () => {
    const postCount = await postList.postCount();
    assert.equal(postCount.toNumber(), 0);
    const result = await postList.addPost(1, "Hello");
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.userId, 1);
    assert.equal(event.message, "Hello");
  });

  it("update post", async () => {
    const postCount = await postList.postCount();
    assert.equal(postCount.toNumber(), 1);
    const result = await postList.updatePost(1, "Hello World");
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.userId, 1);
    assert.equal(event.message, "Hello World");
  });
});
