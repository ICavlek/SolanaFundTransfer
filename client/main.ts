import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { getConnection } from "./_connection/connection";
import { getProgramID } from "./_solanaProgramKeyPair/solanaProgramKeyPair";
import { createKeypairFromFile } from "./_keypairFromFile/keypairFromFile";
import { SolanaAccount } from "./_solanaAccount/solanaAccount";

async function main() {

    let connection: Connection = getConnection('devnet');
    let programId: PublicKey = getProgramID();

    // Our sample members are Ringo, George, Paul & John.
    let georgeKeypair: Keypair = createKeypairFromFile(__dirname + "/../accounts/george.json");

    let accountPaul: SolanaAccount = new SolanaAccount("paul");
    accountPaul.sendLamports(connection, programId, georgeKeypair.publicKey, 4000000);

    // const latestBlockHash = await connection.getLatestBlockhash();

    // const airdropSignaturePaul = await connection.requestAirdrop(
    //     paulKeypair.publicKey,
    //     LAMPORTS_PER_SOL,
    // );

    // const airdropSignatureJohn = await connection.requestAirdrop(
    //     johnKeypair.publicKey,
    //     LAMPORTS_PER_SOL,
    // );

    // We'll start by airdropping some lamports to Paul & John.
    // await connection.confirmTransaction({
    //     blockhash: latestBlockHash.blockhash,
    //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //     signature: airdropSignaturePaul,
    // });

    // await connection.confirmTransaction({
    //     blockhash: latestBlockHash.blockhash,
    //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //     signature: airdropSignatureJohn,
    // });

    // Paul sends some SOL to George.
    // console.log("Paul sends some SOL to George...");
    // console.log(`   Paul's public key: ${paulKeypair.publicKey}`);
    // console.log(`   George's public key: ${georgeKeypair.publicKey}`);
    // await sendLamports(connection, programId, paulKeypair, georgeKeypair.publicKey, 4000000);

    // // George sends some SOL over to John.
    // console.log("George sends some SOL over to John...");
    // console.log(`   George's public key: ${georgeKeypair.publicKey}`);
    // console.log(`   John's public key: ${johnKeypair.publicKey}`);
    // await sendLamports(georgeKeypair, johnKeypair.publicKey, 2000000);

    // // John sends some SOL to Ringo.
    // console.log("John sends some SOL to Ringo...");
    // console.log(`   John's public key: ${johnKeypair.publicKey}`);
    // console.log(`   Ringo's public key: ${ringoKeypair.publicKey}`);
    // await sendLamports(johnKeypair, ringoKeypair.publicKey, 5000000);

}


main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);