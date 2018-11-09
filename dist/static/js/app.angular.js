var app = angular.module('myApp', []);
app.directive('krInput', ['$parse', function ($parse) {
  return {
    priority: 2,
    restrict: 'A',
    compile: function (element) {
      element.on('compositionstart', function (e) {
        e.stopImmediatePropagation();
      });
    },
  };
}]);

app.directive('focusMe', function () {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) {
          element[0].focus();
          element[0].select();
        }
      });
    }
  };
});

app.filter('nl2br', function ($sce) {
  return function(msg, is_xhtml) { 
    var is_xhtml = is_xhtml || true;
    var breakTag = (is_xhtml) ? '<br />' : '<br>';
    var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    return $sce.trustAsHtml(msg);
  }
});

/**
 * get angular scope
 * @param {String} ctrlName 
 */
function getScope (ctrlName) {
  var sel = '[ng-controller="' + ctrlName + '"]';
  return angular.element(sel).scope();
}

/**
 * 쿠키 셋
 * @param {string} cname
 * @param {string} cvalue
 * @param {string} exdays
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * 쿠키 가져오기
 * @param {string} cname
 */
function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/**
 * 현재 시각
 */
function getNow() {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month;
  }
  day = "" + now.getDate();
  if (day.length == 1) {
    day = "0" + day;
  }
  hour = "" + now.getHours();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  minute = "" + now.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  second = "" + now.getSeconds();
  if (second.length == 1) {
    second = "0" + second;
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

// startsWith pollyfill
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
