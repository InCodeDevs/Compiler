"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasManager = void 0;
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
    AliasManager.getSpecialAliases = function (special) {
        return (AliasManager.SPECIAL_ALIASES.find(function (alias) {
            return alias.includes(special.toLowerCase());
        }) || []);
    };
    AliasManager.CMD_ALIASES = [
        ["@", "π"],
        ["//", "#", "π"],
        ["create", "erstelle", "definiere", "define", "β"],
        ["call", "execute", "rufe"],
        ["add", "fΓΌge"],
        ["remove", "entferne"],
        ["repeat", "wiederhole", "π"],
        ["print", "gib"],
        ["ask", "frage", "β"],
        ["if", "wenn", "falls"],
        ["else", "sonst"],
        ["wait", "warte", "β"],
        ["set", "setze"],
    ];
    AliasManager.SPECIAL_ALIASES = [["value", "wert"]];
    AliasManager.TYPE_ALIASES = [
        ["button", "knopf"],
        ["p", "paragraph", "absatz"],
        ["span", "text"],
        ["img", "image", "bild"],
        ["h1", "heading1", "ΓΌberschrift1"],
        ["h2", "heading2", "ΓΌberschrift2"],
        ["h3", "heading3", "ΓΌberschrift3"],
        ["h4", "heading4", "ΓΌberschrift4"],
        ["h5", "heading5", "ΓΌberschrift5"],
        ["h6", "heading6", "ΓΌberschrift6"],
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
        [">", "grΓΆΓer"],
        ["===", "gleich", "equals"],
        ["!==", "ungleich", "unequal"],
        [">=", "grΓΆΓergleich", "greaterequal"],
        ["<=", "kelinergleich", "smallerequal"],
    ];
    AliasManager.EVENT_ALIASES = [
        ["click", "pressed", "gedrΓΌckt"],
        ["mouseover", "hovered", "berΓΌhrt"],
        ["mouseleave", "not-hovered", "nicht-berΓΌhrt"],
    ];
    AliasManager.COLOR_PROPERTY_ALIASES = [
        ["style.color", "color", "farbe"],
        ["style.backgroundColor", "backgroundcolor", "hintergrundfarbe"],
        ["blue", "blau"],
        ["lime", "green", "grΓΌn"],
        ["red", "rot"],
        ["orange"],
        ["yellow", "gelb"],
        ["white", "weiΓ"],
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
exports.AliasManager = AliasManager;
//# sourceMappingURL=AliasManager.js.map