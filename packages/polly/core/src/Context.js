// @flow
import Signal from "min-signal";
import {SignalMap} from "signal-maps";
import type {System, Entity, EntityNode} from "./";

function __addToEntityNodes(context: Context, entity: Entity): void {
  for (let node: EntityNode of context.nodes) {
    let requiredComponents: Array<string> = node.requiredComponents;
    let requirementsMet: boolean = requiredComponents.every(componentType => {
      entity.has(componentType);
    });
    if (requirementsMet && !node.has(entity.id)) {
      node.set(entity.id, entity);
    }
  }
}

function __removeFromEntityNodes(context: Context, entity: Entity): void {
  for (let node: EntityNode of context.nodes) {
    let requiredComponents: Array<string> = node.requiredComponents;
    let requirementsMet: boolean = requiredComponents.every(componentType => {
      entity.has(componentType);
    });
    if (requirementsMet && node.has(entity.id)) {
      node.delete(entity.id);
    }
  }
}

export default class Context {

  _nodes: Map<string, EntityNode>;
  _entities: SignalMap<string, any>;
  _systems: SignalMap<string, System>;

  _entityAdded: Signal;
  _entityRemoved: Signal;

  _systemAdded: Signal;
  _systemRemoved: Signal;

  _initialized: Signal;

  constructor(name: string) {
    Object.defineProperty(this, "name", {value: name});

    this._nodes = new Map;
    this._entities = new SignalMap;
    this._systems = new SignalMap;

    this._entityAdded = new Signal();
    this._entityRemoved = new Signal();

    this._systemAdded = new Signal();
    this._systemRemoved = new Signal();

    this._initialized = new Signal();
    this._preUpdate = new Signal();
    this._postUpdate = new Signal();

    this.entities.added.add(this._onEntityAdded, this);
    this.entities.deleted.add(this._onEntityDeleted, this);

    this.systems.added.add(this._onSystemAdded, this);
    this.systems.deleted.add(this._onSystemDeleted, this);
  }

  get nodes(): Map<string, EntityNode> { return this._nodes; }

  get entities(): SignalMap<string, Entity> { return this._entities; }

  get systems(): SignalMap<string, System> { return this._systems; }

  get entityAdded(): Signal { return this._entityAdded; }

  get entityRemoved(): Signal { return this._entityRemoved; }

  get systemAdded(): Signal { return this._systemAdded; }

  get systemRemoved(): Signal { return this._systemRemoved; }

  get initialized(): Signal { return this._initialized; }

  get preUpdate(): Signal {return this._preUpdate; }

  get postUpdate(): Signal {return this._postUpdate; }

  addEntityNode(entityNode: EntityNode): this {
    this.nodes.set(entityNode.name, entityNode);
  }

  addEntity(entity: Entity): this {
    this.entities.set(entity.id, entity);
  }

  removeEntity(entity: Entity | string): this {
    this.entities.delete(typeof entity == "string" ? entity : entity.id);
  }

  addSystem(system: System): this {
    this.systems.set(system.name, system);
  }

  removeSystem(system: System | string): this {
    this.systems.delete(typeof system == "string" ? system : system.name);
  }

  update(time: number = 0): void {
    this.preUpdate.dispatch(this, time);
    for (let system: System of this.systems.values()) {
      system.run(time);
    }
    this.postUpdate.dispatch(this, time);
  }

  _onEntityAdded(entity: Entity, key: string, map: SignalMap): void {
    this.entityAdded.dispatch(entity, key, map, this);
    __addToEntityNodes(this, entity);
  }

  _onEntityDeleted(entity: Entity, key: string, map: SignalMap): void {
    this.entityRemoved.dispatch(entity, key, map, this);
    __removeFromEntityNodes(this, entity);
  }

  _onSystemAdded(system: System, key: string, map: SignalMap): void {
    system.context = this;
    this.systemAdded.dispatch(system, key, map, this);
  }

  _onSystemDeleted(system: System, key: string, map: SignalMap): void {
    system.context = null;
    this.systemRemoved.dispatch(system, key, map, this);
  }

}
