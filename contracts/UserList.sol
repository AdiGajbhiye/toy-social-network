pragma solidity ^0.5.16;


contract UserList {
    struct User {
        uint256 id;
        string name;
        uint256 age;
        string description;
        uint256[] friends;
        uint256[] posts;
    }

    event UserUpserted(
        uint256 id,
        string name,
        uint256 age,
        string description
    );

    event FriendAlready(uint256 id, uint256 friendId, bool isFriend);
    event FriendAdded(uint256 id, uint256 friendId);
    event FriendRemoved(uint256 id, uint256 friendId);
    event PostAdded(uint256 userId, uint256 postId);
    event PostRemoved(uint256 userId, uint256 postId);
    event PostNotFound(uint256 userId, uint256 postId);
    event PostsArray(uint256 userId, uint256[] posts);
    event FriendsArray(uint256 userId, uint256[] friends);

    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    function createUser(
        string memory _name,
        uint256 _age,
        string memory _description
    ) public {
        userCount++;
        users[userCount] = User(
            userCount,
            _name,
            _age,
            _description,
            new uint256[](0),
            new uint256[](0)
        );
        emit UserUpserted(userCount, _name, _age, _description);
    }

    function updateUser(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _description
    ) public {
        User memory _user = users[_id];
        _user.name = _name;
        _user.age = _age;
        _user.description = _description;
        users[_id] = _user;
        emit UserUpserted(_id, _name, _age, _description);
    }

    function isFriend(uint256 _id, uint256 _friendId) public {
        require(_id <= userCount, "No user by this id");
        require(_friendId <= userCount, "No user by this id");
        require(_id != _friendId, "Cannot be friend with yourself");
        User storage _user = users[_id];
        for (uint8 i = 0; i < _user.friends.length; i++) {
            if (_user.friends[i] == _friendId) {
                emit FriendAlready(_id, _friendId, true);
                return;
            }
        }
        emit FriendAlready(_id, _friendId, false);
    }

    function addFriend(uint256 _id, uint256 _friendId) public {
        require(_id <= userCount, "No user by this id");
        require(_friendId <= userCount, "No user by this id");
        require(_id != _friendId, "Cannot be friend with yourself");
        User storage _user = users[_id];
        for (uint8 i = 0; i < _user.friends.length; i++) {
            require(
                _user.friends[i] != _friendId,
                "You are already friend with this user"
            );
        }
        _user.friends.push(_friendId);
        emit FriendAdded(_id, _friendId);
    }

    function removeFriend(uint256 _id, uint256 _friendId) public {
        require(_id <= userCount, "No user by this id");
        require(_friendId <= userCount, "No user by this id");
        require(_id != _friendId, "Cannot be unfriend with yourself");
        User storage _user = users[_id];
        require(
            _user.friends.length > 0,
            "You currently don't have any friends"
        );
        for (uint8 i = 0; i < _user.friends.length; i++) {
            if (_user.friends[i] == _friendId) {
                _user.friends[i] = _user.friends[_user.friends.length - 1];
                _user.friends.pop();
                emit FriendRemoved(_id, _friendId);
                return;
            }
        }
    }

    function addPost(uint256 _id, uint256 _postId) public {
        User storage _user = users[_id];
        for (uint8 i = 0; i < _user.posts.length; i++) {
            require(
                _user.posts[i] != _postId,
                "You are already post with this id"
            );
        }
        _user.posts.push(_postId);
        emit PostAdded(_id, _postId);
    }

    function removePost(uint256 _id, uint256 _postId) public {
        User storage _user = users[_id];
        for (uint8 i = 0; i < _user.posts.length; i++) {
            if (_user.posts[i] == _postId) {
                _user.posts[i] = _user.posts[_user.posts.length - 1];
                _user.posts.pop();
                emit PostRemoved(_id, _postId);
                return;
            }
        }
        emit PostNotFound(_id, _postId);
    }

    function getPosts(uint256 _id) public {
        emit PostsArray(_id, users[_id].posts);
    }

    function getFriends(uint256 _id) public {
        emit FriendsArray(_id, users[_id].friends);
    }
}
