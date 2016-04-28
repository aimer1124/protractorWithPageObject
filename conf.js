// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/**.js'],
  // capabilities: {
  //   browserName: 'firefox'
  // },
  jasmineNodeOpts: {
    showColors: true,
  }
};
