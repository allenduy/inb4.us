'use strict';

describe('Directive: sm-search', function () {

  // load the directive's module and view
  beforeEach(module('inb4usApp'));
  beforeEach(module('app/search/search.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sm-search></sm-search>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the search directive');
  }));
});