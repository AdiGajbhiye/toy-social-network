pragma solidity ^0.5.16;


contract UserList {
    struct User {
        uint256 id;
        string name;
        uint256 age;
        string description;
    }

    event UserUpserted(
        uint256 id,
        string name,
        uint256 age,
        string description
    );

    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    function createUser(
        string memory _name,
        uint256 _age,
        string memory _description
    ) public {
        userCount++;
        users[userCount] = User(userCount, _name, _age, _description);
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
        emit UserUpserted(userCount, _name, _age, _description);
    }
}
