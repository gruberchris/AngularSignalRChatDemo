export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'Scripts/app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .otherwise({
      redirectTo: '/'
    });
}
