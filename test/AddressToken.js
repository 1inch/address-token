const hre = require('hardhat');
const { ethers } = hre;
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('AddressToken', async function () {
    async function initContracts () {
        const AddressToken = await ethers.getContractFactory('AddressToken');
        const addressToken = await AddressToken.deploy(ethers.constants.AddressZero);
        await addressToken.deployed();
        const AddressTokenMetadata = await ethers.getContractFactory('AddressTokenMetadata');
        const addressTokenMetadata = await AddressTokenMetadata.deploy();
        await addressTokenMetadata.deployed();
        // this is done in this particular order to keep AddressToken at 0x5FbDB2315678afecb367f032d93F642f64180aa3
        await addressToken.upgradeMetadataContract(addressTokenMetadata.address);
        const [signer] = await ethers.getSigners();
        expect(signer.address).to.be.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
        expect(addressToken.address).to.be.equal('0x5FbDB2315678afecb367f032d93F642f64180aa3');
        return { signer, addressToken };
    }

    describe('Magics', async function () {
        it('should have proper magic for 0x000000a6C09bd7f6Ba10642DBaCe1bE60565A2F8', async function () {
            const { addressToken } = await loadFixture(initContracts);
            const tokenId = await addressToken.callStatic.mint('0x83e07be8812a93bc76504bc8c10f79c7');
            expect(tokenId).to.be.equal('0x000000a6C09bd7f6Ba10642DBaCe1bE60565A2F8');
        });

        it('should have proper magic for 0xc07EC7da97D7444F738e955f28F6C91d15000000', async function () {
            const { addressToken } = await loadFixture(initContracts);
            const tokenId = await addressToken.callStatic.mint('0xa245d3d1f4bc5e70beb85db24b6f4df1');
            expect(tokenId).to.be.equal('0xc07EC7da97D7444F738e955f28F6C91d15000000');
        });

        it('should have proper magic for 0x6828985368578258349260531646495303581057', async function () {
            const { addressToken } = await loadFixture(initContracts);
            const tokenId = await addressToken.callStatic.mint('0x4a7beee747938760a0fbd441e3ce93f5');
            expect(tokenId).to.be.equal('0x6828985368578258349260531646495303581057');
        });

        it('should have proper magic for 0x6666665e4d6a736100A7D8eD5dfBacDf99f29DFf', async function () {
            const { addressToken } = await loadFixture(initContracts);
            const tokenId = await addressToken.callStatic.mint('0x057b69fd8b880100129d0f0000000000');
            expect(tokenId).to.be.equal('0x6666665e4d6a736100A7D8eD5dfBacDf99f29DFf');
        });
    });

    describe('Metadata', async function () {
        it('should be valid for 0x89E802345bfB6CaD865fb5935fb6749D65D25764', async function () {
            const { signer, addressToken } = await loadFixture(initContracts);

            const magic = '0x00000000000000000000000000000000';
            const { tokenId } = await addressToken.getTokenIdAndSalt(magic, signer.address);
            expect(tokenId).to.be.equal('0x89E802345bfB6CaD865fb5935fb6749D65D25764');
            await addressToken.mint(magic);

            const tokenURI = await addressToken.tokenURI(tokenId);
            expect(JSON.parse(atob(tokenURI.substring(29)))).to.be.deep.equal(
                {
                    name: 'Deploy to 0x89E802345bfB6CaD865fb5935fb6749D65D25764',
                    description: 'Enables holder to deploy arbitrary smart contract to 0x89E802345bfB6CaD865fb5935fb6749D65D25764',
                    external_url: 'https://etherscan.io/address/0x89E802345bfB6CaD865fb5935fb6749D65D25764',
                    image: 'ipfs://QmZW3TTdtK87ktxmh6PG5UumbtoWXU8rVBApo65oknekmc',
                    animation_url: 'ipfs://QmZKp3K7oyDFPkVUXUgDKqZ6RcLZY7QW267JvXRTLW1qaG',
                    attributes: [
                        { trait_type: 'Zero bytes', value: 0 },
                        { trait_type: 'Symbol 0', value: 1 },
                        { trait_type: 'Symbol 1', value: 0 },
                        { trait_type: 'Symbol 2', value: 2 },
                        { trait_type: 'Symbol 3', value: 2 },
                        { trait_type: 'Symbol 4', value: 3 },
                        { trait_type: 'Symbol 5', value: 6 },
                        { trait_type: 'Symbol 6', value: 5 },
                        { trait_type: 'Symbol 7', value: 2 },
                        { trait_type: 'Symbol 8', value: 3 },
                        { trait_type: 'Symbol 9', value: 3 },
                        { trait_type: 'Symbol a', value: 1 },
                        { trait_type: 'Symbol b', value: 4 },
                        { trait_type: 'Symbol c', value: 1 },
                        { trait_type: 'Symbol d', value: 3 },
                        { trait_type: 'Symbol e', value: 1 },
                        { trait_type: 'Symbol f', value: 3 },
                    ],
                },
            );
        });
    });

    describe('Attributes', async function () {
        async function attributesForAddress (address) {
            const { addressToken } = await loadFixture(initContracts);
            const json = await addressToken.tokenJSON(address);
            return JSON.parse(json).attributes;
        };

        describe('Repeated', async function () {
            describe('Repeated prefix', async function () {
                it('should detect "000000"[6] in 0x000000c83464bE863348c0577676b2B5DC2750D6', async function () {
                    const attributes = await attributesForAddress('0x000000c83464bE863348c0577676b2B5DC2750D6');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated prefix 0', value: 6 },
                    ]);
                });

                it('should detect "ffffffff"[8] in 0xfffFFFffD1Daf09114a485592272217A3EA24fCB', async function () {
                    const attributes = await attributesForAddress('0xfffFFFffD1Daf09114a485592272217A3EA24fCB');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated prefix f', value: 8 },
                    ]);
                });

                it('should detect "0000000"[7] in 0x00000002FA77f233830F7EdDD02E14Fe29bc045F', async function () {
                    const attributes = await attributesForAddress('0x00000002FA77f233830F7EdDD02E14Fe29bc045F');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated prefix 0', value: 7 },
                    ]);
                });
            });

            describe('Repeated suffix', async function () {
                it('should detect "00000000"[8] in 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000', async function () {
                    const attributes = await attributesForAddress('0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated suffix 0', value: 8 },
                    ]);
                });

                it('should detect "88888888"[8] in 0x304A50f0f5c8C1df76E48a4FbCbb768188888888', async function () {
                    const attributes = await attributesForAddress('0x304A50f0f5c8C1df76E48a4FbCbb768188888888');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated suffix 8', value: 8 },
                    ]);
                });
            });

            describe('Repeated symbols', async function () {
                it('should detect "555555"[6] in 0x115555552E8226FeD8894DAfC1d1EF630F0C061D', async function () {
                    const attributes = await attributesForAddress('0x115555552E8226FeD8894DAfC1d1EF630F0C061D');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated symbol 5', value: 6 },
                    ]);
                });

                it('should detect "777777"[6] in 0xa281e98919cDEfc45775d6301E5177aF777777ff', async function () {
                    const attributes = await attributesForAddress('0xa281e98919cDEfc45775d6301E5177aF777777ff');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated symbol 7', value: 6 },
                    ]);
                });

                it('should detect "0000"[4] and "1111"[4] in 0x000011113d5b597ae1C108Cf1fBbD7012f9EA857', async function () {
                    const attributes = await attributesForAddress('0x000011113d5b597ae1C108Cf1fBbD7012f9EA857');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Repeated symbol 0', value: 4 },
                        { trait_type: 'Repeated symbol 1', value: 4 },
                    ]);
                });
            });
        });

        describe('Palindrome', async function () {
            describe('Palindrome prefix', async function () {
                it('should detect "1234321"[7] in 0x123432108f4F503C347E35a3248EdD0ce2A7E163', async function () {
                    const attributes = await attributesForAddress('0x123432108f4F503C347E35a3248EdD0ce2A7E163');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome prefix', value: 7 },
                    ]);
                });

                it('should detect "12344321"[8] in 0x12344321EE786Ba6430e08D464b7e17264e7A69D', async function () {
                    const attributes = await attributesForAddress('0x12344321EE786Ba6430e08D464b7e17264e7A69D');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome prefix', value: 8 },
                    ]);
                });

                it('should detect "000010000"[9] in 0x000010000866bf55C689Fc36F9e66bd3613dD629', async function () {
                    const attributes = await attributesForAddress('0x000010000866bf55C689Fc36F9e66bd3613dD629');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome prefix', value: 9 },
                    ]);
                });
            });

            describe('Palindrome suffix', async function () {
                it('should detect "123321"[6] in 0x4e00494631598d2ecFc09EE3B61781DD19123321', async function () {
                    const attributes = await attributesForAddress('0x4e00494631598d2ecFc09EE3B61781DD19123321');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome suffix', value: 6 },
                    ]);
                });

                it('should detect "1234321"[7] in 0x52ED9Cf497b94D8178596281C34e8D0001234321', async function () {
                    const attributes = await attributesForAddress('0x52ED9Cf497b94D8178596281C34e8D0001234321');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome suffix', value: 7 },
                    ]);
                });
            });

            describe('Palindrome symbols', async function () {
                it('should detect "4cec4"[5] in 0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000', async function () {
                    const attributes = await attributesForAddress('0x00A5DE6fa5880F4CeC4ad213C2A5045E00000000');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome', value: 5 },
                    ]);
                });
            });

            describe('Palindrome collisions', async function () {
                it('should not detect "000000"[6] in 0x000000c83464bE863348c0577676b2B5DC2750D6', async function () {
                    const attributes = await attributesForAddress('0x000000c83464bE863348c0577676b2B5DC2750D6');
                    expect(attributes).to.not.deep.include(
                        { trait_type: 'Palindrome prefix', value: 6 },
                    );
                    expect(attributes).to.not.deep.include(
                        { trait_type: 'Palindrome', value: 6 },
                    );
                });
            });

            describe('Palindrome longest', async function () {
                it('should detect "123321"[6] and not detect "45654"[5] in 0x123321E45654F111222333444555666777888999', async function () {
                    const attributes = await attributesForAddress('0x123321E45654F111222333444555666777888999');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Palindrome', value: 6 },
                    ]);
                    expect(attributes).to.not.deep.include(
                        { trait_type: 'Palindrome', value: 5 },
                    );
                });
            });
        });

        describe('Words', async function () {
            describe('Word prefix', async function () {
                it('should detect "def1" in 0xdeF1Def1529c7271818C36a943AeC79a7125e324', async function () {
                    const attributes = await attributesForAddress('0xdeF1Def1529c7271818C36a943AeC79a7125e324');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word prefix', value: 'def1' },
                    ]);
                });

                it('should detect "dead" in 0xDEaDbeef3a622802249892685051dba97754dFa7', async function () {
                    const attributes = await attributesForAddress('0xDEaDbeef3a622802249892685051dba97754dFa7');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word prefix', value: 'dead' },
                    ]);
                });
            });

            describe('Word suffix', async function () {
                it('should detect "c0ffee" in 0x82a98cE60D27F53b4520660e98Ccc58604C0ffEE', async function () {
                    const attributes = await attributesForAddress('0x82a98cE60D27F53b4520660e98Ccc58604C0ffEE');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word suffix', value: 'c0ffee' },
                    ]);
                });

                it('should detect "caca0" in 0x66d34a0024434De4Ae38C21F21904855471cACa0', async function () {
                    const attributes = await attributesForAddress('0x66d34a0024434De4Ae38C21F21904855471cACa0');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word suffix', value: 'caca0' },
                    ]);
                });
            });

            describe('Word middle', async function () {
                it('should detect 2 words "def1" in 0xdeF1Def1529c7271818C36a943AeC79a7125e324', async function () {
                    const attributes = await attributesForAddress('0xdeF1Def1529c7271818C36a943AeC79a7125e324');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word def1', value: 2 },
                    ]);
                });

                it('should detect "dead" and "beef" in 0xDEaDbeef3a622802249892685051dba97754dFa7', async function () {
                    const attributes = await attributesForAddress('0xDEaDbeef3a622802249892685051dba97754dFa7');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word dead', value: 1 },
                        { trait_type: 'Word beef', value: 1 },
                    ]);
                });

                it('should detect dead twice in deadead', async function () {
                    const attributes = await attributesForAddress('0xf1f1f1f1f1deadeadf1f1f1f1f1f1f1f1f1f1f1f');
                    expect(attributes).to.include.deep.members([
                        { trait_type: 'Word dead', value: 2 },
                    ]);
                });
            });
        });

        describe('Zero bytes', async function () {
            it('should detect 6 zero bytes in 0x0000aD001200ec933ff000cF1A00805126E72023', async function () {
                const attributes = await attributesForAddress('0x0000aD001200ec933ff000cF1A00805126E72023');
                expect(attributes).to.include.deep.members([
                    { trait_type: 'Zero bytes', value: 6 },
                ]);
            });
        });

        describe('Symbols', async function () {
            it('should properly detect symols in 0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701', async function () {
                const attributes = await attributesForAddress('0xcC0E952B187C00B5EDF8f652B70F66AF8B91b701');
                expect(attributes).to.include.deep.members([
                    { trait_type: 'Symbol 0', value: 5 },
                    { trait_type: 'Symbol 1', value: 3 },
                    { trait_type: 'Symbol 2', value: 2 },
                    { trait_type: 'Symbol 5', value: 3 },
                    { trait_type: 'Symbol 6', value: 3 },
                    { trait_type: 'Symbol 7', value: 3 },
                    { trait_type: 'Symbol 8', value: 3 },
                    { trait_type: 'Symbol 9', value: 2 },
                    { trait_type: 'Symbol a', value: 1 },
                    { trait_type: 'Symbol b', value: 5 },
                    { trait_type: 'Symbol c', value: 3 },
                    { trait_type: 'Symbol d', value: 1 },
                    { trait_type: 'Symbol e', value: 2 },
                    { trait_type: 'Symbol f', value: 4 },
                ]);
            });

            it('should detect 17 zeros in 0x610001900000007Cae4d9d060aD7fDb0dc003600', async function () {
                const attributes = await attributesForAddress('0x610001900000007Cae4d9d060aD7fDb0dc003600');
                expect(attributes).to.include.deep.members([
                    { trait_type: 'Symbol 0', value: 17 },
                ]);
            });
        });

        describe('Alphabets', async function () {
            it('should detect digits only in 0x2514075651515207174073914419183071120562', async function () {
                const attributes = await attributesForAddress('0x2514075651515207174073914419183071120562');
                expect(attributes).to.include.deep.members([
                    { trait_type: 'Digits only' },
                    { trait_type: 'Symbol a', value: 0 },
                    { trait_type: 'Symbol b', value: 0 },
                    { trait_type: 'Symbol c', value: 0 },
                    { trait_type: 'Symbol d', value: 0 },
                    { trait_type: 'Symbol e', value: 0 },
                    { trait_type: 'Symbol f', value: 0 },
                ]);
            });
        });
    });
});
