const { expect } = require('chai');

const { syncAndSeed } = require('../server/db');

describe('Models', () => {
  let seed;
  beforeEach(async () => {
    seed = await syncAndSeed();
  });
  describe('seeded data', () => {
    it('there are 3 students', () => {
      expect(Object.keys(seed.students).length).to.equal(3);
    });
    it('there are 3 campuses', () => {
      expect(Object.keys(seed.campuses).length).to.equal(3);
    });
  });
  describe('Campus requires name and address', () => {
    it('Weigand University has a name', () => {
      expect(seed.campuses.weigand.name).to.be.ok;
    });
    it('Weigand University has an Address', () => {
      expect(seed.campuses.weigand.streetAddress).to.be.ok;
    });
    it('Braun University has a name', () => {
      expect(seed.campuses.braun.name).to.be.ok;
    });
    it('Braun University has an address', () => {
      expect(seed.campuses.braun.streetAddress).to.be.ok;
    });
    it('Bergstrom University has a name', () => {
      expect(seed.campuses.bergstrom.name).to.be.ok;
    });
    it('Bergstrom University has an address', () => {
      expect(seed.campuses.bergstrom.streetAddress).to.be.ok;
    });
  });

  describe('Student must have a valid email', () => {
    it('Jack has a valid email', () => {
      expect(seed.students.jack.email).to.be.ok;
    });
    it('Jane has a valid email', () => {
      expect(seed.students.jane.email).to.be.ok;
    });
    it('Jen has a valid email', () => {
      expect(seed.students.jen.email).to.be.ok;
    });
  });
});
