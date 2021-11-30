/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import InCodeError from "./InCodeError";

export default class NotImplementedError extends InCodeError {
  constructor(msg: string) {
    super("NotImplementedError", msg);
  }
}
