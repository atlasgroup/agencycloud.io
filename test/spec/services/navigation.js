'use strict';

describe('Service: navigation', function () {

  // load the service's module
  beforeEach(module('agencyCloudApp'));

  // instantiate service
  var navigation;
  beforeEach(inject(function (_navigation_) {
    navigation = _navigation_;
  }));

  it('should do something', function () {
    expect(!!navigation).toBe(true);
  });

});
