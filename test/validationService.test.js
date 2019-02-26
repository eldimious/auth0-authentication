const { expect } = require('chai');
const {
  validateConfiguration,
} = require('../src/domain/validationService');

describe('validation service tests', () => {
  describe('test validateConfiguration method', () => {
    it('should return without any error, as we pass jwksUri', async () => {
      const fn = validateConfiguration({
        jwksUri: 'https://test.com',
      });
      expect(fn).to.be.undefined;
    });
    it('should return without any error, as we pass secret', async () => {
      const fn = validateConfiguration({
        secret: 'test',
      });
      expect(fn).to.be.undefined;
    });
  });
});
