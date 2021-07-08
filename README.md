# PayFoot's ERC-20 Smart Contract
This is PayFoot's [ERC-20](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20) smart contract, whose tokens are used as stablecoins in their ecosystem.
> **Note:** Upon customer's request, the token smart contract does not include [pausable](https://docs.openzeppelin.com/contracts/3.x/api/token/erc20#ERC20Pausable) token transfers, minting, and burning, and has no initial token supply.

## Changelog
See the created [`CHANGELOG`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/CHANGELOG.md) file in this repository.

## Installation
### 1. Install the Truffle Framework
We use the Truffle framework for the compilation, testing, and deployment. Please follow their [guide](https://www.trufflesuite.com/truffle) to install the framework on your computer.

### 2. Getting Started
Run `npm i` in order to install the necessary [OpenZeppelin node modules](https://www.npmjs.com/package/@openzeppelin/contracts) as well as further required dependencies.

## Compilation
To compile the contract, it is important that you have installed the project correctly, as we use external dependencies and contracts. Use the following command to compile the contracts: 
```
truffle compile
```

## Unit Tests
Since we build the [ERC-20](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20) smart contract on top of the audited [OpenZeppelin node modules](https://www.npmjs.com/package/@openzeppelin/contracts), there is no further requirement to write dedicated tests for these modules. Nonetheless, due to the fact that we integrate the non-standard [`permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit-permit-address-address-uint256-uint256-uint8-bytes32-bytes32-) method, unit tests have been written for this specific extension.

You can run the tests with 
```
npx hardhat test
```

Furthermore, if you need to test the [`permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit-permit-address-address-uint256-uint256-uint8-bytes32-bytes32-) method on one of the live test networks, run the following command to generate the function parameters (assuming [Node.js](https://nodejs.org/en) is installed):
```
node .\scripts\sign-data.js
```

## Deployment
### Local Deployment With Ganache
To deploy the contract on your local Ganache blockchain, you must first install the software on your computer. Follow the installation [guide](https://www.trufflesuite.com/ganache).

Once you installed the local blockchain, you can create a workspace. This is described [here](https://www.trufflesuite.com/docs/ganache/workspaces/creating-workspaces).
> **Note:** We have observed that Truffle and Ganache do not use the same default RPC configuration. The easiest way to align is to adjust Ganache's server hostname, port, and network ID with Truffle's configurations (check the file [`truffle-config.js`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/truffle-config.js)).

Once you are setup, just run: 
```
truffle migrate --network development
```

### Rinkeby
To deploy the smart contract to [Rinkeby](https://rinkeby.etherscan.io), you need to preconfigure first some things:
1. Create a `secrets.json` file.
2. Create a [MetaMask Wallet](https://metamask.io) and paste the respective seedphrase into `secrets.json`. Make sure you got some ETH. You can get some [here](https://faucet.rinkeby.io).
3. Create a new [Infura project](https://infura.io) and copy the project key into `secrets.json`.
4. Create a [Etherscan](https://etherscan.io) account and copy the API key to `secrets.json`.
The file will look like the following (make sure to always [`.gitignore`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/.gitignore) it!):
```json
{
    "seedPhrase": "drip voice crush ...",
    "privateKey": "0c7342ea3cdcc0...",
    "owner": "0x3854Ca47Abc6...",
    "projectId": "a657e3934de84d...",
    "etherscanKey": "RQFAFV4DE1H75P..."
}
```

Now run the following command:
```
truffle migrate --network rinkeby
```

If the deployment was successful, you will get the final deployment result:

![Deployment Result](/assets/RinkebyDeploymentResult.png)

Copy the contract address and verify the contract right away so that you can interact with it. Run the following command:
```
truffle run verify PayFoot@<CONTRACTADDRESS> --network rinkeby
```

If the verification was successful, you will see a similar result as follows:
```bash
Verifying PayFoot@0x12bd590D921D3936Db75BA60FaAE1F6A2E495b46
Pass - Verified: https://rinkeby.etherscan.io/address/0x12bd590D921D3936Db75BA60FaAE1F6A2E495b46#contracts
Successfully verified 1 contract(s).
```

For more information, see [here](https://github.com/rkalis/truffle-plugin-verify).
> **Note:** The smart contract [`PayFoot.sol`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/contracts/PayFoot.sol) does include the [`permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit-permit-address-address-uint256-uint256-uint8-bytes32-bytes32-) method, which can be used to change an account's ERC20 allowance (see [`IERC20.allowance`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-allowance-address-address-)) by presenting a message signed by the account. By not relying on [`IERC20.approve`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-), the token holder account doesn't need to send a transaction, and thus is not required to hold Ether at all.

## Interaction
If you deployed the smart contract succefully, you are now able to interact with it.

### Local Interaction With the Truffle CLI
To start the Truffle JavaScript console, please run:
```
truffle develop
```

In the console, you can create an instance of the provided contract by typing:
```javascript
let i = await PayFoot.deployed()
```

You can use the instance variable to call functions like symbol:
```javascript
i.symbol()
```

### Rinkeby
Go to the corresponding Etherscan link, e.g. https://rinkeby.etherscan.io/address/CONTRACTADDRESS#code. You are able to invoke READ and WRITE functions on the contract.

## Test Deployments
The smart contract [`PayFoot.sol`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/contracts/PayFoot.sol) has been deployed across all the major test networks:
- **Rinkeby:** [0xBeA3fCC51e031a9A8c77C0D8CB9873FeBb783045](https://rinkeby.etherscan.io/address/0xbea3fcc51e031a9a8c77c0d8cb9873febb783045)
- **Ropsten:** [TBD](TBD)
- **Kovan:** [TBD](TBD)
- **Goerli:** [TBD](TBD)

## Production Deployments on PayFoot
The smart contract [`PayFoot.sol`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/contracts/PayFoot.sol) has been deployed to the PayFoot network with [Remix<sup>*</sup> ](http://remix.ethereum.org) and signed with the PayFoot hardware wallet (Ledger Nano S):
- Contract creation transaction hash: [0x92e3aace3921e07d6a133f90ad1425ecc256ba5ad7a8964eeacf73d04407b9fc](https://expedition.dev/tx/0x92e3aace3921e07d6a133f90ad1425ecc256ba5ad7a8964eeacf73d04407b9fc?network=PayFoot)
- **Contract address:** [0x1C90008B345fA5BEf50d6AB617A1BB91cf51c41d](https://expedition.dev/address/0x1C90008B345fA5BEf50d6AB617A1BB91cf51c41d?network=PayFoot)
- **Contract admin:** [0x5D47fBF83EE223AfFA58fdd5EF61877c067c7390](https://expedition.dev/address/0x5D47fBF83EE223AfFA58fdd5EF61877c067c7390?network=PayFoot)
- Contract Application Binary Interface (ABI): Can be downloaded from the [snippet](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/snippets/17). This file was copied from Remix after compilation.
> **Note 1:** Make sure that you always copy the full smart contract ABI and not just one of the inherited interfaces!

> **Note 2:** Remix uses checksummed addresses for the `At Address` button and if it's invalid the button is disabled. Always use checksummed addresses with Remix! One way to handle this is by using [EthSum](https://ethsum.netlify.app). The checksum algorithm is laid out in full detail [here](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md).

<sup>*</sup> Remix deployment configuration:
- Compiler: `0.8.6+commit.11564f7e`;
- Language: `Solidity`;
- EVM Version: `compiler default`;
- Enable optimization: `200`;
- Only the smart contract [`PayFoot.sol`](https://gitlab.appswithlove.net/payfoot/payfoot-token-contract/-/blob/main/contracts/PayFoot.sol) was used for compilation and deployment. Remix imported the dependencies successfully (see [here](https://remix-ide.readthedocs.io/en/latest/import.html) how this works in the background with the `.deps` folder);

## Further References
[1] https://docs.openzeppelin.com/contracts/4.x/erc20

[2] https://github.com/rkalis/truffle-plugin-verify

[3] https://www.trufflesuite.com/ganache

[4] https://www.trufflesuite.com/truffle
