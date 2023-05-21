const hre = require('hardhat');
const { getChainId } = hre;

module.exports = async ({ deployments, getNamedAccounts }) => {
    const networkName = hre.network.name;
    console.log(`running ${networkName} deploy script`);
    const chainId = await getChainId();
    console.log('network id ', chainId);
    if (chainId !== hre.config.networks[networkName].chainId.toString()) {
        console.log(`network chain id: ${hre.config.networks[networkName].chainId}, your chain id ${chainId}`);
        console.log('skipping wrong chain id deployment');
        return;
    }

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contractName = 'AddressToken';
    const contract = await deploy('AddressToken', {
        from: deployer,
        contract: contractName,
        skipIfAlreadyDeployed: true,
    });

    console.log(`${contractName} deployed to: ${contract.address}`);

    if (chainId !== '31337') {
        await hre.run('verify:verify', {
            address: contract.address,
        });
    }

    const AddressToken = await ethers.getContractFactory('AddressToken');
    const addressToken = await AddressToken.attach(contract.address);
    console.log(await addressToken.tokenURI('0x083fc10cE7e97CaFBaE0fE332a9c4384c5f54E45'));
};

module.exports.skip = async () => false;
