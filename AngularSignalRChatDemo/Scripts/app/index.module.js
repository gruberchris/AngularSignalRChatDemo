import { config } from './index.config';
import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';

angular.module('angularSignalRChatDemo', ['ngRoute', 'ngResource', 'ui.bootstrap', 'toastr'])
  .config(config)
  .config(routerConfig)
  .factory('InstantMessage', function($resource) {
    'use strict';

    return $resource('/api/messages');
  })
  .controller('MainController', MainController);
