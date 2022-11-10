import { Keypair, PublicKey } from "@solana/web3.js";
import path from "path";
import { createKeypairFromFile } from "../_keypairFromFile/keypairFromFile";

export function getProgramID(): PublicKey {
    let programKeypair: Keypair = createKeypairFromFile(
        path.join(
            path.resolve(__dirname, '../../../_dist'),
            'fund_transfer-keypair.json'
        )
    );
    return programKeypair.publicKey;
}