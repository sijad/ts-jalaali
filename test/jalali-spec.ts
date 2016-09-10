import { Jalaali } from "../src/jalaali";
import * as chai from "chai";

chai.should();

describe("toJalaali", () => {
  it("should convert Gregorian to Jalaali correctly", () => {
    new Jalaali(1981, 8, 17).toJalaali().should.be.eql({jy: 1360, jm: 5, jd: 26});
    new Jalaali(2013, 1, 10).toJalaali().should.be.eql({jy: 1391, jm: 10, jd: 21});
    new Jalaali(2014, 8, 4).toJalaali().should.be.eql({jy: 1393, jm: 5, jd: 13});
  });

  it("should convert Date object to Jalaali", () => {
    new Jalaali(new Date(1981, 8 - 1, 17)).toJalaali().should.be.eql({jy: 1360, jm: 5, jd: 26});
    new Jalaali(new Date(2013, 1 - 1, 10)).toJalaali().should.be.eql({jy: 1391, jm: 10, jd: 21});
    new Jalaali(new Date(2014, 8 - 1, 4)).toJalaali().should.be.eql({jy: 1393, jm: 5, jd: 13});
  });
});

describe("toGregorian", () => {
  it("should convert Jalaali to Gregorian correctly", () => {
    new Jalaali(1360, 5, 26).toGregorian().should.be.eql({gy: 1981, gm: 8, gd: 17})
    new Jalaali(1391, 10, 21).toGregorian().should.be.eql({gy: 2013, gm: 1, gd: 10});
    new Jalaali(1393, 5, 13).toGregorian().should.be.eql({gy: 2014, gm: 8, gd: 4});
  });
});

describe("isValidJalaaliDate", () => {
  it("should check validity of a Jalaali date", () => {
    new Jalaali(-62, 12, 29).isValidJalaaliDate().should.be.false;
    new Jalaali(-62, 12, 29).isValidJalaaliDate().should.be.false;
    new Jalaali(-61, 1, 1).isValidJalaaliDate().should.be.true;
    new Jalaali(3178, 1, 1).isValidJalaaliDate().should.be.false;
    new Jalaali(3177, 12, 29).isValidJalaaliDate().should.be.true;
    new Jalaali(1393, 0, 1).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 13, 1).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 1, 0).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 1, 32).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 1, 31).isValidJalaaliDate().should.be.true;
    new Jalaali(1393, 11, 31).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 11, 30).isValidJalaaliDate().should.be.true;
    new Jalaali(1393, 12, 30).isValidJalaaliDate().should.be.false;
    new Jalaali(1393, 12, 29).isValidJalaaliDate().should.be.true;
    new Jalaali(1395, 12, 30).isValidJalaaliDate().should.be.true;
  });
});

describe("isLeapJalaaliYear", () => {
  it("should check if a Jalaali year is leap or common", () => {
    new Jalaali(1393).isLeapJalaaliYear().should.be.false;
    new Jalaali(1394).isLeapJalaaliYear().should.be.false;
    new Jalaali(1395).isLeapJalaaliYear().should.be.true;
    new Jalaali(1396).isLeapJalaaliYear().should.be.false;
  });
});

describe("jalaaliMonthLength", function () {
  it("should return number of days in a given Jalaali year and month", function () {
    new Jalaali(1393, 1).jalaaliMonthLength().should.be.equal(31);
    new Jalaali(1393, 4).jalaaliMonthLength().should.be.equal(31);
    new Jalaali(1393, 6).jalaaliMonthLength().should.be.equal(31);
    new Jalaali(1393, 7).jalaaliMonthLength().should.be.equal(30);
    new Jalaali(1393, 10).jalaaliMonthLength().should.be.equal(30);
    new Jalaali(1393, 12).jalaaliMonthLength().should.be.equal(29);
    new Jalaali(1394, 12).jalaaliMonthLength().should.be.equal(29);
    new Jalaali(1395, 12).jalaaliMonthLength().should.be.equal(30);
  })
})
