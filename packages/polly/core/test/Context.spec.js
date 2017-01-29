import {setup, suiteSetup, teardown, suite, test} from "mocha";
import {default as chai, expect} from "chai";
import spies from "chai-spies";

import {Entity, System, Context} from "../src";

chai.use(spies);

suite("Context", () => {

  suite("module implementation", () => {
    test("expect the module to exist", () => {
      expect(Context).to.exist;
    });

    test("expect the module to be a Function", () => {
      expect(Context).to.be.an.instanceOf(Function);
    });

    test("expect the name of the function to be 'Context'", () => {
      expect(Context.name).to.be.equal("Context");
    });

    test("expect calling the function with new to not throw", () => {
      expect(() => new Context).to.not.throw;
    });
  });

  suite("setup: c is assigned to calling new Context with parameters {name: \"demo\"}", () => {
    suite("instance", () => {
      let c, name = "demo";

      setup(() => c = new Context(name));

      test("expect c to be an instanceOf Context", () => {
        expect(c).to.be.an.instanceOf(Context);
      });

      test(`expect c.name to be a string and to be equal "${name}"`, () => {
        expect(c.name).to.be.a("string");
        expect(c.name).to.be.equal(name);
      });

      teardown(() => c = null);
    });

    suite("feature: adding and removing entities", () => {
      let c, e, name = "demo";
      let entityAddedSpy, entityRemovedSpy;

      setup(() => {
        c = new Context(name);
        e = new Entity("test", "foobar");

        entityAddedSpy = chai.spy();
        entityRemovedSpy = chai.spy();

        c.entityAdded.add(entityAddedSpy);
        c.entityAdded.add(entityRemovedSpy);
      });

      test("an entity can be added", () => {
        c.addEntity(e);
        expect(c.entities.size).to.be.equal(1);
        expect(c.entities.has(e.id)).to.be.true;
      });

      test("the entityAdded signal must be dispatched on adding entities", () => {
        c.addEntity(e);
        expect(entityAddedSpy).to.have.been.called.always.with(e.id);
      });

      test("an entity can be removed", () => {
        c.addEntity(e);
        c.removeEntity(e);
        expect(c.entities.size).to.be.equal(0);
        expect(c.entities.has(e.id)).to.be.false;
      });

      test("the entityRemoved signal must be dispatched on removing entities", () => {
        c.addEntity(e);
        c.removeEntity(e);
        expect(entityRemovedSpy).to.have.been.called();
        expect(entityRemovedSpy).to.have.been.called.always.with(e.id);
      });

    });

    suite("feature: adding, updating and removing systems", () => {
      let c, s, name = "demo";
      let systemAddedSpy,
        systemRemovedSpy,
        preUpdateSpy,
        postUpdateSpy;

      setup(() => {
        c = new Context(name);
        s = new System("test", this);

        systemAddedSpy = chai.spy();
        systemRemovedSpy = chai.spy();
        preUpdateSpy = chai.spy();
        postUpdateSpy = chai.spy();

        c.systemAdded.add(systemAddedSpy);
        c.systemRemoved.add(systemRemovedSpy);
        c.preUpdate.add(preUpdateSpy);
        c.postUpdate.add(postUpdateSpy);
      });

      test("a system can be added", () => {
        c.addSystem(s);
        expect(c.systems.size).to.be.equal(1);
        expect(c.systems.has(s.name)).to.be.true;
      });

      test("a signal must be dispatched on adding systems", () => {
        c.addEntity(s);
        expect(systemAddedSpy).to.have.been.called.always.with(s.name);
      });

      test("a system can be removed", () => {
        c.addSystem(s);
        c.removeSystem(s);
        expect(c.systems.size).to.be.equal(0);
        expect(c.systems.has(s.name)).to.be.false;
      });

      test("a signal must be dispatched on removing systems", () => {
        c.addSystem(s);
        c.removeSystem(s);
        expect(systemRemovedSpy).to.have.been.called();
        expect(systemRemovedSpy).to.have.been.called.always.with(s.name);
      });

      test("added systems are updated after context updated is called, " +
        "also the post and pre update signals have to be dispatched", () => {
        c.addSystem(s);
        c.update(10);
        expect(preUpdateSpy).to.have.been.called();
        expect(postUpdateSpy).to.have.been.called();
        expect(s._lastUpdate).to.be.equal(10);
      });

    });

  });

});


