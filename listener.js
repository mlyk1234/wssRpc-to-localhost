const { ethers, Contract } = require("ethers");
const provider = new ethers.providers.WebSocketProvider("ws://localhost:8080");
  
// Subscribe to new blocks
provider.on('block', (blockNumber) => {
    console.log(`New block detected: ${blockNumber}`);
});

// ABI of the ERC-20 token contract
const tokenAbi = [
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    // other functions...
];

const tokenContract = new ethers.Contract('0xdAC17F958D2ee523a2206206994597C13D831ec7', tokenAbi, provider);

// Register a callback function for the Transfer event
tokenContract.on('Transfer', (from, to, value) => {
    console.log(`Transfer event: ${from} -> ${to}, value: ${value.toString()}`);
});