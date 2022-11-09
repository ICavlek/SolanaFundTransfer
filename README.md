# SolanaFundTransfer
Example of sending funds on Solana network

### Creating your own solana keypair
```shell
solana-keygen new
```

### Setting devnet
```shell
solana config set --url devnet
```

### Funding your own solana keypair
```shell
solana airdrop 1
```
Sometimes it might fail, because solana devnet might be busy.

### Creating test accounts

```shell
solana-keygen new --no-bip39-passphrase -o accounts/john.json
```

Two accounts are already created. Necessary to fund them at the beginning so that the fund transfering is possible.

```shell
solana airdrop --keypair accounts/mark.json 1
```

### Building and deploying solana program

Shell script _cicd/cicd.sh allows to run the following:

```shell
npm run reset-and-build
```

It deletes node_modules and all the active programs from solana network, re-builds rust program, deploys it to the solana network and re-installs node_modules.

### Running TypeScript client

In one terminal:

```shell
npm run sendFunds
```
In another terminal:

```shell
solana logs | grep "<program id> invoke" -A 7
```
