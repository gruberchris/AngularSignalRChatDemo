export class MainController {
	constructor (toastr, InstantMessage, MessageStream, $location, $scope) {
		'ngInject';

		this.toastr = toastr;
		this.InstantMessage = InstantMessage;
		this.$location = $location;
		this.$scope = $scope;

		this.messages = InstantMessage.query();

		let myMessages = this.messages;

		MessageStream.on('addNewMessage', function(newMessage) {
			myMessages.push(newMessage);
		})
	}

	onSendButtonClick(messageText) {
		let message = {
			MessageText: messageText
		};

		let scope = this.$scope;

		this.InstantMessage.save(message, function() {
			scope.main.messageText = '';
		});
	}
}
