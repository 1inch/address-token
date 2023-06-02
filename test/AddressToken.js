const hre = require('hardhat');
const { ethers } = hre;
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('AddressToken', async function () {
    async function initContracts () {
        const AddressToken = await ethers.getContractFactory('AddressToken');
        const addressToken = await AddressToken.deploy();
        await addressToken.deployed();
        const [signer] = await ethers.getSigners();
        expect(signer.address).to.be.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
        expect(addressToken.address).to.be.equal('0x5FbDB2315678afecb367f032d93F642f64180aa3');
        return { signer, addressToken };
    }

    describe('metadata', async function () {
        it('should ba valid for 0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x00000000000000000000000000000000';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701',
                    description: 'Enables holder to deploy arbitrary smart contract to 0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701',
                    external_url: 'https://etherscan.io/address/0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Zero bytes', value: 1 }
                    ],
                },
            );
        });
    });

    describe('attributes', async function () {
        async function attributesForMagic(magic) {
            const { signer, addressToken } = await loadFixture(initContracts);
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            await addressToken.mint(magic);
            const tokenURI = await addressToken.tokenURI(tokenId);
            return JSON.parse(atob(tokenURI.substring(29))).attributes;
        };

        describe('Repeated', async function () {
            describe('Repeated prefix', async function () {
                it('should contain 6 chars 0s prefix 0x000000c83464bE863348c0577676b2B5DC2750D6', async function () {
                    expect(await attributesForMagic('0x8f513f5357b59aca438c10a6682b71e7')).to.be.deep.equal(
                        [
                            { trait_type: 'Repeated prefix 0', value: 6 },
                            { trait_type: 'Repeated symbol 0', value: 6 },
                            { trait_type: 'Zero bytes', value: 3 },
                        ]
                    );
                });

                it('should contain 8 chars "f"s prefix in 0xfffFFFffD1Daf09114a485592272217A3EA24fCB', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0x3c1417bd1ff6dac047509a177b1d2f4e';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0xfffFFFffD1Daf09114a485592272217A3EA24fCB');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0xfffFFFffD1Daf09114a485592272217A3EA24fCB',
                            description: 'Enables holder to deploy arbitrary smart contract to 0xfffFFFffD1Daf09114a485592272217A3EA24fCB',
                            external_url: 'https://etherscan.io/address/0xfffFFFffD1Daf09114a485592272217A3EA24fCB',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated prefix f', value: 8 },
                                { trait_type: 'Repeated symbol f', value: 8 },
                                { trait_type: 'Palindrome', value: 5 },
                            ],
                        },
                    );
                });

                it('should contain 7 chars 0s prefix in 0x00000002FA77f233830F7EdDD02E14Fe29bc045F', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0x2cf3ea80f8bba4684e4922e8634ca299';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0x00000002FA77f233830F7EdDD02E14Fe29bc045F');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0x00000002FA77f233830F7EdDD02E14Fe29bc045F',
                            description: 'Enables holder to deploy arbitrary smart contract to 0x00000002FA77f233830F7EdDD02E14Fe29bc045F',
                            external_url: 'https://etherscan.io/address/0x00000002FA77f233830F7EdDD02E14Fe29bc045F',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated prefix 0', value: 7 },
                                { trait_type: 'Repeated symbol 0', value: 7 },
                                { trait_type: 'Zero bytes', value: 3 },
                            ],
                        },
                    );
                });
            });

            describe('Repeated suffix', async function () {
                it('should contain 8 chars "0"s suffix in 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0xbe9e5918442453fb19faad5834c099fd';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                            description: 'Enables holder to deploy arbitrary smart contract to 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                            external_url: 'https://etherscan.io/address/0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated suffix 0', value: 8 },
                                { trait_type: 'Repeated symbol 0', value: 8 },
                                { trait_type: 'Palindrome', value: 5 },
                                { trait_type: 'Zero bytes', value: 5 }
                            ],
                        },
                    );
                });

                it('should contain 8 chars "8"s suffix in 0x304A50f0f5c8C1df76E48a4FbCbb768188888888', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0xc6204b47c465b5295a951c3933d5e8bb';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0x304A50f0f5c8C1df76E48a4FbCbb768188888888');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0x304A50f0f5c8C1df76E48a4FbCbb768188888888',
                            description: 'Enables holder to deploy arbitrary smart contract to 0x304A50f0f5c8C1df76E48a4FbCbb768188888888',
                            external_url: 'https://etherscan.io/address/0x304A50f0f5c8C1df76E48a4FbCbb768188888888',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated suffix 8', value: 8 },
                                { trait_type: 'Repeated symbol 8', value: 8 },
                            ],
                        },
                    );
                });
            });

            describe('Repeated symbol', async function () {
                it('should contain 6 chars "5"s in 0x115555552E8226FeD8894DAfC1d1EF630F0C061D', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0x6e69bd7c52570e1e43e4330162c3aa56';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0x115555552E8226FeD8894DAfC1d1EF630F0C061D');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0x115555552E8226FeD8894DAfC1d1EF630F0C061D',
                            description: 'Enables holder to deploy arbitrary smart contract to 0x115555552E8226FeD8894DAfC1d1EF630F0C061D',
                            external_url: 'https://etherscan.io/address/0x115555552E8226FeD8894DAfC1d1EF630F0C061D',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated symbol 5', value: 6 },
                            ],
                        },
                    );
                });

                it('should contain 6 chars "7"s in 0xa281e98919cDEfc45775d6301E5177aF777777ff', async function () {
                    const { signer, addressToken } = await loadFixture(initContracts);

                    const magic = '0x80b999240f4447013a45fa23139a067e';
                    const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
                    expect(tokenId).to.be.equal('0xa281e98919cDEfc45775d6301E5177aF777777ff');
                    await addressToken.mint(magic);

                    const tokenURI = await addressToken.tokenURI(tokenId);
                    expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                        {
                            name: 'Deploy to 0xa281e98919cDEfc45775d6301E5177aF777777ff',
                            description: 'Enables holder to deploy arbitrary smart contract to 0xa281e98919cDEfc45775d6301E5177aF777777ff',
                            external_url: 'https://etherscan.io/address/0xa281e98919cDEfc45775d6301E5177aF777777ff',
                            image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                            animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                            attributes: [
                                { trait_type: 'Repeated symbol 7', value: 6 },
                                { trait_type: 'Palindrome', value: 8 } // "f777777f"
                            ],
                        },
                    );
                });
            });
        });

        it('should contain 5 chars palindrom "4cec4" in 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0xbe9e5918442453fb19faad5834c099fd';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                    external_url: 'https://etherscan.io/address/0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated suffix 0', value: 8 },
                        { trait_type: 'Repeated symbol 0', value: 8 },
                        { trait_type: 'Palindrome', value: 5 },
                        { trait_type: 'Zero bytes', value: 5 }
                    ],
                },
            );
        });

        it('should contain 4 chars "0"s and "1"s in 0x000011113d5b597ae1C108Cf1fBbD7012f9EA857', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x4f82c2e13228947b1de5b46c7f563724';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x000011113d5b597ae1C108Cf1fBbD7012f9EA857');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x000011113d5b597ae1C108Cf1fBbD7012f9EA857',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x000011113d5b597ae1C108Cf1fBbD7012f9EA857',
                    external_url: 'https://etherscan.io/address/0x000011113d5b597ae1C108Cf1fBbD7012f9EA857',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 4 },
                        { trait_type: 'Repeated symbol 0', value: 4 },
                        { trait_type: 'Repeated symbol 1', value: 4 },
                        { trait_type: 'Zero bytes', value: 2 },
                    ],
                },
            );
        });

        it('should contain 9 chars palindrome in 0x000010000866bf55C689Fc36F9e66bd3613dD629', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x8fae9c9a7897430c65b4c233d3f6e2fd';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x000010000866bf55C689Fc36F9e66bd3613dD629');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x000010000866bf55C689Fc36F9e66bd3613dD629',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x000010000866bf55C689Fc36F9e66bd3613dD629',
                    external_url: 'https://etherscan.io/address/0x000010000866bf55C689Fc36F9e66bd3613dD629',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 4 },
                        { trait_type: 'Repeated symbol 0', value: 4 },
                        { trait_type: 'Repeated symbol 0', value: 4 },
                        { trait_type: 'Palindrome prefix', value: 9 },
                        { trait_type: 'Palindrome', value: 9 },
                        { trait_type: 'Zero bytes', value: 3 },
                    ],
                },
            );
        });

        it('should contain "dead" and "beef" in 0xDEaDbeef3a622802249892685051dba97754dFa7', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0xe1d80650b3733e377736e969a7d4bc4a';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0xDEaDbeef3a622802249892685051dba97754dFa7');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0xDEaDbeef3a622802249892685051dba97754dFa7',
                    description: 'Enables holder to deploy arbitrary smart contract to 0xDEaDbeef3a622802249892685051dba97754dFa7',
                    external_url: 'https://etherscan.io/address/0xDEaDbeef3a622802249892685051dba97754dFa7',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Contains dead', value: 1 },
                        { trait_type: 'Contains beef', value: 1 },
                    ],
                },
            );
        });

        it('should contain 2 words "def1" in 0xdeF1Def1529c7271818C36a943AeC79a7125e324', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x3de30ba013a07a2c8f7c2171254025de';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0xdeF1Def1529c7271818C36a943AeC79a7125e324');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0xdeF1Def1529c7271818C36a943AeC79a7125e324',
                    description: 'Enables holder to deploy arbitrary smart contract to 0xdeF1Def1529c7271818C36a943AeC79a7125e324',
                    external_url: 'https://etherscan.io/address/0xdeF1Def1529c7271818C36a943AeC79a7125e324',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Contains def1', value: 2 },
                    ],
                },
            );
        });

        it('should cointan 7 chars palindrome in 0x123432108f4F503C347E35a3248EdD0ce2A7E163', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x8a7d4302575114f31c61fd9421c39aca';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x123432108f4F503C347E35a3248EdD0ce2A7E163');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x123432108f4F503C347E35a3248EdD0ce2A7E163',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x123432108f4F503C347E35a3248EdD0ce2A7E163',
                    external_url: 'https://etherscan.io/address/0x123432108f4F503C347E35a3248EdD0ce2A7E163',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Palindrome prefix', value: 7 },
                        { trait_type: 'Palindrome', value: 7 },
                    ],
                },
            );
        });

        it('should contain 8 chars palindrome in 0x12344321EE786Ba6430e08D464b7e17264e7A69D', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0xb4221b1445bed915c04a50916a93756c';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x12344321EE786Ba6430e08D464b7e17264e7A69D');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x12344321EE786Ba6430e08D464b7e17264e7A69D',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x12344321EE786Ba6430e08D464b7e17264e7A69D',
                    external_url: 'https://etherscan.io/address/0x12344321EE786Ba6430e08D464b7e17264e7A69D',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Palindrome prefix', value: 8 },
                        { trait_type: 'Palindrome', value: 8 },
                        { trait_type: 'Contains 1ee7', value: 1 },
                    ],
                },
            );
        });

        it('should contain 6 zero bytes in 0x0000aD001200ec933ff000cF1A00805126E72023', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x7a0a4d50f28412cd92f0444c5f84b7cb';
            const { tokenId } = await addressToken.addressAndSaltForMagic(magic, signer.address);
            expect(tokenId).to.be.equal('0x0000aD001200ec933ff000cF1A00805126E72023');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x0000aD001200ec933ff000cF1A00805126E72023',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x0000aD001200ec933ff000cF1A00805126E72023',
                    external_url: 'https://etherscan.io/address/0x0000aD001200ec933ff000cF1A00805126E72023',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Repeated prefix 0', value: 4 },
                        { trait_type: 'Repeated symbol 0', value: 4 },
                        { trait_type: 'Zero bytes', value: 6 },
                    ],
                },
            );
        });
    });
});
