angular.module('conference.AuthService', ['ngMockE2E', 'conference.config'])

.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var userid = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    userid = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (userid == 'admin') {
      role = USER_ROLES.admin;
    }
    else if (userid == 'user') {
      role = USER_ROLES.public;
    }
    else{
     role = USER_ROLES.public;
    }


    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    userid = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(userid, pw) {

    var jsonData = [];
    var deferred = $q.defer();

    var promise = $http.get("data/employee.json");

    promise.success(function(data){
      
      jsonData = data;

      for(var i=0;i<jsonData.length;i++){

          if(jsonData[i].empno == userid){

              storeUserCredentials(userid + '.yourServerToken');
              //deferred.resolve(jsonData[i]);
              deferred.resolve("Login success");
              return deferred.promise;
          }
      }
      deferred.reject("Login error");
      return deferred.promise;
    });

    promise.error(function(error){
      console.log(error);
      deferred.reject('Login Failed.');
      return deferred.promise;
    })
    ;

    /*var deferred = $q.defer();

    if ((userid == 'admin' && pw == '1') || (userid == 'user' && pw == '1')) {

      storeUserCredentials(userid + '.yourServerToken');
      deferred.resolve('Login success.');
    } else {
      deferred.reject('Login Failed.');
    }
    return deferred.promise;*/

    /*
    return $q(function(resolve, reject) {
      if ((userid == 'admin' && pw == '1') || (userid == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(userid + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
    */
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    storeUserCredentials: storeUserCredentials,
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    userid: function() {return userid;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
