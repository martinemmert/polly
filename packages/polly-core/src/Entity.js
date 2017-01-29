// @flow
import {SignalMap} from "signal-maps";
import type {Component} from "./";

export default class Entity extends SignalMap {

  /**
   * creates a new entity
   * @param {string} type - the type of the entity
   * @param {string} id - the id of the entity
   */
  constructor(type: string, id: string): void {
    super();
    Object.defineProperty(this, "type", {value: type});
    Object.defineProperty(this, "id", {value: id, writable: true});
  }

  /**
   * adds a new component
   * @param {Component} component instance
   */
  addComponent(component: Component): this {
    this.set(component.type, component);
  }

  /**
   * removes a component
   * @param {Component|string} component instance or string
   */
  removeComponent(component: Component | string): this {
    this.delete(typeof component == "string" ? component : component.type);
  }

}


