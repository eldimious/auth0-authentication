const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const jwt = require('jsonwebtoken');
const authenticationFactory = require('../src');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

const userEmail = 'test@gmail.com';
const userName = 'Dimos';
const userId = 1;
const jwtSecret = 'secret';
const token = jwt.sign({ email: 'test@gmail.com', name: 'Dimos', id: 1 }, jwtSecret);

describe('authentication module tests', () => {
  describe('test exported module', () => {
    it('should return checkAuth method', async () => {
      const authentication = authenticationFactory({
        secret: 'secret',
      });
      expect(authentication).to.not.be.undefined;
      expect(authentication).to.be.an('object');
      expect(typeof(authentication.checkAuth)).to.eql('function');
    });
    it('should return validation error', async () => {
      const err = 'Should pass either a public key from jwks (secret) or jwks-rsa configuration (jwksUri) configuration option to decode incoming JWT token.';
      expect(authenticationFactory).to.throw(err);
    });
    describe('test checkAuth function', () => {
      it('should return token without error', async () => {
        const authentication = authenticationFactory({
          secret: 'secret',
        });
        const req = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        expect(typeof(authentication.checkAuth)).to.eql('function');
        const decodedToken = await authentication.checkAuth(req);
        expect(decodedToken).to.not.be.undefined;
        expect(decodedToken).to.be.an('object');
        expect(decodedToken.email).to.equal(userEmail);
        expect(decodedToken.name).to.equal(userName);
        expect(decodedToken.id).to.equal(userId);
      });
      it('should return error', async () => {
        const authentication = authenticationFactory({
          secret: 'secret',
        });
        const req = {
          headers: {
          },
        };
        await expect(authentication.checkAuth(req)).to.eventually.be.rejectedWith(Error);
      });
    });
  });
});