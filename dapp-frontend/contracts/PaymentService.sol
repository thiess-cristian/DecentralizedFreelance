//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract PaymentService {
    constructor() {}

    function sendBal(address payable receiver) external payable {
        uint256 amount = msg.value;
        receiver.transfer(amount);
    }
}
