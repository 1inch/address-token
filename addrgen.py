from web3 import Web3

PROXY_BYTECODE_HASH = '0x21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f'

minter = ''  # specify address of the minter

for i in range(100000000):
    seed = '0x' + hex(i)[2:].zfill(32)  # 16 bytes of randomness
    salt = seed + minter[-32:]

    proxy_addr = '0x' + Web3.solidity_keccak(
        ['bytes1', 'address', 'bytes32', 'bytes32'],
        ['0xff', '0x1Add4e558Ce81fbdFD097550894CBdF37D448a9E', salt, PROXY_BYTECODE_HASH]
    ).hex()[-40:]

    final_addr = '0x' + Web3.solidity_keccak(
        ['bytes2', 'address', 'bytes1'],
        ['0xd694', Web3.to_checksum_address(proxy_addr), '0x01']
    ).hex()[-40:]

    if final_addr.startswith('0x0000'):
        print('0x' + hex(i)[2:].zfill(32), final_addr)
