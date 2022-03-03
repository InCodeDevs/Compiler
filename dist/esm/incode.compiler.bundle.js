import { js_beautify } from 'js-beautify';

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

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var PreCompiler = /** @class */ (function () {
    function PreCompiler() {
    }
    PreCompiler.preCompile = function (source) {
        source = source.replace(/ {2}/g, "");
        source = source.replace(/\r/g, "");
        return source;
    };
    return PreCompiler;
}());

var AbstractSyntaxTreeGenerator = /** @class */ (function () {
    function AbstractSyntaxTreeGenerator() {
    }
    AbstractSyntaxTreeGenerator.generate = function (source) {
        source = PreCompiler.preCompile(source);
        var lines = source.split("\n");
        if (lines.length === 0) {
            return [];
        }
        var words = this.splitWords(source);
        var result;
        var temp = [];
        words.forEach(function (wordList) {
            if (wordList.length === 0) {
                return;
            }
            var ast = {
                intents: 0,
                command: "",
                args: [],
                children: [],
            };
            var firstWord = wordList[0];
            ast.intents = firstWord.split("\t").length - 1;
            ast.command = firstWord.replace(/\t/g, "");
            ast.args = wordList.slice(1);
            temp.push(ast);
        });
        temp.forEach(function (ast) {
            if (ast.intents === 0) {
                temp.push(ast);
                return;
            }
            if (temp[temp.length - 1].intents === ast.intents - 1) {
                temp[temp.length - 1].children.push(ast);
                return;
            }
            else {
                var x = temp[temp.length - 1].children[temp[temp.length - 1].children.length - 1];
                var y = x;
                while (x !== null &&
                    x.intents !== ast.intents - 1 &&
                    x.intents !== ast.intents) {
                    x = y.children[y.children.length - 1];
                    y = x;
                }
                if (x.intents === ast.intents - 1) {
                    x.children.push(ast);
                }
                else {
                    y.children.push(ast);
                }
            }
        });
        temp = temp.filter(function (t) { return t.intents === 0; });
        temp = Array.from(new Set(temp.map(function (a) { return a; }))).map(function (a0) {
            return temp.find(function (a) { return a === a0; });
        });
        result = temp;
        return result;
    };
    AbstractSyntaxTreeGenerator.splitWords = function (source) {
        var matrix = [];
        var lines = source.split("\n");
        lines.forEach(function (line) {
            if (line.match(/(["'])(?:(?=(\\?))\2.)*?\1/g)) {
                var quotes = line.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
                quotes.forEach(function (quote) {
                    line = line.replace(quote, quote.split(" ").join("\0"));
                });
            }
            matrix.push(line.split(" "));
        });
        return matrix;
    };
    return AbstractSyntaxTreeGenerator;
}());

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var AliasManager = /** @class */ (function () {
    function AliasManager() {
    }
    AliasManager.getCommandAliases = function (command) {
        return (AliasManager.CMD_ALIASES.find(function (alias) {
            return alias.includes(command.toLowerCase());
        }) || []);
    };
    AliasManager.getTypeAliases = function (type) {
        return (AliasManager.TYPE_ALIASES.find(function (alias) {
            return alias.includes(type.toLowerCase());
        }) || []);
    };
    AliasManager.getOperatorAliases = function (operator) {
        return (AliasManager.OPERATOR_ALIASES.find(function (alias) {
            return alias.includes(operator.toLowerCase());
        }) || []);
    };
    AliasManager.getEventAliases = function (event) {
        return (AliasManager.EVENT_ALIASES.find(function (alias) {
            return alias.includes(event.toLowerCase());
        }) || []);
    };
    AliasManager.getColorPropertyAliases = function (colorProperty) {
        return (AliasManager.COLOR_PROPERTY_ALIASES.find(function (alias) {
            return alias.includes(colorProperty.toLowerCase());
        }) || []);
    };
    AliasManager.CMD_ALIASES = [
        ["@", "📜"],
        ["//", "#", "📖"],
        ["create", "erstelle", "definiere", "define", "➕"],
        ["call", "execute", "rufe"],
        ["add", "füge"],
        ["remove", "entferne"],
        ["repeat", "wiederhole", "🔁"],
        ["print", "gib"],
        ["ask", "frage", "❓"],
        ["if", "wenn", "falls"],
        ["else", "sonst"],
        ["wait", "warte", "⌛"],
        ["set", "setze"],
    ];
    AliasManager.TYPE_ALIASES = [
        ["button", "knopf"],
        ["p", "paragraph", "absatz"],
        ["span", "text"],
        ["img", "image", "bild"],
        ["h1", "heading1", "überschrift1"],
        ["h2", "heading2", "überschrift2"],
        ["h3", "heading3", "überschrift3"],
        ["h4", "heading4", "überschrift4"],
        ["h5", "heading5", "überschrift5"],
        ["h6", "heading6", "überschrift6"],
        ["table", "tabelle"],
        ["tr", "row", "zeile"],
        ["tb", "column", "spalte"],
        ["br", "linebreak", "zeilenumbruch"],
        ["video"],
        ["audio", "ton"],
        ["iframe", "frame", "fenster"],
        ["div", "container"],
        ["li", "listitem", "listenpunkt"],
        ["ol", "ordered-list", "geordnete-liste"],
        ["ul", "unordered-list", "ungeordnete-liste"],
        ["a", "link"],
        ["function", "method", "methode", "funktion"],
        ["document.body", "screen", "bildschirm"],
        ["console.log", "console", "konsole"],
        ["alert", "dialogbox"],
        ["key", "taste"],
    ];
    AliasManager.OPERATOR_ALIASES = [
        ["<", "kleiner", "smaller"],
        [">", "größer"],
        ["===", "gleich", "equals"],
        ["!==", "ungleich", "unequal"],
        [">=", "größergleich", "greaterequal"],
        ["<=", "kelinergleich", "smallerequal"],
    ];
    AliasManager.EVENT_ALIASES = [
        ["onclick", "pressed", "gedrückt"],
        ["onmouseover", "hovered", "berührt"],
        ["onmouseleave", "not-hovered", "nicht-berührt"],
    ];
    AliasManager.COLOR_PROPERTY_ALIASES = [
        ["style.color", "color", "farbe"],
        ["style.backgroundColor", "backgroundcolor", "hintergrundfarbe"],
        ["blue", "blau"],
        ["lime", "green", "grün"],
        ["red", "rot"],
        ["orange"],
        ["yellow", "gelb"],
        ["white", "weiß"],
        ["black", "schwarz"],
        ["grey", "grau"],
        ["purple", "lila"],
        ["pink", "pink"],
        ["brown", "braun"],
        ["cyan", "cyan"],
        ["magenta", "magenta"],
        ["maroon", "maroon"],
        ["navy", "navy"],
        ["olive", "olive"],
        ["silver", "silber"],
        ["teal", "teal"],
        ["transparent", "transparent"],
    ];
    return AliasManager;
}());

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var InCodeCommand = /** @class */ (function () {
    function InCodeCommand() {
    }
    return InCodeCommand;
}());

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JSCommand = /** @class */ (function (_super) {
    __extends$c(JSCommand, _super);
    function JSCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSCommand.prototype.execute = function (args) {
        var c = args.join(" ");
        c = c.replace(/\u0000/g, " ");
        return c;
    };
    JSCommand.COMMAND_NAME = "@";
    return JSCommand;
}(InCodeCommand));

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var Error = /** @class */ (function () {
    function Error() {
    }
    Error.ERROR_MISSING_PARAMETER = "// FEHLER: Diese Zeile enthielt zu wenige Parameter.";
    Error.ERROR_UNKNOWN_TYPE = "// FEHLER: Diese Zeile enthielt einen unbekannten Typ.";
    Error.ERROR_UNKNOWN_OPERATOR = "// FEHLER: Diese Zeile enthielt einen unbekannten Operator.";
    Error.ERROR_NOT_A_NUMBER = "// FEHLER: Diese Zeile enthielt keine Zahl.";
    return Error;
}());

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CreateCommand = /** @class */ (function (_super) {
    __extends$b(CreateCommand, _super);
    function CreateCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        if (args.length === 1) {
            return "// Diese Zeile erstellt die Variable ".concat(args[0], "\nlet ").concat(args[0], ";");
        }
        else {
            if (AliasManager.getTypeAliases(args[2]).length > 0) {
                if (AliasManager.getTypeAliases(args[2])[0] === "function") {
                    return "// Diese Zeile erstellt die Funktion ".concat(args[0], "\nwindow.incode.").concat(args[0], " = () =>");
                }
                return "// Diese Zeile erstellt die Variable ".concat(args[0], " mit dem Typen ").concat(args[2], "\nlet ").concat(args[0], " = document.createElement('").concat(AliasManager.getTypeAliases(args[2])[0], "');");
            }
            else {
                return "// Diese Zeile erstellt die Variable ".concat(args[0], " mit dem Typen div, da der eigentliche Typ nicht gefunden wurde\nlet ").concat(args[0], " = document.createElement(\"div\"); // \"").concat(args[2], "\" -> Not Found");
            }
        }
    };
    return CreateCommand;
}(InCodeCommand));

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CallCommand = /** @class */ (function (_super) {
    __extends$a(CallCommand, _super);
    function CallCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            return "// Diese Zeile ruft die Funktion ".concat(args[0], " auf\nwindow.incode.").concat(args[0], "();");
        }
    };
    return CallCommand;
}(InCodeCommand));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AddCommand = /** @class */ (function (_super) {
    __extends$9(AddCommand, _super);
    function AddCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddCommand.prototype.execute = function (args) {
        if (args.length < 4) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            var element = args[0];
            var parent = args[args.length - 2];
            if (AliasManager.getTypeAliases(parent).length > 0) {
                parent = AliasManager.getTypeAliases(parent)[0];
            }
            return "// Diese Zeile f\u00FCgt das Element ".concat(element, " zu dem Element ").concat(parent, " hinzu.\n").concat(parent, ".appendChild(").concat(element, ");");
        }
    };
    return AddCommand;
}(InCodeCommand));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RepeatCommand = /** @class */ (function (_super) {
    __extends$8(RepeatCommand, _super);
    function RepeatCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatCommand.prototype.execute = function (args) {
        if (args.length < 2) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (args.length === 2) {
                return "// Diese Zeile wiederholt die darunter stehenden Instruktionen ".concat(args[0], " mal\nfor (let i = 0; i < ").concat(args[0], "; i++)");
            }
            else if (args.length === 6) {
                if (AliasManager.getOperatorAliases(args[2]).length > 0) {
                    return "// Diese Zeile wiederholt die darunter stehenden Instruktionen solange die Variable ".concat(args[1], " ").concat(args[2], " der Variable ").concat(args[4], " ist\nwhile(").concat(args[1], " ").concat(AliasManager.getOperatorAliases(args[2])[0], " ").concat(args[4], ")");
                }
                else {
                    return Error.ERROR_UNKNOWN_OPERATOR;
                }
            }
            else {
                return Error.ERROR_MISSING_PARAMETER;
            }
        }
    };
    return RepeatCommand;
}(InCodeCommand));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PrintCommand = /** @class */ (function (_super) {
    __extends$7(PrintCommand, _super);
    function PrintCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintCommand.prototype.execute = function (args) {
        if (args.length < 4) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (AliasManager.getTypeAliases(args[3]).length > 0) {
                return "// Diese Zeile gibt den angegebenen Text in der ".concat(args[3], " aus\n").concat(AliasManager.getTypeAliases(args[3])[0], "(").concat(args[0].replace(/\u0000/g, " "), ");");
            }
            else {
                return Error.ERROR_UNKNOWN_TYPE;
            }
        }
    };
    return PrintCommand;
}(InCodeCommand));

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AskCommand = /** @class */ (function (_super) {
    __extends$6(AskCommand, _super);
    function AskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AskCommand.prototype.execute = function (args) {
        if (args.length === 0) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            args[0] = args[0].replace(/\u0000/g, " ");
            if (args.length === 1) {
                return "// Diese Zeile fragt den Benutzer \"".concat(args[0], "\"\nprompt(").concat(args[0], ");");
            }
            else {
                return "// Diese Zeile fragt den Benutzer \"".concat(args[0], "\" und speichert die Antwort in ").concat(args[args.length - 1], "\nlet ").concat(args[args.length - 1], " = prompt(").concat(args[0], ");");
            }
        }
    };
    return AskCommand;
}(InCodeCommand));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IfCommand = /** @class */ (function (_super) {
    __extends$5(IfCommand, _super);
    function IfCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IfCommand.prototype.execute = function (args) {
        // [4] x gleich 2 ist
        // [5] x is equal to 2
        // [4] x gedrückt wird <command>
        // [4] x is pressed <command>
        // [6] die Taste x gedrückt wird <command>
        // [6] the key x is pressed <command>
        if (args.length < 4) {
            return "// This line contained an if command, but it was missing arguments.";
        }
        else {
            if (AliasManager.getOperatorAliases(args[1]).length > 0 ||
                AliasManager.getOperatorAliases(args[2]).length > 0) {
                // normal if --- then
                var operator = void 0;
                var operatorPosition = void 0;
                var first = void 0;
                var second = void 0;
                if (AliasManager.getOperatorAliases(args[1]).length > 0) {
                    operator = AliasManager.getOperatorAliases(args[1])[0];
                    operatorPosition = 1;
                }
                else {
                    operator = AliasManager.getOperatorAliases(args[2])[0];
                    operatorPosition = 2;
                }
                if (operatorPosition === 1) {
                    first = args[0];
                    second = args[2].replace(/\u0000/g, " ");
                }
                else {
                    first = args[0];
                    second = args[1].replace(/\u0000/g, " ");
                }
                return "if (".concat(first, " ").concat(operator, " ").concat(second, ")");
            }
            else if (AliasManager.getEventAliases(args[1]).length > 0 ||
                AliasManager.getEventAliases(args[2]).length > 0) {
                // event listener
                var first = args[0];
                var event = void 0;
                var command = void 0;
                command = args.slice(3).join(" ");
                if (AliasManager.getEventAliases(args[1]).length > 0) {
                    event = AliasManager.getEventAliases(args[1])[0];
                }
                else {
                    event = AliasManager.getEventAliases(args[2])[0];
                }
                return "".concat(first, ".addEventListener(\"").concat(event, "\", () => {\n  ").concat(CommandExecutor.executeCommand(command), "\n});");
            }
            else if (AliasManager.getTypeAliases(args[1]).length > 0 &&
                AliasManager.getTypeAliases(args[1])[0] === "key") {
                var command = args.slice(5).join(" ");
                return "document.addEventListener(\"keydown\", (e) => {\n  if (e.key === \"".concat(args[2], "\") {\n    ").concat(CommandExecutor.executeCommand(command), "\n  }\n});");
            }
        }
        return "";
    };
    return IfCommand;
}(InCodeCommand));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElseCommand = /** @class */ (function (_super) {
    __extends$4(ElseCommand, _super);
    function ElseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElseCommand.prototype.execute = function (args) {
        if (args.length > 0) {
            return "else ".concat(CommandExecutor.executeCommand(args.join(" ")));
        }
        else {
            return "else";
        }
    };
    return ElseCommand;
}(InCodeCommand));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WaitCommand = /** @class */ (function (_super) {
    __extends$3(WaitCommand, _super);
    function WaitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (!parseFloat(args[0])) {
                return Error.ERROR_NOT_A_NUMBER;
            }
            else {
                return "// Diese Zeile wartet ".concat(args[0], "000 Millisekunden\nawait new Promise(done => setTimeout(() => done(), ").concat(args[0], "000))");
            }
        }
    };
    return WaitCommand;
}(InCodeCommand));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SetCommand = /** @class */ (function (_super) {
    __extends$2(SetCommand, _super);
    function SetCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetCommand.prototype.execute = function (args) {
        if (args.length < 3) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            var property = args[1];
            var value = args[5].replace(/\u0000/g, " ");
            var variable = args[3];
            var obj = {
                name: "_incode.default",
                aliases: [],
                type: "",
                append: "",
                values: [],
            };
            for (var i = 0; i < SetCommand.data.length; i++) {
                var entry = SetCommand.data[i];
                if (entry.aliases.includes(property.toLowerCase())) {
                    obj = entry;
                    break;
                }
            }
            if (obj.name !== "_incode.default") {
                var v = value;
                for (var i = 0; i < obj.values.length; i++) {
                    if (obj.values[i].aliases.includes(v.toLowerCase())) {
                        v = obj.values[i].name;
                        break;
                    }
                }
                if (obj.type === "style") {
                    return "// Diese Zeile setzt eine Eigenschaft der Variable ".concat(variable, "\n").concat(variable, ".style.").concat(obj.name, " = \"").concat(v).concat(obj.append, "\";");
                }
                else if (obj.type === "attribute") {
                    return "// Diese Zeile setzt den Wert der Variable ".concat(variable, "\n").concat(variable, ".").concat(obj.name, " = ").concat(v).concat(obj.append, ";");
                }
            }
            else {
                return Error.ERROR_UNKNOWN_TYPE;
            }
            return "// Diese Zeile setzt eine Eigenschaft der Variable ".concat(variable, "\n").concat(variable, ".").concat(property, " = ").concat(value, ";");
        }
    };
    SetCommand.colors = [
        {
            name: "blue",
            aliases: ["blue", "blau"],
        },
        {
            name: "lime",
            aliases: ["green", "grün"],
        },
        {
            name: "yellow",
            aliases: ["yellow", "gelb"],
        },
        {
            name: "red",
            aliases: ["red", "rot"],
        },
        {
            name: "white",
            aliases: ["white", "weiss"],
        },
        {
            name: "black",
            aliases: ["black", "schwarz"],
        },
    ];
    SetCommand.data = [
        {
            name: "color",
            aliases: ["farbe", "color"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "backgroundColor",
            aliases: ["hintergrundfarbe", "backgroundcolor"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "innerText",
            aliases: ["text"],
            type: "attribute",
            append: "",
            values: [],
        },
        {
            name: "textDecoration",
            aliases: ["textdekoration", "textdecoration"],
            type: "style",
            append: "",
            values: [
                {
                    name: "underline",
                    aliases: ["underline", "unterstrichen"],
                },
                {
                    name: "overline",
                    aliases: ["overline", "überstrichen"],
                },
                {
                    name: "line-through",
                    aliases: ["line-through", "durchgestrichen"],
                },
                {
                    name: "underline overline",
                    aliases: ["underline-overline", "unterstrichen-überstrichen"],
                },
            ],
        },
        {
            name: "textAlign",
            aliases: ["textausrichtung", "textalign"],
            type: "style",
            append: "",
            values: [
                {
                    name: "left",
                    aliases: ["left", "links"],
                },
                {
                    name: "center",
                    aliases: ["center", "zentriert"],
                },
                {
                    name: "right",
                    aliases: ["right", "rechts"],
                },
            ],
        },
        {
            name: "fontWeight",
            aliases: ["fontweight", "schriftbreite"],
            type: "style",
            append: "",
            values: [
                {
                    name: "normal",
                    aliases: ["normal", "normal"],
                },
                {
                    name: "bold",
                    aliases: ["bold", "fett"],
                },
                {
                    name: "bolder",
                    aliases: ["bolder", "schwächer"],
                },
                {
                    name: "lighter",
                    aliases: ["lighter", "leichter"],
                },
            ],
        },
        {
            name: "fontFamily",
            aliases: ["fontfamily", "schriftart", "font"],
            type: "style",
            append: "",
            values: [],
        },
        {
            name: "margingTop",
            aliases: ["margintop", "abstand-oben"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "marginRight",
            aliases: ["marginright", "abstand-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "marginBottom",
            aliases: ["marginbottom", "abstand-unten"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "marginLeft",
            aliases: ["marginleft", "abstand-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "margin",
            aliases: ["margin", "abstand"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "paddingTop",
            aliases: ["paddingtop", "innerer-abstand-oben"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "paddingRight",
            aliases: ["paddingright", "innerer-abstand-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "paddingBottom",
            aliases: ["paddingbottom", "innerer-abstand-unten"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "paddingLeft",
            aliases: ["paddingleft", "innerer-abstand-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "padding",
            aliases: ["padding", "innerer-abstand"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "fontSize",
            aliases: ["fontsize", "schriftgröße"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "width",
            aliases: ["width", "breite"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "height",
            aliases: ["height", "höhe"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "src",
            aliases: ["src", "quelle"],
            type: "attribute",
            append: "",
            values: [],
        },
        {
            name: "position",
            aliases: ["position"],
            type: "style",
            append: "",
            values: [
                {
                    name: "absolute",
                    aliases: ["absolute", "absolut"],
                },
                {
                    name: "relative",
                    aliases: ["relative", "relativ"],
                },
                {
                    name: "fixed",
                    aliases: ["fixed", "fest"],
                },
            ],
        },
        {
            name: "borderTopWidth",
            aliases: ["bordertopwidth", "umrandungsbreite-oben"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderRightWidth",
            aliases: ["borderrightwidth", "umrandungsbreite-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderBottomWidth",
            aliases: ["borderbottomwidth", "umrandungsbreite-unten"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderLeftWidth",
            aliases: ["borderleftwidth", "umrandungsbreite-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderWidth",
            aliases: ["borderwidth", "umrandungsbreite"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopStyle",
            aliases: ["bordertopstyle", "umrandungsstil-oben"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["none", "keine"],
                },
                {
                    name: "solid",
                    aliases: ["solid", "durchgezogen", "solide"],
                },
                {
                    name: "dashed",
                    aliases: ["dashed", "gestrichen"],
                },
                {
                    name: "dotted",
                    aliases: ["dotted", "gepunktet"],
                },
                {
                    name: "double",
                    aliases: ["double", "doppelt"],
                },
            ],
        },
        {
            name: "borderRightStyle",
            aliases: ["borderrightstyle", "umrandungsstil-rechts"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["none", "keine"],
                },
                {
                    name: "solid",
                    aliases: ["solid", "durchgezogen", "solide"],
                },
                {
                    name: "dashed",
                    aliases: ["dashed", "gestrichen"],
                },
                {
                    name: "dotted",
                    aliases: ["dotted", "gepunktet"],
                },
                {
                    name: "double",
                    aliases: ["double", "doppelt"],
                },
            ],
        },
        {
            name: "borderBottomStyle",
            aliases: ["borderbottomstyle", "umrandungsstil-unten"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["none", "keine"],
                },
                {
                    name: "solid",
                    aliases: ["solid", "durchgezogen", "solide"],
                },
                {
                    name: "dashed",
                    aliases: ["dashed", "gestrichen"],
                },
                {
                    name: "dotted",
                    aliases: ["dotted", "gepunktet"],
                },
                {
                    name: "double",
                    aliases: ["double", "doppelt"],
                },
            ],
        },
        {
            name: "borderLeftStyle",
            aliases: ["borderleftstyle", "umrandungsstil-links"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["none", "keine"],
                },
                {
                    name: "solid",
                    aliases: ["solid", "durchgezogen", "solide"],
                },
                {
                    name: "dashed",
                    aliases: ["dashed", "gestrichen"],
                },
                {
                    name: "dotted",
                    aliases: ["dotted", "gepunktet"],
                },
                {
                    name: "double",
                    aliases: ["double", "doppelt"],
                },
            ],
        },
        {
            name: "borderStyle",
            aliases: ["borderstyle", "umrandungsstil"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["none", "keine"],
                },
                {
                    name: "solid",
                    aliases: ["solid", "durchgezogen", "solide"],
                },
                {
                    name: "dashed",
                    aliases: ["dashed", "gestrichen"],
                },
                {
                    name: "dotted",
                    aliases: ["dotted", "gepunktet"],
                },
                {
                    name: "double",
                    aliases: ["double", "doppelt"],
                },
            ],
        },
        {
            name: "borderRadius",
            aliases: ["borderradius", "umrandungsradius"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopLeftRadius",
            aliases: ["bordertopleftradius", "umrandungsradius-oben-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopRightRadius",
            aliases: ["bordertoprightradius", "umrandungsradius-oben-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderBottomLeftRadius",
            aliases: ["borderbottomleftradius", "umrandungsradius-unten-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderBottomRightRadius",
            aliases: ["borderbottomrightradius", "umrandungsradius-unten-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopLeftRadius",
            aliases: ["bordertopleftradius", "umrandungsradius-oben-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopRightRadius",
            aliases: ["bordertoprightradius", "umrandungsradius-oben-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderBottomLeftRadius",
            aliases: ["borderbottomleftradius", "umrandungsradius-unten-links"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderBottomRightRadius",
            aliases: ["borderbottomrightradius", "umrandungsradius-unten-rechts"],
            type: "style",
            append: "px",
            values: [],
        },
        {
            name: "borderTopColor",
            aliases: ["bordertopcolor", "umrandungsfarbe-oben"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "borderRightColor",
            aliases: ["borderrightcolor", "umrandungsfarbe-rechts"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "borderBottomColor",
            aliases: ["borderbottomcolor", "umrandungsfarbe-unten"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "borderLeftColor",
            aliases: ["borderleftcolor", "umrandungsfarbe-links"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "borderColor",
            aliases: ["bordercolor", "umrandungsfarbe"],
            type: "style",
            append: "",
            values: SetCommand.colors,
        },
        {
            name: "display",
            aliases: ["display", "sichtbarkeit"],
            type: "style",
            append: "",
            values: [
                {
                    name: "none",
                    aliases: ["invisible", "unsichtbar"],
                },
            ],
        },
    ];
    return SetCommand;
}(InCodeCommand));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CommentCommand = /** @class */ (function (_super) {
    __extends$1(CommentCommand, _super);
    function CommentCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentCommand.prototype.execute = function (args) {
        return "// " + args.join(" ");
    };
    return CommentCommand;
}(InCodeCommand));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RemoveCommand = /** @class */ (function (_super) {
    __extends(RemoveCommand, _super);
    function RemoveCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveCommand.prototype.execute = function (args) {
        if (args.length < 3) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            var element = args[0];
            var parent = args[args.length - 1];
            if (AliasManager.getTypeAliases(parent).length > 0) {
                parent = AliasManager.getTypeAliases(parent)[0];
            }
            return "// Diese Zeile entfernt das Element ".concat(element, " von dem Element ").concat(parent, "\n").concat(parent, ".removeChild(").concat(element, ");");
        }
    };
    return RemoveCommand;
}(InCodeCommand));

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor() {
    }
    CommandExecutor.executeCommand = function (abstractSyntaxTree) {
        var ast;
        if (typeof abstractSyntaxTree === "string") {
            ast = AbstractSyntaxTreeGenerator.generate(abstractSyntaxTree)[0];
        }
        else {
            ast = abstractSyntaxTree;
        }
        var code = "";
        if (AliasManager.getCommandAliases(ast.command.toLowerCase()).length > 0) {
            if (this.COMMANDS[AliasManager.getCommandAliases(ast.command.toLowerCase())[0]]) {
                code = this.COMMANDS[AliasManager.getCommandAliases(ast.command.toLowerCase())[0]].execute(ast.args);
            }
        }
        else {
            code += "// \"".concat(ast.command, " ").concat(ast.args.join(" "), "\" -> Command ").concat(ast.command, " not found.");
        }
        if (ast.children.length > 0) {
            code += " {\n";
            ast.children.forEach(function (child) {
                for (var i = 0; i < child.intents; i++) {
                    code += "  ";
                }
                code += CommandExecutor.executeCommand(child);
            });
            code += "}";
        }
        code += "\n";
        return code;
    };
    CommandExecutor.COMMANDS = {
        "@": new JSCommand(),
        "//": new CommentCommand(),
        create: new CreateCommand(),
        call: new CallCommand(),
        add: new AddCommand(),
        remove: new RemoveCommand(),
        repeat: new RepeatCommand(),
        print: new PrintCommand(),
        ask: new AskCommand(),
        if: new IfCommand(),
        else: new ElseCommand(),
        wait: new WaitCommand(),
        set: new SetCommand(),
    };
    return CommandExecutor;
}());

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
        var code = "/**\n * @generator InCode\n * @version 2.x\n */\n\nwindow.incode = {}\n\n";
        ast.forEach(function (node) {
            // code += "Code Comment" // TODO: implement
            code += CommandExecutor.executeCommand(node) + "\n";
        });
        return js_beautify(code, {
            indent_char: " ",
            indent_size: 2,
        });
    };
    return Compiler;
}());

export { AbstractSyntaxTreeGenerator, AliasManager, CodeGenerator, CommandExecutor, Compiler };
