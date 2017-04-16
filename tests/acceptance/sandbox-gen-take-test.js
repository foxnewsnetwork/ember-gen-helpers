import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import startApp from 'dummy/tests/helpers/start-app';
import destroyApp from 'dummy/tests/helpers/destroy-app';
import Sandbox from 'dummy/tests/pages/sandbox';
import { r200 } from 'dummy/utils/asyncs';

const pangram = 'The quick brown fox jumped over the lazy dog';

describe('Acceptance | sandbox gen take', function() {
  let application;

  before(function(done) {
    application = startApp();
    Sandbox.visit();
    this.timeout(5000);
    andThen(() => done());    
  });

  after(function() {
    destroyApp(application);
  });

  it('has landed us on the correct page', function() {
    expect(currentPath()).to.equal('sandbox');
  });
  it('should render the correct pangram on vanilla', function() {
    expect(Sandbox.vanilla).to.equal(pangram);
  });
  it('should render the correct pangram on expr', function() {
    expect(Sandbox.expr).to.equal(pangram);
  });
  it('should render the correct pangram on control', function() {
    expect(Sandbox.control).to.equal(pangram);
  });

  describe('reslts', function() {
    before(function(done) {
      this.timeout(5000);
      r200().then(done);
    });
    it('should render the correct result on vanilla', function() {
      expect(Sandbox.vanillaResult()).to.equal('peppercorn');
    });
    it('should render the correct result on expr', function() {
      expect(Sandbox.exprResult()).to.equal('peppercorn');
    });
    it('should render the correct result on control', function() {
      expect(Sandbox.controlResult()).to.equal('peppercorn');
    });
  });
});
