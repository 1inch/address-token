const hre = require('hardhat');
const { ethers } = hre;
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { trim0x } = require('@1inch/solidity-utils');
const { BigNumber } = require('ethers');

describe('AddressToken', async function () {
    async function initContracts () {
        const AddressToken = await ethers.getContractFactory('AddressToken');
        const addressToken = await AddressToken.deploy();
        await addressToken.deployed();
        const [signer] = await ethers.getSigners();
        console.log('signer', signer.address);
        console.log('addressToken', addressToken.address);
        return { signer, addressToken };
    }

    describe('mint and tokenURI', async function () {
        it('should work for 0x000000C13168BcEfeA11dE78747e4D314ea40838', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x0559d2424d880100b1a2090000000000';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x000000C13168BcEfeA11dE78747e4D314ea40838');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x000000C13168BcEfeA11dE78747e4D314ea40838',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x000000C13168BcEfeA11dE78747e4D314ea40838',
                    external_url: 'https://etherscan.io/address/0x000000C13168BcEfeA11dE78747e4D314ea40838',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 6 },
                    ],
                },
            );
        });

        it('should work for 0x52A4937394Cb46Cda07F6CC68078a95900000000', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0xcd0fe5e77823fccdc05ea4efaf652692';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x52A4937394Cb46Cda07F6CC68078a95900000000');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x52A4937394Cb46Cda07F6CC68078a95900000000',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x52A4937394Cb46Cda07F6CC68078a95900000000',
                    external_url: 'https://etherscan.io/address/0x52A4937394Cb46Cda07F6CC68078a95900000000',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated suffix 0', value: 8 },
                    ],
                },
            );
        });

        it('should work for 0x0000111100B1333Fd60c33A0f5eC3a1D21b40eF5', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x02b101bc528801005194680000000000';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x0000111100B1333Fd60c33A0f5eC3a1D21b40eF5');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x0000111100B1333Fd60c33A0f5eC3a1D21b40eF5',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x0000111100B1333Fd60c33A0f5eC3a1D21b40eF5',
                    external_url: 'https://etherscan.io/address/0x0000111100B1333Fd60c33A0f5eC3a1D21b40eF5',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 4 },
                        { trait_type: 'Repeated symbols 1', value: 4 },
                    ],
                },
            );
        });

        it('should work for 0x00001000072D7AA9191B731Aa2346286e6E78FB9', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x031ddf145388010016fab98202000000';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x00001000072D7AA9191B731Aa2346286e6E78FB9');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x00001000072D7AA9191B731Aa2346286e6E78FB9',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x00001000072D7AA9191B731Aa2346286e6E78FB9',
                    external_url: 'https://etherscan.io/address/0x00001000072D7AA9191B731Aa2346286e6E78FB9',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 4 },
                        { trait_type: 'Repeated symbols 0', value: 4 },
                    ],
                },
            );
        });

        it('should work for 0x000000087b51e4ABc32c8450fe6eF726707EeB8d', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0xb065c0eb80adac2bf3112f7724a5a523';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x000000087b51e4ABc32c8450fe6eF726707EeB8d');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x000000087b51e4ABc32c8450fe6eF726707EeB8d',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x000000087b51e4ABc32c8450fe6eF726707EeB8d',
                    external_url: 'https://etherscan.io/address/0x000000087b51e4ABc32c8450fe6eF726707EeB8d',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 7 },
                    ],
                },
            );
        });

        it('should work for 0xDeadbEefE12311Cb7FDb1f7Bc8cf6fe9904E7Bdb', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x137652d237f63d049d954e0ce97b5976';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0xDeadbEefE12311Cb7FDb1f7Bc8cf6fe9904E7Bdb');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0xDeadbEefE12311Cb7FDb1f7Bc8cf6fe9904E7Bdb',
                    description: 'Enables holder to deploy arbitrary smart contract to 0xDeadbEefE12311Cb7FDb1f7Bc8cf6fe9904E7Bdb',
                    external_url: 'https://etherscan.io/address/0xDeadbEefE12311Cb7FDb1f7Bc8cf6fe9904E7Bdb',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Contains dead', value: 1 },
                        { trait_type: 'Contains beef', value: 1 },
                    ],
                },
            );
        });

        it('should work for 0xdeF1def1083CA3aB7F8296247E0c6C4A4d88bB0E', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x4057ad8e6a801a25b9a97d2a0ae5ebbc';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0xdeF1def1083CA3aB7F8296247E0c6C4A4d88bB0E');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0xdeF1def1083CA3aB7F8296247E0c6C4A4d88bB0E',
                    description: 'Enables holder to deploy arbitrary smart contract to 0xdeF1def1083CA3aB7F8296247E0c6C4A4d88bB0E',
                    external_url: 'https://etherscan.io/address/0xdeF1def1083CA3aB7F8296247E0c6C4A4d88bB0E',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Contains def1', value: 2 },
                    ],
                },
            );
        });
    });
});
