const networks = {
    // hardhat: {
    //     forking: {
    //         url: process.env.MAINNET_RPC_URL,
    //         httpHeaders: {
    //             'auth-key': process.env.RPC_AUTH_HEADER,
    //         },
    //     },
    //     chainId: Number(process.env.FORK_CHAIN_ID) || 31337,
    // },
};
const etherscan = { apiKey: {}, customChains: [] };

function register (name, chainId, url, privateKey, etherscanNetworkName, etherscanKey, hardfork = 'paris') {
    if (url && privateKey && etherscanKey) {
        networks[name] = {
            url,
            httpHeaders: {
                'auth-key': process.env.RPC_AUTH_HEADER,
            },
            chainId,
            accounts: [privateKey],
            hardfork,
        };
        etherscan.apiKey[etherscanNetworkName] = etherscanKey;
        console.log(`Network '${name}' registered`);
    } else {
        console.log(`Network '${name}' not registered`);
    }
}

function registerCustom (name, chainId, url, privateKey, etherscanKey, apiURL, browserURL, hardfork = 'paris') {
    if (url && privateKey && etherscanKey) {
        register(name, chainId, hardfork, url, privateKey, name, etherscanKey);
        etherscan.customChains.push({ network: name, chainId, urls: { apiURL, browserURL } });
    }
}

register('mainnet', 1, process.env.MAINNET_RPC_URL, process.env.MAINNET_PRIVATE_KEY, 'mainnet', process.env.MAINNET_ETHERSCAN_KEY, 'shanghai');
register('bsc', 56, process.env.BSC_RPC_URL, process.env.BSC_PRIVATE_KEY, 'bsc', process.env.BSC_ETHERSCAN_KEY);
register('kovan', 42, process.env.KOVAN_RPC_URL, process.env.KOVAN_PRIVATE_KEY, 'kovan', process.env.KOVAN_ETHERSCAN_KEY);
register('optimistic', 10, process.env.OPTIMISTIC_RPC_URL, process.env.OPTIMISTIC_PRIVATE_KEY, 'optimisticEthereum', process.env.OPTIMISTIC_ETHERSCAN_KEY);
register('matic', 137, process.env.MATIC_RPC_URL, process.env.MATIC_PRIVATE_KEY, 'polygon', process.env.MATIC_ETHERSCAN_KEY);
register('arbitrum', 42161, process.env.ARBITRUM_RPC_URL, process.env.ARBITRUM_PRIVATE_KEY, 'arbitrumOne', process.env.ARBITRUM_ETHERSCAN_KEY);
register('xdai', 100, process.env.XDAI_RPC_URL, process.env.XDAI_PRIVATE_KEY, 'gnosis', process.env.XDAI_ETHERSCAN_KEY);
register('avax', 43114, process.env.AVAX_RPC_URL, process.env.AVAX_PRIVATE_KEY, 'avalanche', process.env.AVAX_ETHERSCAN_KEY);
register('fantom', 250, process.env.FANTOM_RPC_URL, process.env.FANTOM_PRIVATE_KEY, 'opera', process.env.FANTOM_ETHERSCAN_KEY);
register('aurora', 1313161554, process.env.AURORA_RPC_URL, process.env.AURORA_PRIVATE_KEY, 'aurora', process.env.AURORA_ETHERSCAN_KEY);
register('base', 8453, process.env.BASE_RPC_URL, process.env.BASE_PRIVATE_KEY, 'base', process.env.BASE_ETHERSCAN_KEY);
registerCustom('klaytn', 8217, process.env.KLAYTN_RPC_URL, process.env.KLAYTN_PRIVATE_KEY, process.env.KLAYTN_ETHERSCAN_KEY, 'https://scope.klaytn.com/', 'https://scope.klaytn.com/');

module.exports = {
    networks,
    etherscan,
};
