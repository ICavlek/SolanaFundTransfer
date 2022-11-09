import { createKeypairFromFile } from "../_keypairFromFile/keypairFromFile";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

export class SolanaAccount {
    name: string;
    keypair: Keypair;

    constructor(name: string) {
        this.name = name;
        this.keypair = createKeypairFromFile(__dirname + `/../../accounts/${name}.json`);
    }

    async sendLamports(connection: Connection, programId: PublicKey, to: PublicKey, amount: number) {
        console.log("Paul sends some SOL to George...");
        console.log(`   Paul's public key: ${this.keypair.publicKey}`);
        console.log(`   George's public key: ${to}`);

        let data = Buffer.alloc(8); // 8 bytes
        const lo = require("buffer-layout");
        lo.ns64("value").encode(amount, data);

        let ins = new TransactionInstruction({
            keys: [
                { pubkey: this.keypair.publicKey, isSigner: true, isWritable: true },
                { pubkey: to, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: programId,
            data: data,
        })

        await sendAndConfirmTransaction(
            connection,
            new Transaction().add(ins),
            [this.keypair]
        );
    }
}