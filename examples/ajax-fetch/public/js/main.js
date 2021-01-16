document.addEventListener("DOMContentLoaded", main);

function main() {
  document.querySelector('#btn').addEventListener('click', function(evt) {

    evt.preventDefault();
    const username = document.querySelector("#username").value;
    // getCommitXhr(username); // use XMLHttpRequest
    // getCommitXhrFunction(username); // use XMLHttpRequest, but make our own function
    // getCommitPromises(username); // use a promise to wrap XMLHttpRequest
    getCommitFetch(username); // use fetch
  });

}

//////////////////////////////////
// Using regular XMLHttpRequest //
//////////////////////////////////
function getCommitXhr(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(evt) {
    if(xhr.status >= 200 && xhr.status < 400) {
      const repositories = JSON.parse(xhr.responseText);
      if(repositories[0]) {
        const commitsUrl = repositories[0].commits_url.replace(/\{.*\}$/, '');
        console.log(commitsUrl);

        // GET commits
        const commitsXhr = new XMLHttpRequest();
        commitsXhr.open('GET', commitsUrl);
        commitsXhr.addEventListener('load', function(evt) {
          if(commitsXhr.status >= 200 && commitsXhr.status < 400) {
            const commits = JSON.parse(commitsXhr.responseText);
            const c = commits[0];
            if(c) {
              const message = c.commit.author.date + '\n' + c.commit.author.name + '\n' + c.sha + '\n' + c.commit.message;
              console.log(message);
              document.querySelector('#commitMessage').textContent = message;
            }
          } else {
            console.log('error!'); 
          }
        });
        commitsXhr.send();
        // END commits

      }
    } else {
      console.log('error!');
    }
  });
  xhr.send();
}

//////////////////////////////////////////////////////////////////
// Make our Own Function that Uses XMLHttpRequest and callbacks //
//////////////////////////////////////////////////////////////////

// 1. this use our myXhr function (defined later)
function getCommitXhrFunction(username) {
  console.log('xhr with functions');
  const url = `https://api.github.com/users/${username}/repos`;
  myXhr(url, function(response) {
    const commitsUrl = extractCommitsUrl(response);
    myXhr(commitsUrl, function(commitsResponse) {
      extractAndDisplayCommitMessage(commitsResponse)
    });
  });
}

// 2. myXhr (wrap an XMLHttpRequest within our own function, add a callback
//    function as the second argument to our function so that we can 
//    specify what to do after our request)
function myXhr(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(evt) {
    if(xhr.status >= 200 && xhr.status < 400) {
      cb(xhr.responseText);
    }
  });
  xhr.send();
}

function extractAndDisplayCommitMessage(response) {
  const commits = JSON.parse(response);
  const c = commits[0];
  if(c) {
    const message = c.commit.author.date + '\n' + c.commit.author.name + '\n' + c.sha + '\n' + c.commit.message;
    console.log(message);
    document.querySelector('#commitMessage').textContent = message;
  }
}

function extractCommitsUrl(response) {
    const repositories = JSON.parse(response);
    const commitsUrl = repositories[0].commits_url.replace(/\{.*\}$/, '');
    return commitsUrl;
}


function getCommitFetch(username) {
  console.log('fetch');
  const url = `https://api.github.com/users/${username}/repos`;
  const response = fetch(url)
    .then(response => response.json())
    .then(extractCommitsUrlParsed)
    .then(fetch)
    .then(response => response.json())
    .then(extractAndDisplayCommitMessageParsed);
}

function extractAndDisplayCommitMessageParsed(commits) {
  const c = commits[0];
  if(c) {
    const message = c.commit.author.date + '\n' + c.commit.author.name + '\n' + c.sha + '\n' + c.commit.message;
    console.log(message);
    document.querySelector('#commitMessage').textContent = message;
  }
}

function extractCommitsUrlParsed(repositories) {
    const commitsUrl = repositories[0].commits_url.replace(/\{.*\}$/, '');
    return commitsUrl;
}

function getCommitFetch(username) {
  console.log('fetch');
  const url = `https://api.github.com/users/${username}/repos`;
  fetch(url)
    .then(response => response.json())
    .then(extractCommitsUrlParsed)
    .then(fetch)
    .then(response => response.json())
    .then(extractAndDisplayCommitMessageParsed);
}

function get(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function(evt) {
      if(xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.responseText);
      } else {
        reject('bad status code ' + xhr.status); 
      }
    });
    xhr.send();
  });
}

function getCommitPromises(username) {
  console.log('promises');
  const url = `https://api.github.com/users/${username}/repos`;
  get(url)
    .then(extractCommitsUrl)
    .then(get)
    .then(extractAndDisplayCommitMessage);
}





