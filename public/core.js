angular.module('christmasGiftsModule', [])
  .controller('MainController', function mainController() {
    const vm = this;
    _.merge({
      vm,
      participants: [
        { name: 'test 1' },
        { name: 'test 2' }
      ],
      numberOfGift: 1
    });

    vm.addParticipant = () => {
      vm.participants.push({ name: '' });
    };

    // delete a todo after checking it
    vm.removeParticipant = (index) => {
      vm.participants.splice(index, 1);
    };
  });
