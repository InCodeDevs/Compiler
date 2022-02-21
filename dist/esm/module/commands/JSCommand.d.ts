/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { InCodeCommand } from "./InCodeCommand";
export declare class JSCommand extends InCodeCommand {
    static readonly COMMAND_NAME = "@";
    execute(args: string[]): string;
}
