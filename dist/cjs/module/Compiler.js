"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
var AbstractSyntaxTreeGenerator_1 = require("./AbstractSyntaxTreeGenerator");
var CommandExecutor_1 = require("./commands/CommandExecutor");
var js_beautify_1 = require("js-beautify");
var PreCompiler_1 = require("../util/PreCompiler");
var Compiler = /** @class */ (function () {
    function Compiler() {
    }
    Compiler.compile = function (source, comments // @TODO: implement
    ) {
        if (comments === void 0) { comments = false; }
        if (typeof source === "string") {
            source = PreCompiler_1.PreCompiler.preCompile(source);
        }
        var ast = [];
        if (typeof source === "string") {
            ast = AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator.generate(source);
        }
        var code = "/**\n * @generator InCode\n * @version 2.x\n */\n\nwindow.incode = {}\n\n";
        ast.forEach(function (node) {
            // code += "Code Comment" // TODO: implement
            code += CommandExecutor_1.CommandExecutor.executeCommand(node) + "\n";
        });
        return (0, js_beautify_1.js_beautify)(code, {
            indent_char: " ",
            indent_size: 2,
        });
    };
    return Compiler;
}());
exports.Compiler = Compiler;
console.log(Compiler.compile("Wenn die Taste x gedrückt wird Gib 'Hello World' in der Dialogbox aus"));
//# sourceMappingURL=Compiler.js.map