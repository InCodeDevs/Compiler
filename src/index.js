/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import AbstractSyntaxTreeGenerator from "./modules/AbstractSyntaxTreeGenerator";
import PreCompiler from "./modules/PreCompiler";
import Compiler from "./modules/Compiler";
import AbstractSyntaxTreeGenerationError from "./modules/errors/AbstractSyntaxTreeGenerationError";
import Dictionary from "./modules/Dictionary";
import LanguageSelector from "./modules/LanguageSelector";

module.exports = {
  AbstractSyntaxTreeGenerator,
  AbstractSyntaxTreeGenerationError,
  PreCompiler,
  Compiler,
  Dictionary,
  LanguageSelector,
};
