//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract RequestManager {
    using Counters for Counters.Counter;
    Counters.Counter private _requestIds;

    struct Request {
        address clientAddress;
        address postOwnerAddress;
        string post;
        string request;
    }

    mapping(uint256 => Request) private idToRequest;
    mapping(string => Request) private hashToRequest;

    event RequestCreated(uint256 id, string hash);

    constructor() {}

    function createRequest(
        string memory post,
        string memory hash,
        address postOwnerAddress
    ) public {
        uint256 requestId = _requestIds.current();
        _requestIds.increment();

        Request storage request = idToRequest[requestId];

        request.clientAddress = msg.sender;
        request.post = post;
        request.request = hash;
        request.postOwnerAddress = postOwnerAddress;

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

        Request[] memory requests = new Request[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            Request storage currentItem = idToRequest[i];
            requests[i] = currentItem;
        }

        return requests;
    }

    function getRequestsMadeByUser(address clientAddress)
        public
        view
        returns (Request[] memory)
    {
        uint256 itemCount = _requestIds.current();
        uint256 index = 0;

        Request[] memory requests = new Request[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            Request storage currentItem = idToRequest[i];

            if (currentItem.postOwnerAddress == clientAddress) {
                requests[index] = currentItem;
                index++;
            }
        }

        return requests;
    }

    function getRequestsMadeForUser(address postOwnerAddress)
        public
        view
        returns (Request[] memory)
    {
        uint256 itemCount = _requestIds.current();
        uint256 index = 0;

        Request[] memory requests = new Request[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            Request storage currentItem = idToRequest[i];

            if (currentItem.clientAddress == postOwnerAddress) {
                requests[index] = currentItem;
                index++;
            }
        }

        return requests;
    }
}
