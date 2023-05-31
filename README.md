# 1inch Address NFT

Mainnet deployment: [0x1Add4e558Ce81fbdFD097550894CBdF37D448a9E](https://etherscan.io/address/0x1Add4e558Ce81fbdFD097550894CBdF37D448a9E)

This smart contract is an ERC721 token contract that allows anyone to mint address-based NFTs and deploy smart contracts to the addresses. This NFT enables primary and secondary market of addresses for smart contracts.

## Overview

The AddressToken contract is used to mint ERC721 tokens representing Ethereum addresses. Each token represents a unique address on the Ethereum blockchain. Users can mint tokens by providing a magic value, which is used to generate a corresponding address and salt. The salt is stored in the contract's mapping along with the tokenId, and the address is used as the tokenId for the minted token.

Token owners can deploy smart contracts to their owned addresses by providing the tokenId and the creation code of the contract. The contract deployment is done using the CREATE3 library. Additionally, a deployAndCall function is available to deploy and call a contract's function in a single transaction.

## Prerequisites

- Solidity version 0.8.19
- OpenZeppelin library (ERC721, Base64)
- solmate library (CREATE3)

## Contract Details

- Contract Name: AddressToken
- Token Name: 1inch Address NFT
- Token Symbol: 1ANFT

## Functions

### `addressForTokenId(uint256 tokenId) external pure returns(address)`

Returns the Ethereum address associated with the given `tokenId`.

### `tokenURI(uint256 tokenId) public pure override returns(string memory)`

Returns the URI metadata for the given `tokenId`. The URI contains information about the deployment and image of the associated address.

### `_checksumAddress(bytes memory hexAddress) private pure`

Internal function to checksum an Ethereum address represented in hexadecimal format.

### `addressAndSaltForMagic(bytes16 magic) public view returns(address account, bytes32 salt)`

Returns the account address and salt generated based on the provided `magic` value. The salt is a combination of the magic value and the sender's address.

### `mint(bytes16 magic) external returns(uint256 tokenId)`

Mints a new token with the provided `magic` value. The `magic` value is used to generate the address and salt for the token. The minted token is owned by the sender.

### `deploy(uint256 tokenId, bytes calldata creationCode) public payable returns(address deployed)`

Deploys a smart contract to the address associated with the given `tokenId`. The `creationCode` parameter contains the bytecode of the contract to be deployed. Only the owner of the token can perform this action. The function also accepts an optional `payable` value, which is forwarded to the contract being deployed.

### `deployAndCall(uint256 tokenId, bytes calldata creationCode, bytes calldata cd) external payable returns(address deployed)`

Deploys a smart contract to the address associated with the given `tokenId` and immediately calls a function on the deployed contract. The `creationCode` parameter contains the bytecode of the contract to be deployed, and the `cd` parameter contains the data for the function call. Only the owner of the token can perform this action.

## License

This smart contract is licensed under the MIT license.
