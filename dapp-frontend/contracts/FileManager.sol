//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract FileManager {
    using Counters for Counters.Counter;
    Counters.Counter private _fileIds;

    struct File {
        address owner;
        string user;
        string request;
        string file;
    }

    mapping(uint256 => File) private idToFile;
    mapping(string => File) private hashToFile;

    event fileCreated(uint256 id, string hash);

    constructor() {}

    function createFile(
        string memory user,
        string memory request,
        string memory hash
    ) public {
        uint256 fileId = _fileIds.current();
        _fileIds.increment();

        File storage file = idToFile[fileId];

        file.file = hash;
        file.owner = msg.sender;
        file.request = request;
        file.user = user;

        hashToFile[hash] = file;

        emit fileCreated(fileId, hash);
    }
}
