import { getProgramID } from "../../app/_solanaProgramKeyPair/solanaProgramKeyPair";

describe('getProgramID test suite', () => {
    test('fund-transfer program keyPair', () => {
        const publicKey = getProgramID();
        expect(publicKey.toString()).toEqual("FYxCsmPzyVdHdqWg5bW7jcLo2wZbA2tmfexhhTXPtuDB");
    });
});