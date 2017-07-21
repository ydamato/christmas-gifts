angular.module('christmasGiftsModule', [])
  .controller('MainController', function mainController($http, $log) {
    const vm = this;
    _.merge(
      vm,
      {
        participants: [
          { name: 'test 1',
            email: 'email@test.fr',
            isJustCreated: true
          },
          {
            name: 'test 2',
            email: 'email2@test.fr',
            isJustCreated: true
          }
        ],
        numberOfGift: 1,
        body: 'Hello {giver}, {receiver1} is your friend',
        from: 'test@test.fr',
        subject: 'Chritmas gift'
      }
    );

    // Add participant
    //
    vm.addParticipant = () => {
      vm.participants.push({ isJustCreated: true });
    };

    // Delete participant
    //
    vm.removeParticipant = (index) => {
      vm.participants.splice(index, 1);
    };

    vm.getParticipantError = (index) => {
      const participant = vm.participants[index];
      if (!participant.isJustCreated && (!participant.name.trim() || !participant.email.trim())) {
        return 'ERROR MESSAGE';
      }
      return null;
    };

    // Send emails
    //
    vm.sendEmails = () => {
      const data = {
        participants: vm.participants,
        quantity: vm.numberOfGift,
        subject: vm.subject,
        from: vm.from,
        body: vm.body
      };

      $http.post('/emails/send', angular.toJson(data)).then(
        (result) => {
          $log.debug(result.data);
        },
        (result) => {
          $log.debug(result);
        }
      );
    };
  });
