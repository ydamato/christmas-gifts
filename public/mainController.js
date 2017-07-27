angular.module('christmasGiftsModule', [])
  .controller('MainController', function mainController($http) {
    // vm will contain the scope of controller
    const vm = this;

    /**
     * @function getDataToSubmit
     * @description Get formatted data to submit
     * @return {Object} Formatted object
     * @private
     */
    const getDataToSubmit = () => ({
      participants: vm.participants,
      quantity: vm.quantity,
      subject: vm.subject,
      from: vm.from,
      body: vm.body
    });

    /**
     * @function addParticipant
     * @description Add an empty participant
     * @return {undefined}
     * @public
     */
    vm.addParticipant = () => {
      vm.participants.push({});
    };

    /**
     * @function removeParticipant
     * @description Remove a participant
     * @return {undefined}
     * @public
     */
    vm.removeParticipant = (index) => {
      vm.participants.splice(index, 1);
    };

    /**
     * @function resetError
     * @description Reset a specific error
     * @return {undefined}
     * @public
     */
    vm.resetError = (index) => {
      if (vm.errors) {
        delete vm.errors[index];
      }
    };

    /**
     * @function submit
     * @description Submit the data
     * @return {undefined}
     * @public
     */
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
            );
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

    // Initialise the scope
    //
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
  });
