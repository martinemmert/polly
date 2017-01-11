const foobar = require("../src/foobar");
const expect = require("chai").expect;

describe("\"foobar\"", function() {
  describe("#foobar()", function() {
    it("expect the returned value to be a string", function() {
      expect(foobar.foobar()).to.be.a("string");
    });
    it("expect the returned string to match /^foobar$/", function() {
      expect(foobar.foobar()).to.match(/^foobar$/);
    });
  });
});
