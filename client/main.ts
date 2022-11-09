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
    const accountPaul: SolanaAccount = new SolanaAccount("paul", connection, programId);
    const accountGeorge: SolanaAccount = new SolanaAccount("george", connection, programId);

    // await accountPaul.requestAirdropSolana(1);
    await accountPaul.sendSolana(accountGeorge, 0.4);
}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);