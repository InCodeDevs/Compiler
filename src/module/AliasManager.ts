/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export class AliasManager {
  public static readonly CMD_ALIASES = [
    ["@"],
    ["create", "erstelle", "definiere", "define"],
  ];

  public static readonly TYPE_ALIASES = [["button", "knopf"]];

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
