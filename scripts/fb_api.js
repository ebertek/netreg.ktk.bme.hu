window.fbAsyncInit = function() {
	FB.init({appId: '121884961180039', status: true, cookie: false,
		xfbml: true});

	FB.Event.subscribe('auth.login', function(response) {
		FB.getLoginStatus(function(response) {
			if (response.session) {
				facebook_onlogin();
			}
		});
	});
	FB.Event.subscribe('auth.logout', function(response) {
		facebook_onlogout();
	});
	FB.getLoginStatus(function(response) {
		if (response.session) {
			facebook_onlogin();
		}
	});

	
};
(function() {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.src = document.location.protocol +
  		'//connect.facebook.net/hu_HU/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
}());