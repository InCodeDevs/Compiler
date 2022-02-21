/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../types/AbstractSyntaxTree";
export declare class AbstractSyntaxTreeGenerator {
    static generate(source: string): AbstractSyntaxTree[];
    private static splitWords;
}
