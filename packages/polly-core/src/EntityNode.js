// @flow
import {SignalMap} from "signal-maps";

export default class EntityNode extends SignalMap {
  constructor(type: string, requiredComponents: Array<string>, iterable: any): void {
    super(iterable);
    Object.defineProperty(this, "name", {value: type});
    Object.defineProperty(this, "requiredComponents", {value: requiredComponents});
  }
}
