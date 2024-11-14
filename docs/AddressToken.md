
## AddressToken

### Functions list
- [constructor(_metadataContract, owner) public](#constructor)
- [addressForTokenId(tokenId) external](#addressfortokenid)
- [tokenURI(tokenId) public](#tokenuri)
- [tokenJSON(tokenId) public](#tokenjson)
- [getTokenIdAndSalt(magic, account) public](#gettokenidandsalt)
- [mint(magic) external](#mint)
- [mintFor(magic, account) public](#mintfor)
- [deploy(tokenId, creationCode) public](#deploy)
- [deployAndCalls(tokenId, creationCode, cds) external](#deployandcalls)
- [upgradeMetadataContract(_metadataContract) external](#upgrademetadatacontract)

### Errors list
- [AccessDenied() ](#accessdenied)
- [RemintForbidden() ](#remintforbidden)
- [CallReverted(, ) ](#callreverted)

### Functions
### constructor

```solidity
constructor(contract IAddressTokenMetadata _metadataContract, address owner) public
```

### addressForTokenId

```solidity
function addressForTokenId(uint256 tokenId) external pure returns (address)
```

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

_See {IERC721Metadata-tokenURI}._

### tokenJSON

```solidity
function tokenJSON(uint256 tokenId) public view returns (string)
```

### getTokenIdAndSalt

```solidity
function getTokenIdAndSalt(bytes16 magic, address account) public view returns (address tokenId, bytes32 salt)
```

### mint

```solidity
function mint(bytes16 magic) external returns (address tokenId)
```

### mintFor

```solidity
function mintFor(bytes16 magic, address account) public returns (address tokenId)
```

### deploy

```solidity
function deploy(address tokenId, bytes creationCode) public payable returns (address deployed)
```

### deployAndCalls

```solidity
function deployAndCalls(address tokenId, bytes creationCode, bytes[] cds) external payable returns (address deployed)
```

### upgradeMetadataContract

```solidity
function upgradeMetadataContract(contract IAddressTokenMetadata _metadataContract) external
```

### Errors
### AccessDenied

```solidity
error AccessDenied()
```

### RemintForbidden

```solidity
error RemintForbidden()
```

### CallReverted

```solidity
error CallReverted(uint256, bytes)
```

