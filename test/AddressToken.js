const hre = require('hardhat');
const { ethers } = hre;
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { trim0x } = require('@1inch/solidity-utils');

describe('AddressToken', async function () {
    async function initContracts () {
        const AddressToken = await ethers.getContractFactory('AddressToken');
        const addressToken = await AddressToken.deploy();
        await addressToken.deployed();
        const [ signer ] = await ethers.getSigners();
        return { signer, addressToken };
    }

    it('should be ok', async function () {
        const { signer, addressToken } = await loadFixture(initContracts);
        
        const magic = '0x11223344556677881122334455667788';
        const tokenId = await addressToken.callStatic.mint(magic);
        await addressToken.mint(magic);
        expect(await addressToken.salts(tokenId)).to.be.equal(magic + signer.address.substring(10).toLowerCase());
        expect(await addressToken.tokenURI(tokenId)).to.be.equal('data:;base64,ewoJImRlc2NyaXB0aW9uIjogIkFsbG93cyBkZXBsb3lpbmcgdG8gMHg3ZjZDMTM3RGMwN2ZFNUU3MjM0OGEzNmRiN0M1MjYxMjNEM2JCN2UxIiwKCSJuYW1lIjogIkFkZHJlc3MgMHg3ZjZDMTM3RGMwN2ZFNUU3MjM0OGEzNmRiN0M1MjYxMjNEM2JCN2UxIgoJImV4dGVybmFsX3VybCI6ICJodHRwczovL2V0aGVyc2Nhbi5pby9hZGRyZXNzLzB4N2Y2QzEzN0RjMDdmRTVFNzIzNDhhMzZkYjdDNTI2MTIzRDNiQjdlMSIKfQ==');
    });
});
