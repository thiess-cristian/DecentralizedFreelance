//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract PostsManager {
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        address owner;
        uint256 id;
        string title;
        string content;
    }

    mapping(uint256 => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    event PostCreated(uint256 id, string title, string hash);

    constructor() {}

    function createPost(string memory title, string memory hash) public {
        uint256 postId = _postIds.current();
        _postIds.increment();

        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.content = hash;
        post.owner = msg.sender;

        hashToPost[hash] = post;

        emit PostCreated(postId, title, hash);
    }

    function fetchPost(string memory hash) public view returns (Post memory) {
        return hashToPost[hash];
    }

    function fetchPosts() public view returns (Post[] memory) {
        uint256 itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            Post storage currentItem = idToPost[i];
            posts[i] = currentItem;
        }
        return posts;
    }
}
