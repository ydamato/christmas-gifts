angular.module('christmasGiftsModule', [])
  .controller('MainController', function mainController($http, $log) {

    const vm = this;
    
    const getDataToSubmit = () => ({
      participants: vm.participants,
      quantity: vm.numberOfGift,
      subject: vm.subject,
      from: vm.from,
      body: vm.body
    });

    _.merge(
      vm,
      {
        participants: [
          { name: 'test 1',
            email: 'email@test.fr'
          },
          {
            name: 'test 2',
            email: 'email2@test.fr'
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
      vm.participants.push();
    };

    // Delete participant
    //
    vm.removeParticipant = (index) => {
      vm.participants.splice(index, 1);
    };

    vm.validateData = () => {
      const data = angular.toJson(getDataToSubmit());
      $http.post('/validate', data).then(
        (result) => {
          vm.errors = result.data.error.details; //TODO 
        }
      );
    };

    // Send emails
    //
    vm.sendEmails = () => {
      const data = angular.toJson(getDataToSubmit());

      $http.post('/emails/send', data).then(
        (result) => {
          $log.debug(result.data);
        }
      );
    };
  });
