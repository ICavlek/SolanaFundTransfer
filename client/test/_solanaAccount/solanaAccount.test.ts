import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { getConnection } from "../../app/_connection/connection";
import { getProgramID } from "../../app/_solanaProgramKeyPair/solanaProgramKeyPair";
import { SolanaAccount } from "../../app/_solanaAccount/solanaAccount";

describe('solanaAccount test suite', () => {
    test('solanaAccount John', () => {
        const connection: Connection = getConnection('devnet');
        const programId: PublicKey = getProgramID();
        const accountJohn: SolanaAccount = new SolanaAccount("john", connection, programId);
    });
});