var CodeGenerator = /** @class */ (function () {
    function CodeGenerator() {
    }
    CodeGenerator.generate = function (ast) {
        var _this = this;
        var code = "";
        ast.forEach(function (node) {
            code += _this.generateNode(node);
        });
        return code;
    };
    CodeGenerator.generateNode = function (node) {
        var _this = this;
        var code = node.command + " " + node.args.join(" ").replace("\0", " ");
        for (var i = 0; i < node.intents; i++) {
            code = "\t" + code;
        }
        var addedLine = false;
        if (node.children.length > 0) {
            code += "\n";
            code += node.children.map(function (child) { return _this.generateNode(child); }).join("");
            addedLine = true;
        }
        if (!addedLine) {
            code += "\n";
        }
        return code;
    };
    return CodeGenerator;
}());
export { CodeGenerator };
//# sourceMappingURL=CodeGenerator.js.map