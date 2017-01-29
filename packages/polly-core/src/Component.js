// @flow

export default class Component {

  constructor(type: string): void {
    Object.defineProperty(this, "type", {value: type});
  }

}
