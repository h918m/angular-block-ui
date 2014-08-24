blkUI.directive('blockUiContainer', function (blockUIConfig, blockUiContainerLinkFn) {
  return {
    scope: true,
    restrict: 'A',
    templateUrl: blockUIConfig.template ? undefined : blockUIConfig.templateUrl,
    template: blockUIConfig.template,
    link: blockUiContainerLinkFn
  };
}).factory('blockUiContainerLinkFn', function (blockUI, blockUIUtils) {

  return function ($scope, $element, $attrs) {

    $element.addClass('block-ui-container');

    var srvInstance = $element.inheritedData('block-ui');

    if (!srvInstance) {
      throw new Error('No parent block-ui service instance located.');
    }

    // Expose the state on the scope

    $scope.state = srvInstance.state();

    $scope.$watch('state.blocking', function(value) {
      $element.toggleClass('block-ui-visible', !!value);
    });

    $scope.$watch('state.blockCount > 0', function(value) {
      $element.toggleClass('block-ui-active', !!value);
    });
  };
});