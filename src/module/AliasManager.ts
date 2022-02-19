/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export class AliasManager {
  public static readonly CMD_ALIASES = [
    ["@"],
    ["create", "erstelle", "definiere", "define"],
  ];

  public static readonly TYPE_ALIASES = [
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
    // ["input", "inputfield", "eingabefeld"],
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
  ];

  public static getCommandAliases(command: string): string[] {
    return (
      AliasManager.CMD_ALIASES.find((alias) =>
        alias.includes(command.toLowerCase())
      ) || []
    );
  }

  public static getTypeAliases(type: string): string[] {
    return (
      AliasManager.TYPE_ALIASES.find((alias) =>
        alias.includes(type.toLowerCase())
      ) || []
    );
  }
}
