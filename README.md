# README

## Overview

This repository contains my files for the Module 2 project in the ETH + AVAX Proof: Intermediate EVM Course. It holds a contract named `Assessment.sol`, which is a smart contract for logging transactions on the Ethereum blockchain. The contract allows users to add transaction logs and retrieve their transaction history. The key functionalities of the contract are:

- `addTransactionLog(uint _value)`: Adds a new transaction log with a specified value.
- `fetchTransactionLog()`: Retrieves the most recent transaction log.
- `fetchTransactionHistory()`: Retrieves the entire transaction history of the connected account.

Additionally, this repository contains a React application (`index.js`) for interacting with the `Assessment.sol` contract. The application provides the following features and functionalities:

- Connects to the user's MetaMask wallet.
- Allows users to add new transaction logs.
- Displays the most recent transaction log.
- Displays the complete transaction history for the connected account.

## Prerequisites

To use the files contained in this repository, you will need the following:

- Gitpod, VS Code, or any development environment capable of running Solidity contracts and React applications.
- MetaMask browser extension.

## Usage (As provided by the template)

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Authors
Angel Cruz - (https://github.com/PiiDeeGy)