"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CodeGenerator_1 = require("../CodeGenerator");
test("Generate Code", function () {
    var code = JSON.stringify('Gib "Hallo Welt" in der Dialogbox aus\nErstelle x als Methode\n\tGib "1" in der Konsole aus\n\tGib "2" in der Konsole aus\nGib "Hello World" in der Konsole aus\n');
    expect(JSON.stringify(CodeGenerator_1.CodeGenerator.generate([
        {
            intents: 0,
            command: "Gib",
            args: ['"Hallo\u0000Welt"', "in", "der", "Dialogbox", "aus"],
            children: [],
        },
        {
            intents: 0,
            command: "Erstelle",
            args: ["x", "als", "Methode"],
            children: [
                {
                    intents: 1,
                    command: "Gib",
                    args: ['"1"', "in", "der", "Konsole", "aus"],
                    children: [],
                },
                {
                    intents: 1,
                    command: "Gib",
                    args: ['"2"', "in", "der", "Konsole", "aus"],
                    children: [],
                },
            ],
        },
        {
            intents: 0,
            command: "Gib",
            args: ['"Hello\u0000World"', "in", "der", "Konsole", "aus"],
            children: [],
        },
    ]))).toBe(code);
});
//# sourceMappingURL=CodeGenerator.test.js.map