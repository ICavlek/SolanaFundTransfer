import { Keypair } from "@solana/web3.js";
import { readFileSync } from "fs";


export function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}