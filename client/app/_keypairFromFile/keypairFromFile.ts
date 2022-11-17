import { Keypair } from "@solana/web3.js";
import { readFileSync, existsSync } from "fs";
import { NoFileError } from "../_error/error";


export function createKeypairFromFile(path: string): Keypair {
    if (!existsSync(path)) {
        throw new NoFileError(path);
    }
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}