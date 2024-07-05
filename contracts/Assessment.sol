// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {

    uint256 private storedValue;
    uint256[] private valueHistory;

    event ValueStored(uint256 value);

    function setStoredValue(uint256 newValue) public {
        require(newValue != 0, "Cannot store value of 0...");

        storedValue = newValue;
        valueHistory.push(newValue);
        emit ValueStored(newValue);
    }

    function getStoredValue() public view returns (uint256) {
        return storedValue;
    }

    function getStoreHistory() public view returns (uint256[] memory) {
        return valueHistory;
    }

}
