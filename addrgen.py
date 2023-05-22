from Crypto.Hash import keccak
from multiprocessing import Pool

PROXY_BYTECODE_HASH = bytes.fromhex('21c35dbe1b344a2488cf3321d6ce542f8e9f305544ff09e4993a62319a497c1f')

minter = bytes.fromhex('')  # minter address
prefix = bytes.fromhex('ff1Add4e558Ce81fbdFD097550894CBdF37D448a9E')
suffix = minter[-16:] + PROXY_BYTECODE_HASH
required_prefix = bytes.fromhex('000000')
d6_94 = bytes.fromhex('d694')
suffix_01 = bytes.fromhex('01')

def check_seed(i):
    seed = i.to_bytes(16, 'big')

    keccak_obj = keccak.new(digest_bits=256)
    keccak_obj.update(prefix + seed + suffix)
    proxy_addr = keccak_obj.digest()[-20:]

    keccak_obj = keccak.new(digest_bits=256)
    keccak_obj.update(d6_94 + proxy_addr + suffix_01)
    final_addr = keccak_obj.digest()[-20:]

    if final_addr.startswith(required_prefix):
        print('0x' + seed.hex(), '0x' + final_addr.hex())


if __name__ == '__main__':
    with Pool() as p:
        p.map(check_seed, range(0, 1000000000))
