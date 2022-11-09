import { createKeypairFromFile } from "../_keypairFromFile/keypairFromFile";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

export class SolanaAccount {
    name: string;
    keypair: Keypair;
    connection: Connection;
    programId: PublicKey;

    constructor(name: string, connection: Connection, programId: PublicKey) {
        this.name = name;
        this.keypair = createKeypairFromFile(__dirname + `/../../accounts/${name}.json`);
        this.connection = connection;
        this.programId = programId;
    }

    async requestAirdropSolana(amount: number) {
        const latestBlockHash = await this.connection.getLatestBlockhash();
        const airdropSignature = await this.connection.requestAirdrop(
            this.keypair.publicKey,
            amount * LAMPORTS_PER_SOL,
        );
        await this.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: airdropSignature,
        });
    }

    async sendSolana(to: SolanaAccount, amount: number) {
        console.log("Paul sends some SOL to George...");
        console.log(`   Paul's public key: ${this.keypair.publicKey}`);
        console.log(`   George's public key: ${to.keypair.publicKey}`);

        let data = Buffer.alloc(8); // 8 bytes
        const lo = require("buffer-layout");
        lo.ns64("value").encode(amount * LAMPORTS_PER_SOL, data);

        let ins = new TransactionInstruction({
            keys: [
                { pubkey: this.keypair.publicKey, isSigner: true, isWritable: true },
                { pubkey: to.keypair.publicKey, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: this.programId,
            data: data,
        })

        await sendAndConfirmTransaction(
            this.connection,
            new Transaction().add(ins),
            [this.keypair]
        );
    }
}