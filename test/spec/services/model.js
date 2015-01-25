'use strict';

describe('Service: Model', function () {

  // load the service's module
  beforeEach(module('agencyCloudApp'));

  // instantiate service
  var Model;
  beforeEach(inject(function (_Model_) {
    Model = _Model_;
  }));

  it('should do something', function () {
    expect(!!Model).toBe(true);
  });

});
