/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../../types/AbstractSyntaxTree";
import { InCodeCommand } from "./InCodeCommand";
export declare class CommandExecutor {
    static readonly COMMANDS: {
        [key: string]: InCodeCommand;
    };
    static executeCommand(abstractSyntaxTree: AbstractSyntaxTree | string): string;
}
