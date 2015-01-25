'use strict';

describe('Filter: image', function () {

  // load the filter's module
  beforeEach(module('agencyCloudApp'));

  // initialize a new instance of the filter before each test
  var image;
  beforeEach(inject(function ($filter) {
    image = $filter('image');
  }));

  it('should return the input prefixed with "image filter:"', function () {
    var text = 'angularjs';
    expect(image(text)).toBe('image filter: ' + text);
  });

});
