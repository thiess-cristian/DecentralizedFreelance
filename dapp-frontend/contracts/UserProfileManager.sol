//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract UserProfileManager {
    struct User {
        uint256 id;
        string name;
        address owner;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _userIds;

    mapping(uint256 => User) private idToUser;

    constructor() {}

    function createUser(string memory name) public {
        uint256 userId = _userIds.current();
        _userIds.increment();

        User storage user = idToUser[userId];
        user.id = userId;
        user.name = name;
        user.owner = msg.sender;
    }

    function fetchUser(address _address) public view returns (User memory) {
        uint256 userCount = _userIds.current();

        for (uint256 i = 0; i < userCount; i++) {
            User storage currentUser = idToUser[i];

            if (currentUser.owner == _address) {
                return currentUser;
            }
        }
        revert("Not found");
    }
}
