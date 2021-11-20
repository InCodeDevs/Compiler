/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { Language } from "../types/Language";

import german_definition from "../resources/translations/german/definition.json";
import german_tokens from "../resources/translations/german/tokens.json";

export class Languages {
  static readonly GERMAN: Language = {
    definition: german_definition,
    tokens: german_tokens,
  };
}
