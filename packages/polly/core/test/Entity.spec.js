import {setup, teardown, suite, test} from "mocha";
import {expect} from "chai";

import {SignalMap} from "signal-maps";
import {Entity, Component} from "../src";

suite("Entity", () => {
  suite("module implementation", () => {
    test("expect the module to exist", () => {
      expect(Entity).to.exist;
    });

    test("expect the module to be a Function", () => {
      expect(Entity).to.be.an.instanceOf(Function);
    });

    test("expect the name of the function to be 'Entity'", () => {
      expect(Entity.name).to.be.equal("Entity");
    });

    test("expect calling the function with new to not throw", () => {
      expect(() => new Entity).to.not.throw;
    });
  });

  suite("setup: e is equal to new Entity with parameters {type: 'demo', id: 'foobar'}", () => {
    let e;

    setup(() => e = new Entity("demo", "foobar"));

    suite("instance", () => {
      test("expect e to be an instance of Entity", () => expect(e).to.be.an.instanceOf(Entity));
      test("expect e to be an instance of SignalMap",
        () => expect(e).to.be.an.instanceOf(SignalMap));
      test("expect e.type to be equal 'demo'", () => expect(e.type).to.be.equal("demo"));
      test("expect e.id to be equal 'demo'", () => expect(e.id).to.be.equal("foobar"));
    });

    suite("feature: adding Components", () => {
      let c;
      setup(() => c = new Component("demo"));

      test("expect e.addComponent to add a Component to the entity", () => {
        expect(e.size).to.be.equal(0);
        e.addComponent(c);
        expect(e.size).to.be.equal(1);
        expect(e.has("demo")).to.be.true;
      });

      teardown(() => c = null);
    });

    suite("feature: removing Components", () => {
      let c, d;

      setup(() => {
        c = new Component("demo");
        d = new Component("foobar");
        e.addComponent(c);
        e.addComponent(d);
      });

      test("expect e.removeComponent to remove a component from the entity", () => {
        expect(e.size).to.be.equal(2);
        e.removeComponent(c);
        e.removeComponent("foobar");
        expect(e.size).to.be.equal(0);
        expect(e.has("demo")).to.be.false;
      });

      teardown(() => {
        c = null;
        d = null;
      });

    });

    teardown(() => e = null);
  });

});
