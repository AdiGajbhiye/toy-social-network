pragma solidity ^0.5.16;


contract PostList {
    struct Post {
        uint256 id;
        uint256 userId;
        string message;
        uint256 createdAt;
        uint256 updatedAt;
    }

    event PostUpserted(
        uint256 id,
        uint256 userId,
        string message,
        uint256 createdAt,
        uint256 updatedAt
    );

    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    function addPost(uint256 _userId, string memory _message) public {
        postCount++;
        uint256 _timestamp = now;
        posts[postCount] = Post(
            postCount,
            _userId,
            _message,
            _timestamp,
            _timestamp
        );
        emit PostUpserted(postCount, _userId, _message, _timestamp, _timestamp);
    }

    function updatePost(uint256 _id, string memory _message) public {
        Post memory _post = posts[_id];
        _post.message = _message;
        _post.updatedAt = now;
        emit PostUpserted(
            _id,
            _post.userId,
            _message,
            _post.createdAt,
            _post.updatedAt
        );
    }
}
