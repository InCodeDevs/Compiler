/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { InCodeCommand } from "./InCodeCommand";
export declare class SetCommand extends InCodeCommand {
    static readonly colors: {
        name: string;
        aliases: string[];
    }[];
    static readonly data: {
        name: string;
        aliases: string[];
        type: string;
        append: string;
        values: {
            name: string;
            aliases: string[];
        }[];
    }[];
    execute(args: string[]): string;
}
