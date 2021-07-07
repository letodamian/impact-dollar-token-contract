// Author: Pascal Marco Caversaccio
// E-Mail: pascal.caversaccio@hotmail.ch

// -------------------IMPORTS------------------- //
let Web3 = require('web3'); // Add the web3 node package
let ethUtil = require('ethereumjs-util'); // 'ethereumjs-util' is a collection of utility functions for Ethereum
let sigUtil  = require('eth-sig-util'); // 'eth-sig-util' is a small collection of Ethereum signing functions
const config = require('./data-config.json'); // Include the network-specific configurations
const contractAbi = require('./ABI/PayFoot.json'); // Import the contract ABI of the smart contract
const BigNumber = require('bignumber.js'); // Add the bignumber.js node package
const { EIP712Domain } = require('./helper.js'); // Add some helpers

// -------------------PARAMETERS------------------- //
// Load the Infura project ID, the private key & address for the `owner` parameter needed for the signature
const { projectId, privateKey, owner } = require('./../secrets.json');

const chain = 'rinkeby'; // Define the chain for which the data should be generated
const web3 = new Web3(`https://${chain}.infura.io/v3/${projectId}`); // Initiate the web3 object using the Infura project ID
const tokenAddress = config[chain].verifyingContract; // Set the deployed token contract address
const tokenContract = new web3.eth.Contract(contractAbi, tokenAddress); // Initiate the web3 contract object
const chainId = config[chain].network_id; // Defining the chain ID (e.g. Rinkeby, Ropsten, Ethereum Mainnet)
const name = config[chain].name; // Defining the domain name
const version = config[chain].version; // Defining the current version of the domain object
const spender = config[chain].spenderAddress; // Defining the spender address, i.e. who gets the allowance
let value = new BigNumber(10 ** 18); // Amount the spender is permitted
value = value.toFixed(); // Convert to number
const deadline = config[chain].deadline; // Setting the deadline for allowance
tokenContract.methods.nonces(owner).call().then(res => {
    const nonce = res; // Setting the nonce needed for the signature (replay protection)

// -------------------PERMIT PARAMETERS------------------- //
// Defining the general permit struct
const Permit = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
];

// Defining the permit data struct values as function of `verifyingContract` address 
const buildData = (verifyingContract) => ({
    primaryType: 'Permit',
    types: { EIP712Domain, Permit },
    domain: { name, version, chainId, verifyingContract },
    message: { owner, spender, value, nonce, deadline },
});

const data = buildData(tokenAddress); // Build the final data struct

// -------------------SIGNATURE------------------- //
const signature = sigUtil.signTypedData_v4(Buffer.from(privateKey, 'hex'), { data }); // Generate the signature

const { v, r, s } = ethUtil.fromRpcSig(signature); // Retrieve r (bytes32), s (bytes32), and v (uint8) variables of the signature

console.assert(ethUtil.toChecksumAddress(owner) == ethUtil.toChecksumAddress(sigUtil.recoverTypedSignature_v4({data, sig: signature}))); // Assert that the `owner` is equal to the `signer`
console.log('----------------------------------------------','\n');

// -------------------INPUT PARAMETERS FOR PERMIT TRANSACTION------------------- //
console.log('owner (address): ' + owner, '\n');
console.log('spender (address): ' + spender, '\n');
console.log('value (uint256): ' + value, '\n');
console.log('deadline (uint256): ' + deadline, '\n');
console.log('v (uint8): ' + v, '\n');
console.log('r (bytes32): ' + '0x' + r.toString('hex'), '\n');
console.log('s (bytes32): ' + '0x' + s.toString('hex'), '\n');
});
