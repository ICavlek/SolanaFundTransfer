import { createKeypairFromFile } from "../../app/_keypairFromFile/keypairFromFile";
import { NoFileError } from "../../app/_error/error";

describe('createKeypairFromFile test suite', () => {
    test('keypair john', () => {
        createKeypairFromFile(__dirname + `/../../../accounts/john.json`);
    });

    test('keypair mark', () => {
        createKeypairFromFile(__dirname + `/../../../accounts/mark.json`);
    });

    test('keypair wrong', () => {
        const t = () => {
            createKeypairFromFile(__dirname + `/../../../accounts/dinamo.json`);
        };
        expect(t).toThrow(NoFileError);
    });
});