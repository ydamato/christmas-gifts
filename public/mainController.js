angular.module('christmasGiftsModule', [])
  .controller('MainController', function mainController($http, $log) {

    const vm = this;
    
    const getDataToSubmit = () => ({
      participants: vm.participants,
      quantity: vm.quantity,
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
        quantity: 1,
        body: 'Hello {giver}, {receiver1} is your friend',
        from: 'test@test.fr',
        subject: 'Chritmas gift'
      }
    );

    // Add participant
    //
    vm.addParticipant = () => {
      vm.participants.push({});
    };

    // Delete participant
    //
    vm.removeParticipant = (index) => {
      vm.participants.splice(index, 1);
    };

    vm.resetError = (index) => {
      if(vm.errors) {
        delete vm.errors[index];
      }
    };

    // Send emails
    //
    vm.submit = () => {
      const data = angular.toJson(getDataToSubmit());

      $http.post('/emails/send', data).then(
        (result) => {
          if (result.data.errors) {
            vm.errors = {};
            result.data.errors.forEach((error) => {
              vm.errors[error.path] = error.message;
            });
            _.merge(
              vm,
              {
                errorMessage: result.data.errorMessage,
                successMessage: null
              }
            )
          } else {
            vm.participants = [{}, {}];
            _.merge(
              vm,
              {
                errors: null,
                from: null,
                subject: null,
                body: null,
                errorMessage: null,
                successMessage: result.data.successMessage
              }
            );
          }
        }
      );
    };
  });
