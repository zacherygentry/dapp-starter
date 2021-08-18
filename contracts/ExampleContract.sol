// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ExampleContract {
    address public owner;
    uint public total;
    address[] payers;

    constructor() {
        owner = msg.sender;
        total = 0;
    }

    function addToTotal(uint _num) external {
        total += _num;
    }

    function pay() external payable {
        require(msg.value > .001 ether);
        payers.push(msg.sender);
    }

    function getPayers() external view returns(address[] memory) {
        return payers;
    }

}
