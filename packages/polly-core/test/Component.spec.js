import {setup, teardown, suite, test} from "mocha";
import {expect} from "chai";

import {Component} from "../src";

suite("Component", () => {

  suite("module implementation", () => {
    test("expect the module to exist", () => {
      expect(Component).to.exist;
    });

    test("expect the module to be a Function", () => {
      expect(Component).to.be.an.instanceOf(Function);
    });

    test("expect the name of the function to be 'Component'", () => {
      expect(Component.name).to.be.equal("Component");
    });

    test("expect calling the function with new to not throw", () => {
      expect(() => new Component).to.not.throw;
    });
  });

  suite("setup: c is assigned to calling new Component with parameters {type: \"demo\"}", () => {
    let c, type = "demo";

    setup(() => c = new Component(type));

    test("expect c to be an instanceOf Component", () => {
      expect(c).to.be.an.instanceOf(Component);
    });

    test(`expect c.type to be a string and to be equal "${type}"`, () => {
      expect(c.type).to.be.a("string");
      expect(c.type).to.be.equal(type);
    });

    teardown(() => c = null);
  });

});


