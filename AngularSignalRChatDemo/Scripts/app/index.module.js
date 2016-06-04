/*global $*/
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
	.factory('MessageStream', function($rootScope, $log) {
		'use strict';

		return {
			on: function(eventName, callback) {
				var connection = $.hubConnection();
				var messageHubProxy = connection.createHubProxy('messageHub');

				messageHubProxy.on(eventName, function(message) {
					var args = arguments;

					$log.debug(message);

					$rootScope.$apply(function() {
						callback.apply(messageHubProxy, args);
					});
				});

				connection.start().done(function() {});
			}
		};
	})
	.controller('MainController', MainController);
