export class MainController {
  constructor (toastr, InstantMessage, $location, $scope) {
    'ngInject';

    this.toastr = toastr;
    this.InstantMessage = InstantMessage;
    this.$location = $location;
    this.$scope = $scope;

    this.messages = InstantMessage.query();
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
