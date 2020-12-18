pragma solidity ^0.5.16;

import "./PostList.sol";
import "./UserList.sol";


contract Controller {
    struct Post {
        uint256 id;
        uint256 userId;
        string message;
        uint256 createdAt;
        uint256 updatedAt;
    }

    event PostUpserted(
        uint256 postId,
        uint256 userId,
        string message,
        uint256 createdAt,
        uint256 updatedAt
    );

    address postListAddr;
    address userListAddr;

    constructor(address _userListAddr, address _postListAddr) public {
        userListAddr = _userListAddr;
        postListAddr = _postListAddr;
    }

    function createPost(uint256 _userId, string memory _message) public {
        (
            uint256 postId,
            uint256 userId,
            string memory message,
            uint256 createdAt,
            uint256 updatedAt
        ) = PostList(postListAddr).createPost(_userId, _message);
        UserList(userListAddr).addPost(_userId, postId);
        emit PostUpserted(postId, userId, message, createdAt, updatedAt);
    }
}
