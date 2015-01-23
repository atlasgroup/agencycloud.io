'use strict';

describe('Controller: ModelsCtrl', function () {

  // load the controller's module
  beforeEach(module('agencyCloudApp'));

  var ModelsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModelsCtrl = $controller('ModelsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
