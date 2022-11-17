import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { getConnection } from "../../app/_connection/connection";
import { getProgramID } from "../../app/_solanaProgramKeyPair/solanaProgramKeyPair";
import { SolanaAccount } from "../../app/_solanaAccount/solanaAccount";

describe('solanaAccount test suite', () => {
    const connection: Connection = getConnection('devnet');
    const programId: PublicKey = getProgramID();

    test('solanaAccount John', () => {
        new SolanaAccount("john", connection, programId);
    });

    test('solanaAccount John request airdrop', async () => {
        const accountJohn = new SolanaAccount("john", connection, programId);
        await accountJohn.requestAirdropSolana(1);
    });
});