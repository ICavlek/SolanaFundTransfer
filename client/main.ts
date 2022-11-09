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


/**
 * Here we are sending lamports using the Rust program we wrote.
 * So this looks familiar. We're just hitting our program with the proper instructions.
 */
async function sendLamports(connection: Connection, programId: PublicKey, from: Keypair, to: PublicKey, amount: number) {

    let data = Buffer.alloc(8); // 8 bytes
    const lo = require("buffer-layout");
    lo.ns64("value").encode(amount, data);

    let ins = new TransactionInstruction({
        keys: [
            { pubkey: from.publicKey, isSigner: true, isWritable: true },
            { pubkey: to, isSigner: false, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: programId,
        data: data,
    })

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(ins),
        [from]
    );
}



/**
 * Main
 */

async function main() {

    let connection: Connection = getConnection('devnet');
    let programId: PublicKey = getProgramID();

    // Our sample members are Ringo, George, Paul & John.
    let ringoKeypair: Keypair = createKeypairFromFile(__dirname + "/../accounts/ringo.json");
    let georgeKeypair: Keypair = createKeypairFromFile(__dirname + "/../accounts/george.json");
    let paulKeypair: Keypair = createKeypairFromFile(__dirname + "/../accounts/paul.json");
    let johnKeypair: Keypair = createKeypairFromFile(__dirname + "/../accounts/john.json");

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
    console.log("Paul sends some SOL to George...");
    console.log(`   Paul's public key: ${paulKeypair.publicKey}`);
    console.log(`   George's public key: ${georgeKeypair.publicKey}`);
    await sendLamports(connection, programId, paulKeypair, georgeKeypair.publicKey, 4000000);

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