// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { CREATE3 } from "solmate/src/utils/CREATE3.sol";

contract AddressToken is ERC721("1inch Address NFT", "1ANFT") {
    error AccessDenied();
    error RemintForbidden();
    error CallReverted(uint256, bytes);

    mapping(address tokenId => bytes32 salt) public salts;

    function addressForTokenId(uint256 tokenId) external pure returns(address) {
        return address(uint160(tokenId));
    }

    function tokenURI(uint256 tokenId) public pure override returns(string memory) {
        return string.concat("data:application/json;base64,", Base64.encode(bytes(tokenJSON(tokenId))));
    }

    function tokenJSON(uint256 tokenId) public pure returns(string memory) {
        bytes memory accountHex = bytes(Strings.toHexString(tokenId, 20));
        (bytes memory attributes, bytes memory accountMask) = _repeatedAttributes('', accountHex, new bytes(42));
        (attributes, accountMask) = _palindromAttributes(attributes, accountHex, accountMask);
        attributes = _wordsAttributes(attributes, accountHex);
        attributes = _countZeroBytesAttributes(attributes, accountHex);
        if (attributes.length > 0) {
            attributes = bytes.concat(attributes, '\n');
        }

        _checksumAddress(accountHex);

        bytes memory json = bytes.concat('{\n',
            '\t"name": "Deploy to ', accountHex, '",\n',
            '\t"description": "Enables holder to deploy arbitrary smart contract to ', accountHex, '",\n',
            '\t"external_url": "https://etherscan.io/address/', accountHex, '",\n',
            '\t"image": "ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc",\n',
            '\t"animation_url": "ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG",\n',
            '\t"attributes": [\n',
                attributes,
            '\t]\n',
        '}');

        return string(json);
    }

    function _repeatedAttributes(bytes memory attributes, bytes memory accountHex, bytes memory accountMask) private pure returns(bytes memory, bytes memory) {
        uint256 length = 1;
        bytes1 letter = accountHex[2];
        for (uint256 i = 3; i < 42; i++) {
            if (accountHex[i] == letter) {
                length++;
            }

            if (accountHex[i] != letter || i == 41) {
                if (length >= 4) {
                    if (length + 2 == i) {
                        attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Repeated prefix ', letter, '",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');
                    } else if (i == 41) {
                        attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Repeated suffix ', letter, '",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');
                    }
                    attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Repeated symbol ', letter, '",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');

                    for (uint256 t = 0; t < length; t++) {
                        accountMask[i + (accountHex[i] != letter ? 0 : 1) - length + t] = bytes1(uint8(length - t));
                    }
                }
                length = 1;
                letter = accountHex[i];
            }
        }
        return (attributes, accountMask);
    }

    function _palindromAttributes(bytes memory attributes, bytes memory accountHex, bytes memory accountMask) private pure returns(bytes memory, bytes memory) {
        for (uint256 length = 40; length >= 5; length--) {
            (attributes, accountMask) = _palindromLengthAttributes(attributes, accountHex, accountMask, length);
        }
        return (attributes, accountMask);
    }

    function _palindromLengthAttributes(bytes memory attributes, bytes memory accountHex, bytes memory accountMask, uint256 length) private pure returns(bytes memory, bytes memory) {
        for (uint256 i = 2; i <= 42 - length; i++) {
            if (uint8(accountMask[i]) >= length) {
                continue;
            }
            uint256 matched = 0;
            for (uint256 j = 0; j < length >> 1 && accountHex[i + j] == accountHex[i + length - 1 - j]; j++) {
                matched++;
            }

            if (matched == length >> 1) {
                if (i == 2) {
                    attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Palindrome prefix",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');
                } else if (i + matched == 42) {
                    attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Palindrome suffix",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');
                }
                attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Palindrome",\n\t\t\t"value": ', bytes(Strings.toString(length)), '\n\t\t}');

                for (uint256 t = 0; t < length; t++) {
                    accountMask[i + t] = bytes1(uint8(length - t));
                }
            }
        }

        return (attributes, accountMask);
    }

    function _wordsAttributes(bytes memory attributes, bytes memory accountHex) private pure returns(bytes memory) {
        string[17] memory words = [
            'dead', 'beef', 'c0ffee', 'def1',
            '1ee7', '1337', 'babe', 'f00d',
            'dec0de', 'facade', 'decade', 'feed',
            'face', 'c0de', 'c0c0a', 'caca0',
            'cafe'
        ];
        for (uint256 i = 0; i < words.length; i++) {
            attributes = _wordAttributes(attributes, accountHex, bytes(words[i]));
        }
        return attributes;
    }

    function _countZeroBytesAttributes(bytes memory attributes, bytes memory accountHex) private pure returns(bytes memory) {
        uint256 count = 0;
        for (uint256 i = 2; i < 42; i+=2) {
            if (accountHex[i] == '0' && accountHex[i + 1] == '0') {
                count++;
            }
        }
        if (count > 0) {
            attributes = bytes.concat(attributes, bytes(attributes.length > 0 ? ',\n' : ''), '\t\t{\n\t\t\t"trait_type": "Zero bytes",\n\t\t\t"value": ', bytes(Strings.toString(count)), '\n\t\t}');
        }
        return attributes;
    }

    function _wordAttributes(bytes memory attributes, bytes memory accountHex, bytes memory word) private pure returns(bytes memory) {
        // Look for word in account
        uint256 found = 0;
        for (uint256 i = 2; i < 42; i++) {
            uint256 matched = 0;
            for (uint256 j = 0; j < word.length && i + j < 42; j++) {
                if (accountHex[i + j] == word[j]) {
                    matched++;
                }
                else {
                    break;
                }
            }

            if (matched == word.length) {
                found++;
                i += word.length - 1;
            }
        }

        if (found > 0) {
            if (attributes.length > 0) {
                attributes = bytes.concat(attributes, ',\n');
            }
            attributes = bytes.concat(attributes, '\t\t{\n\t\t\t"trait_type": "Contains ', word, '",\n\t\t\t"value": ', bytes(Strings.toString(found)), '\n\t\t}');
        }

        return attributes;
    }

    function _checksumAddress(bytes memory hexAddress) private pure {
        bytes32 hash;
        assembly ("memory-safe") {  // solhint-disable-line no-inline-assembly
            hash := keccak256(add(hexAddress, 0x22), sub(mload(hexAddress), 2))
        }
        for (uint256 i = 2; i < 42; i++) {
            uint256 hashByte = uint8(hash[(i - 2) >> 1]);
            if (((i & 1 == 0) ? (hashByte >> 4) : (hashByte & 0x0f)) > 7 && hexAddress[i] > '9') {
                hexAddress[i] = bytes1(uint8(hexAddress[i]) - 0x20);
            }
        }
    }

    function addressAndSaltForMagic(bytes16 magic, address account) public view returns(address tokenId, bytes32 salt) {
        salt = bytes32(uint256(type(uint128).max & uint160(account))) | bytes32(magic);
        tokenId = CREATE3.getDeployed(salt);
    }

    function mint(bytes16 magic) external returns(address tokenId) {
        return mintFor(magic, msg.sender);
    }

    function mintFor(bytes16 magic, address account) public returns(address tokenId) {
        bytes32 salt;
        (tokenId, salt) = addressAndSaltForMagic(magic, account);
        if (salts[tokenId] != 0) revert RemintForbidden();
        salts[tokenId] = salt;
        _mint(account, uint160(tokenId));
    }

    function deploy(address tokenId, bytes calldata creationCode) public payable returns(address deployed) {
        if (msg.sender != ownerOf(uint160(tokenId))) revert AccessDenied();
        _burn(uint160(tokenId));
        deployed = CREATE3.deploy(salts[tokenId], creationCode, msg.value);
    }

    function deployAndCalls(address tokenId, bytes calldata creationCode, bytes[] calldata cds) external payable returns(address deployed) {
        deployed = deploy(tokenId, creationCode);
        for (uint256 i = 0; i < cds.length; i++) {
            (bool success, bytes memory reason) = deployed.call(cds[i]);  // solhint-disable-line avoid-low-level-calls
            if (!success) revert CallReverted(i, reason);
        }
    }
}
