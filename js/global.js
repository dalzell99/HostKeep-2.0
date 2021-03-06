var ADMIN_USERNAME = "hello@hostkeep.com.au";
var AIRBNB_URL = "https://www.airbnb.com.au/rooms/";
var PLACEHOLDER = "http://placehold.it/100";
var API_URL = "http://uistaging.owners.hostkeep.com.au/php/";
var REPAIRS_URL = "http://uistaging.owners.hostkeep.com.au/repairs/";
var DOCUMENTS_URL = "http://uistaging.owners.hostkeep.com.au/documents/";

// Set toastr notification options
$(function () {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "7500",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};

	// if ('serviceWorker' in navigator) {
	// 	navigator.serviceWorker.register('sw.js').then(function(registration) {
	// 		// Registration was successful
	// 		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	// 	}).catch(function(err) {
	// 		// registration failed :(
	// 		console.log('ServiceWorker registration failed: ', err);
	// 	});
	// }
});

// Display a notification message with bootstrap message types
function displayMessage(type, message) {
	toastr[type](message);
}

// Retrieve the GET variables from url
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function getSessionVars(keys) {
	return keys.reduce(function (obj, key) {
		obj[key] = getSessionVar(key);
		return obj;
	}, {});
}

function setSessionVars(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			setSessionVar(key, obj[key]);
		}
	}
}

function getSessionVar(key) {
	try {
		return Base64.decode(sessionStorage[Base64.encode(key)]);
	} catch (e) {
		return false;
	}
}

function setSessionVar(key, val) {
	sessionStorage[Base64.encode(key)] = Base64.encode(val);
}

function getPersistentVars(keys) {
	return keys.reduce(function (obj, key) {
		obj[key] = getPersistentVar(key);
		return obj;
	}, {});
}

function setPersistentVars(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			setPersistentVar(key, obj[key]);
		}
	}
}

function getPersistentVar(key) {
	try {
		return Base64.decode(localStorage[Base64.encode(key)]);
	} catch (e) {
		return false;
	}
}

function setPersistentVar(key, val) {
	localStorage[Base64.encode(key)] = Base64.encode(val);
}

function removeSessionVars(arr) {
	arr.forEach(function (key) {
		sessionStorage.removeItem(Base64.encode(key));
	});
}

function removePersistentVars(arr) {
	arr.forEach(function (key) {
		localStorage.removeItem(Base64.encode(key));
	});
}

function isInt(value) {
  return !isNaN(value) &&
		 parseInt(Number(value)) == value &&
		 !isNaN(parseInt(value, 10));
}

function pad(num, len) {
	num = '' + num;
	while (num.length < len) {
		num = '0' + num;
	}

	return num;
}

function get(o) {
	$.get(API_URL + o.url, o.vars, function (res) {
		if (res.status) {
			o.callback(res.data);
		} else {
			showError(res);
		}
	}, 'json').fail(function () {
		console.log("GET failed: " + API_URL + o.url + ", Vars: " + o.vars);
	});
}

function post(o) {
	$.post(API_URL + o.url, o.vars, function (res) {
		if (res.status) {
			o.callback(res.data);
		} else {
			showError(res);
		}
	}, 'json').fail(function () {
		console.log("POST failed: " + API_URL + o.url + ", Vars: " + o.vars);
	});
}

function showError(res) {
	console.log("------------------------------");
	for (var key in res) {
		if (res.hasOwnProperty(key)) {
			console.log(key + ": " + res[key]);
		}
	}
	console.log("------------------------------");

	displayMessage('error', res.message);
}
