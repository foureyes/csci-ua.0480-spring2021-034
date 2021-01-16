var url = 'https://api.github.com/users/foureyes/repos';
var div = document.getElementById('message-container');
var button = document.getElementById('get-messages-button');
button.addEventListener('click', function() { 
  
var req = new XMLHttpRequest();
req.open('GET', url, true);

req.addEventListener('load', function() {
  if (req.status >= 200 && req.status < 400) {
		var messages = JSON.parse(req.responseText);
		messages.forEach(function(obj) {
			document.body.appendChild(
				document.createElement('div')).
				textContent = obj.message;
		});
	} else {
	  document.body.appendChild(document.createTextNode('request received a ' + req.status));
  }
});

req.addEventListener('error', function(e) {
	document.body.appendChild(document.createTextNode('uh-oh, something went wrong: ' + e + ', ' + req.statusText));
});

req.send();
});


