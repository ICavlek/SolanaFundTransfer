import { Keypair, PublicKey } from "@solana/web3.js";
import { createKeypairFromFile } from "../_keypairFromFile/keypairFromFile";

export function getProgramID(): PublicKey {
    let programKeypair: Keypair = createKeypairFromFile(
        __dirname + `/../../../_dist/fund_transfer-keypair.json`
    );
    return programKeypair.publicKey;
}