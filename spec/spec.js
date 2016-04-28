// spec.js

var pageObject = require('../pageObject/AngularHomepage.js');

describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    var angularHomepage = new pageObject();
    angularHomepage.get();

    angularHomepage.setName('Julie');

    expect(angularHomepage.getGreeting()).toEqual('Hello Julie!');
  });
});
