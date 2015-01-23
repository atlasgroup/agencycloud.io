'use strict';

describe('Directive: progress', function () {

  // load the directive's module
  beforeEach(module('agencyCloudApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<progress></progress>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the progress directive');
  }));
});
