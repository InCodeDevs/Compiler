/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import Compiler from "./modules/Compiler";
import AbstractSyntaxTreeGenerator from "./modules/AbstractSyntaxTreeGenerator";

export = { Compiler, AbstractSyntaxTreeGenerator };

// !! TESTING !!
// !! REMOVE BEFORE PRODUCTION DEPLOYMENT !!

new AbstractSyntaxTreeGenerator(
    `
Wenn x gleich 1 ist
	Setze den Wert von x auf "HELLO WORLD"
Gib "Hallo Welt" in der Konsole aus.
  `
  ).finalize()
