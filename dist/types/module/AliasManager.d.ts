/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
export declare class AliasManager {
    static readonly CMD_ALIASES: string[][];
    static readonly TYPE_ALIASES: string[][];
    static readonly OPERATOR_ALIASES: string[][];
    static readonly EVENT_ALIASES: string[][];
    static readonly COLOR_PROPERTY_ALIASES: string[][];
    static getCommandAliases(command: string): string[];
    static getTypeAliases(type: string): string[];
    static getOperatorAliases(operator: string): string[];
    static getEventAliases(event: string): string[];
    static getColorPropertyAliases(colorProperty: string): string[];
}
