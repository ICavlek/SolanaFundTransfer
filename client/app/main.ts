import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { getConnection } from "./_connection/connection";
import { getProgramID } from "./_solanaProgramKeyPair/solanaProgramKeyPair";
import { SolanaAccount } from "./_solanaAccount/solanaAccount";

async function main() {

    let connection: Connection = getConnection('devnet');
    let programId: PublicKey = getProgramID();
    const accountJohn: SolanaAccount = new SolanaAccount("john", connection, programId);
    const accountMark: SolanaAccount = new SolanaAccount("mark", connection, programId);

    // await accountJohn.requestAirdropSolana(1);
    // await accountMark.requestAirdropSolana(1);
    await accountJohn.sendSolana(accountMark, 0.2);
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);