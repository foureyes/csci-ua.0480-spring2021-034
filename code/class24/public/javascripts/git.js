document.addEventListener('DOMContentLoaded', init);

function init() {
  console.log('init');
  var button = document.getElementById('get-repos');
  button.addEventListener('click', handleClick);

  function handleClick(evt) {
    console.log('clicked');
    var req = new XMLHttpRequest();
    var url = 'http://api.github.com/users/' + 
        document.getElementById('username').value + 
        '/repos';
    console.log(url);
    req.open('GET', url, true);

    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var div = document.getElementById('container'); 
        var oldList = document.querySelector('#container ul');
        var ul = document.createElement('ul');
        var repos = JSON.parse(req.responseText);
        repos.forEach(function(obj) {
          ul.appendChild(document.createElement('li')).textContent = obj.name;
        });
        div.replaceChild(ul, oldList);
      }
    });

    req.addEventListener('error', function() {
      console.log('uh oh');
    });

    req.send();
  }
}
