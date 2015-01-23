'use strict';

describe('Controller: ModelCtrl', function () {

  // load the controller's module
  beforeEach(module('agencyCloudApp'));

  var ModelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModelCtrl = $controller('ModelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
