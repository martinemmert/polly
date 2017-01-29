// @flow
import type {EntityNode} from "./";
import {Context} from "./";

function __addContextSignalCallbacks(system: System, context: Context): void {
  context.initialized.addOnce(system._onContextInitialized);
}

function __removeContextSignalCallbacks(system: System, context: Context): void {
  context.initialized.remove(system._onContextInitialized);
}

function __addContextNodeSignalCallbacks(system: System, context: Context): void {
  for (let node: EntityNode of context.nodes.values()) {
    if (!system.requiredEntityNodes.includes(node.name)) continue;
    node.added.add(system._onEntityAdded, this);
    node.deleted.add(system._onEntityRemoved, this);
  }
}

function __removeContextNodeSignalCallbacks(system: System, context: Context): void {
  for (let node: EntityNode of context.nodes.values()) {
    if (!system.requiredEntityNodes.includes(node.name)) continue;
    node.added.remove(system._onEntityAdded, this);
    node.deleted.remove(system._onEntityRemoved, this);
  }
}

export default class System {

  _context: Context;
  _lastUpdate: number;

  constructor(name: string, context: ?Context): void {
    if (context) this.context = context;
    Object.defineProperty(this, "name", {value: name});
  }

  get requiredEntityNodes(): Array<string> {
    return [];
  }

  get context(): Context {
    return this._context;
  }

  set context(context: Context) {
    if (this.context) {
      if (this.context === context) return;
      __removeContextSignalCallbacks(this, this.context);
      __removeContextNodeSignalCallbacks(this, this.context);
    }

    if (context) {
      __addContextSignalCallbacks(this, context);
      __addContextNodeSignalCallbacks(this, context);
    }

    this._context = context;
  }

  run(time: ?number = 0): void {
    // do your update here
    this._lastUpdate = time;
  }

  _initialize(): void {
    if (!this.context) {
      throw new Error("System: context is missing");
    }
  }

  /* eslint-disable no-unused-vars */
  _onEntityAdded(entity: Entity, key: string, node: EntityNode): void {
    // nothing to do
  }

  _onEntityRemoved(entity: Entity, key: string, node: EntityNode): void {
    // nothing to do
  }
  /* eslint-enable no-unused-vars */

  _onContextInitialized(): void {
    this._initialize();
  }

}
