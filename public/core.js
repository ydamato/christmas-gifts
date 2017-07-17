angular.module('christmasGiftsModule', [])
  .controller('MAIN.Controller', ($scope, $http, $log) => {

    console.log('test');
    const vm = this;
    vm.formData = {};
    vm.todos = [
      { text: 'test 1' },
      { text: 'test 2' }
    ];

    // when submitting the add form, send the text to the node API
    vm.createTodo = () => {
      $http.post('/api/todos', vm.formData)
        .success((data) => {
          vm.formData = {}; // clear the form so our user is ready to enter another
          vm.todos = data;
          $log(data);
        })
        .error((data) => {
          $log('Error: ' + data);
        });
    };

    // delete a todo after checking it
    vm.deleteTodo = (id) => {
      $http.delete('/api/todos/' + id)
        .success((data) => {
          vm.todos = data;
          $log(data);
        })
        .error((data) => {
          $log('Error: ' + data);
        });
    };

    // $scope is fine for watchers
    $scope.$watch(angular.bind(vm, () => vm.value));
  });
