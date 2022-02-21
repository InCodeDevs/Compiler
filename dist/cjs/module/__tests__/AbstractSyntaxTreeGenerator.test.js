"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractSyntaxTreeGenerator_1 = require("../AbstractSyntaxTreeGenerator");
test("Generate AST", function () {
    var code = 'Gib "Hallo Welt" in der Dialogbox aus\nErstelle x als Methode\n\tGib "1" in der Konsole aus\n\tGib "2" in der Konsole aus\nGib "Hello World" in der Konsole aus';
    expect(JSON.stringify(AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator.generate(code), null, 4)).toBe(JSON.stringify([
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
    ], null, 4));
});
//# sourceMappingURL=AbstractSyntaxTreeGenerator.test.js.map