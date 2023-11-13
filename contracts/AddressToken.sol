// SPDX-License-Identifier: MIT

/*
                                                           ,▄▓▓██▌   ,╓▄▄▓▓▓▓▓▓▓▓▄▄▄,,
                                                        ,▓██▓███▓▄▓███▓╬╬╬╬╬╬╬╬╬╬╬╬╬▓███▓▄,
                                                  ▄█   ▓██╬╣███████╬▓▀╬╬▓▓▓████████████▓█████▄,
                                                 ▓██▌ ▓██╬╣██████╬▓▌  ██████████████████████▌╙╙▀ⁿ
                                                ▐████████╬▓████▓▓█╨ ▄ ╟█████████▓▓╬╬╬╬╬▓▓█████▓▄
                                  └▀▓▓▄╓        ╟█▓╣█████▓██████▀ ╓█▌ ███████▓▓▓▓▓╬╬╬╬╬╬╬╬╬╬╬╬▓██▓▄
                                     └▀████▓▄╥  ▐██╬╬██████████╙ Æ▀─ ▓███▀╚╠╬╩▀▀███████▓▓╬╬╬╬╬╬╬╬╬██▄
                                        └▀██▓▀▀█████▓╬▓██████▀     ▄█████▒╠"      └╙▓██████▓╬╬╬╬╬╬╬╬██▄
                                           └▀██▄,└╙▀▀████▌└╙    ^"▀╙╙╙"╙██      @▄    ╙▀███████╬╬╬╬╬╬╬██µ
                                              └▀██▓▄, ██▌       ╒       ╙█▓     ]▓█▓╔    ▀███████▓╬╬╬╬╬▓█▌
                                                  ▀█████       ▓         ╟█▌    ]╠██▓░▒╓   ▀████████╬╬╬╬╣█▌
                                                  ▐████      ╓█▀█▌      ,██▌    ╚Å███▓▒▒╠╓  ╙█████████╬╬╬╣█▌
                                                  └████     ▓█░░▓█      ▀▀▀    φ▒╫████▒▒▒▒╠╓  █████████▓╬╬▓█µ
                                                   ╘███µ ▌▄█▓▄▓▀`     ,▀    ,╔╠░▓██████▌╠▒▒▒φ  ██████████╬╬██
                                                   ▐████µ╙▓▀`     ,▀╙,╔╔φφφ╠░▄▓███████▌░▓╙▒▒▒╠ └██╬███████╬▓█⌐
                                                   ╫██ ▓▌         ▌φ▒▒░▓██████████████▌▒░▓╚▒▒▒╠ ▓██╬▓██████╣█▌
                                                   ██▌           ▌╔▒▒▄████████████████▒▒▒░▌╠▒▒▒≥▐██▓╬╬███████▌
                                                   ██▌      ,╓φ╠▓«▒▒▓████▀  ▀█████████▌▒▒▒╟░▒▒▒▒▐███╬╬╣████▓█▌
                                                  ▐██      ╠▒▄▓▓███▓████└     ▀████████▌▒▒░▌╚▒▒▒▐███▓╬╬████ ╙▌
                                                  ███  )  ╠▒░░░▒░╬████▀        └████████░▒▒░╬∩▒▒▓████╬╬╣███
                                                 ▓██    ╠╠▒▒▐█▀▀▌`░╫██           ███████▒▒▒▒░▒▒½█████╬╬╣███
                                                ███ ,█▄ ╠▒▒▒╫▌,▄▀,▒╫██           ╟██████▒▒▒░╣⌠▒▓█████╬╬╣██▌
                                               ╘██µ ██` ╠▒▒░██╬φ╠▄▓██`            ██████░░▌φ╠░▓█████▓╬╬▓██
                                                ╟██  .φ╠▒░▄█▀░░▄██▀└              █████▌▒╣φ▒░▓██████╬╬╣██
                                                 ▀██▄▄▄╓▄███████▀                ▐█████░▓φ▒▄███████▓╬╣██
                                                   ╙▀▀▀██▀└                      ████▓▄▀φ▄▓████████╬▓█▀
                                                                                ▓███╬╩╔╣██████████▓██└
                                                                              ╓████▀▄▓████████▀████▀
                                                                            ,▓███████████████─]██╙
                                                                         ,▄▓██████████████▀└  ╙
                                                                    ,╓▄▓███████████████▀╙
                                                             `"▀▀▀████████▀▀▀▀`▄███▀▀└
                                                                              └└

                                                        11\   11\                     11\
                                                      1111 |  \__|                    11 |
                                                      \_11 |  11\ 1111111\   1111111\ 1111111\
                                                        11 |  11 |11  __11\ 11  _____|11  __11\
                                                        11 |  11 |11 |  11 |11 /      11 |  11 |
                                                        11 |  11 |11 |  11 |11 |      11 |  11 |
                                                      111111\ 11 |11 |  11 |\1111111\ 11 |  11 |
                                                      \______|\__|\__|  \__| \_______|\__|  \__|


                         111111\        11\       11\                                               11\   11\ 11111111\ 11111111\
                        11  __11\       11 |      11 |                                              111\  11 |11  _____|\__11  __|
                        11 /  11 | 1111111 | 1111111 | 111111\   111111\   1111111\  1111111\       1111\ 11 |11 |         11 |
                        11111111 |11  __11 |11  __11 |11  __11\ 11  __11\ 11  _____|11  _____|      11 11\11 |11111\       11 |
                        11  __11 |11 /  11 |11 /  11 |11 |  \__|11111111 |\111111\  \111111\        11 \1111 |11  __|      11 |
                        11 |  11 |11 |  11 |11 |  11 |11 |      11   ____| \____11\  \____11\       11 |\111 |11 |         11 |
                        11 |  11 |\1111111 |\1111111 |11 |      \1111111\ 1111111  |1111111  |      11 | \11 |11 |         11 |
                        \__|  \__| \_______| \_______|\__|       \_______|\_______/ \_______/       \__|  \__|\__|         \__|
*/

pragma solidity 0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC4906 } from "@openzeppelin/contracts/interfaces/IERC4906.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
import { CREATE3 } from "solmate/src/utils/CREATE3.sol";
import { IAddressTokenMetadata } from "./interfaces/IAddressTokenMetadata.sol";

contract AddressToken is ERC721("1inch Address NFT", "1ANFT"), Ownable, IERC4906 {
    error AccessDenied();
    error RemintForbidden();
    error CallReverted(uint256, bytes);

    bytes32 private constant _LOW_128_BIT_MASK = 0x00000000000000000000000000000000ffffffffffffffffffffffffffffffff;

    mapping(address /* tokenId */ => bytes32 /* salt */) public salts;
    IAddressTokenMetadata public metadataContract;

    constructor(IAddressTokenMetadata _metadataContract, address owner) Ownable(owner) {
        metadataContract = _metadataContract;
    }

    function addressForTokenId(uint256 tokenId) external pure returns(address) {
        return address(uint160(tokenId));
    }

    function tokenURI(uint256 tokenId) public view override returns(string memory) {
        return string.concat("data:application/json;base64,", Base64.encode(bytes(tokenJSON(tokenId))));
    }

    function tokenJSON(uint256 tokenId) public view returns(string memory) {
        return metadataContract.tokenJSON(tokenId);
    }

    function getTokenIdAndSalt(bytes16 magic, address account) public view returns(address tokenId, bytes32 salt) {
        bytes32 hashedAccount = keccak256(abi.encodePacked(account));
        salt = (_LOW_128_BIT_MASK & hashedAccount) | bytes32(magic);
        tokenId = CREATE3.getDeployed(salt);
    }

    function mint(bytes16 magic) external returns(address tokenId) {
        return mintFor(magic, msg.sender);
    }

    function mintFor(bytes16 magic, address account) public returns(address tokenId) {
        bytes32 salt;
        (tokenId, salt) = getTokenIdAndSalt(magic, account);
        if (salts[tokenId] != 0) revert RemintForbidden();
        salts[tokenId] = salt;
        _safeMint(account, uint160(tokenId));
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

    function upgradeMetadataContract(IAddressTokenMetadata _metadataContract) external onlyOwner {
        metadataContract = _metadataContract;
        emit BatchMetadataUpdate(0, type(uint256).max);
    }
}
