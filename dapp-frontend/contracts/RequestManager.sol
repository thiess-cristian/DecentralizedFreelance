//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract RequestManager {
    using Counters for Counters.Counter;
    Counters.Counter private _requestIds;

    struct Request {
        address owner;
        string post;
        string request;
    }

    mapping(uint256 => Request) private idToRequest;
    mapping(string => Request) private hashToRequest;

    event RequestCreated(uint256 id, string hash);

    constructor() {}

    function createRequest(string memory post, string memory hash) public {
        uint256 requestId = _requestIds.current();
        _requestIds.increment();

        Request storage request = idToRequest[requestId];

        request.owner = msg.sender;
        request.post = post;
        request.request = hash;

        hashToRequest[hash] = request;

        emit RequestCreated(requestId, hash);
    }

    function fetchRequest(string memory hash)
        public
        view
        returns (Request memory)
    {
        return hashToRequest[hash];
    }

    function getAllRequests() public view returns (Request[] memory) {
        uint256 itemCount = _requestIds.current();
        uint256 currentIndex = 0;

        Request[] memory requests = new Request[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i;
            Request storage currentItem = idToRequest[currentId];
            requests[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return requests;
    }
}
