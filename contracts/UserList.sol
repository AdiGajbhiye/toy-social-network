pragma solidity ^0.5.16;


contract UserList {
    struct User {
        uint256 id;
        string name;
        uint256 age;
        string description;
    }

    event UserCreated(uint256 id, string name, uint256 age, string description);
    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    function createUser(
        string memory _name,
        uint256 _age,
        string memory _description
    ) public {
        userCount++;
        users[userCount] = User(userCount, _name, _age, _description);
        emit UserCreated(userCount, _name, _age, _description);
    }
}
