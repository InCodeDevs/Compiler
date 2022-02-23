/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../types/AbstractSyntaxTree";
export declare class CodeGenerator {
    static generate(ast: AbstractSyntaxTree[]): string;
    private static generateNode;
}
