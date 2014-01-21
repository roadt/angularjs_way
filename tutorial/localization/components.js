angular.module('components', [])

    .directive('tabs', function() {
                   return {
                       restrict: 'E',   // must be element (i.e.<tabs>)
                       transclude: true,  // place original content to ng-transclude or not?
                       scope: {},
                       controller: function($scope, $element) {
                           var panes = $scope.panes = [];
                           $scope.select = function(pane) {
                               angular.forEach(panes, function(pane) {
                                                   pane.selected = false;
                                               });
                               pane.selected = true;
                           }

                           this.addPane = function(pane) {
                               if (panes.length == 0) $scope.select(pane);
                               panes.push(pane);
                           }
                       },
                       template:  '<div class="tabbable">' + 
                           '<ul class="nav nav-tabs">' + 
                           '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' + 
                           '<a href="" ng-click="select(pane)">{{pane.title}}</a>' + 
                           '</li>' +
                           '</ul>' + 
                           '<div class="tab-content" ng-transclude></div>' + 
                           '</div>',
                       replace: true   // replace previous <tabs> elements or append as children?
                   }
               })

    .directive('pane', function() {
                   return {
                       require: '^tabs',  // <pane> must be child of <tabs>
                       restrict: 'E',   // 'pane' must be element. <pane>
                       transclude: true,
                       scope: {
                           title: '@'
                       }, 
                       link: function(scope, element, attrs, tabsCtrl) {
                           tabsCtrl.addPane(scope);
                       },
                       template: 
                       '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                           '</div>',
                       replace: true
                   }
               })

