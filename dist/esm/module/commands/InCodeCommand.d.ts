/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
export declare abstract class InCodeCommand {
    abstract execute(args: string[]): string;
}
