// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {

    uint256 private transactionLog;
    uint256[] private transactionHistory;
    event ValueStored(uint256 value);

    function addTransactionLog(uint256 newValue) public {
        require(newValue != 0, "Cannot store value of 0...");

        transactionLog = newValue;
        transactionHistory.push(newValue);
        emit ValueStored(newValue);
    }

    function fetchTransactionLog() public view returns (uint256) {
        return transactionLog;
    }

    function fetchTransactionHistory() public view returns (uint256[] memory) {
        return transactionHistory;
    }

}