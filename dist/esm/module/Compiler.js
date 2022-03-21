import { AbstractSyntaxTreeGenerator } from "./AbstractSyntaxTreeGenerator";
import { CommandExecutor } from "./commands/CommandExecutor";
import { js_beautify as beautify } from "js-beautify";
import { PreCompiler } from "../util/PreCompiler";
var Compiler = /** @class */ (function () {
    function Compiler() {
    }
    Compiler.compile = function (source) {
        if (typeof source === "string") {
            source = PreCompiler.preCompile(source);
        }
        var ast = [];
        if (typeof source === "string") {
            ast = AbstractSyntaxTreeGenerator.generate(source);
        }
        var code = "/**\n * @generator InCode\n * @version 2.x\n */\nwindow.incode = {};\n(async () => {\n\n";
        ast.forEach(function (node) {
            code += "\n" + CommandExecutor.executeCommand(node) + "\n";
        });
        code += "\n})();";
        code = code.replace(/\n\n/g, "");
        return beautify(code, {
            indent_char: " ",
            indent_size: 2,
        });
    };
    return Compiler;
}());
export { Compiler };
//# sourceMappingURL=Compiler.js.map