import { Keypair, PublicKey } from "@solana/web3.js";
import { readFileSync } from "fs";
import path from "path";

export function getProgramID(): PublicKey {
    let programKeypair: Keypair = createKeypairFromFile(
        path.join(
            path.resolve(__dirname, '../../_dist/program'),
            'program-keypair.json'
        )
    );
    return programKeypair.publicKey;
}

function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    )
}