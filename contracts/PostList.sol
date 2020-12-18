pragma solidity ^0.5.16;


contract PostList {
    struct Post {
        uint256 id;
        uint256 userId;
        string message;
        uint256 createdAt;
        uint256 updatedAt;
    }

    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    function createPost(uint256 _userId, string memory _message)
        public
        returns (uint256, uint256, string memory, uint256, uint256)
    {
        postCount++;
        uint256 _timestamp = now;
        Post memory _post = Post(
            postCount,
            _userId,
            _message,
            _timestamp,
            _timestamp
        );
        posts[postCount] = _post;
        return (
            _post.id,
            _post.userId,
            _post.message,
            _post.createdAt,
            _post.updatedAt
        );
    }

    function updatePost(uint256 _id, string memory _message)
        public
        returns (uint256, uint256, string memory, uint256, uint256)
    {
        Post memory _post = posts[_id];
        _post.message = _message;
        _post.updatedAt = now;
        posts[_id] = _post;
        return (
            _post.id,
            _post.userId,
            _post.message,
            _post.createdAt,
            _post.updatedAt
        );
    }
}
