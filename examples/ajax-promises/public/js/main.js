
document.addEventListener("DOMContentLoaded", main);

function main() {
  const xhrMethods = {
    regular: getCommitMessageXhr,
    functions: getCommitMessageXhrFunction,
    promises: getCommitMessagePromises,
  }

  document.querySelector('#btn').addEventListener('click', function(evt) {
    evt.preventDefault();
    const username = document.querySelector("#username").value;
    const method = document.querySelector("#method").value;
    const getCommitMessage = xhrMethods[method];
    getCommitMessage(username);
  });

}

//////////////////////////////////////////////////////
// Using "regular" XMLHttpRequest (no abstractions) //
// ///////////////////////////////////////////////////
function getCommitMessageXhr(username) {
  const url = `https://api.github.com/users/${username}/repos`
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(evt) {
    if(xhr.status >= 200 && xhr.status < 400) {
      const repositories = JSON.parse(xhr.responseText);
      // prob check for repo
      const repo = repositories[0];
      const commitsUrl = repo.commits_url.replace(/\{.*\}/, '');


      const commitsXhr = new XMLHttpRequest();
      commitsXhr.open('GET', commitsUrl);
      commitsXhr.addEventListener('load', function(evt) {
        if(commitsXhr.status >= 200 && commitsXhr.status < 400) {
          const commits = JSON.parse(commitsXhr.responseText);
          const c = commits[0];
          console.log(c)
          const message = c.commit.message;
          document.querySelector('#commitMessage').textContent = message;
        } else {
          console.log('we haz an error!!!!'); 
        }
      });
      commitsXhr.addEventListener('error', function(evt) {
        console.log('uh oh... could not get response');
      });
      commitsXhr.send();


      console.log(commitsUrl); 
    } else {
      console.log('we haz an error!!!!'); 
    }
  });
  xhr.addEventListener('error', function(evt) {
    console.log('uh oh... could not get response');
  });
  xhr.send();
}

////////////////////////////////////////////////////////////////
// Wrapping XMLHttpRequest Within a Function, Using Callbacks //
////////////////////////////////////////////////////////////////
function getCommitMessageXhrFunction(username) {
  console.log('using xhr wrapped in a function');
  const url = `https://api.github.com/users/${username}/repos`
  myXhr(url, function(responseText) {
    const commitsUrl = extractCommitsUrl(responseText);
    myXhr(commitsUrl, extractAndDisplayMessage);
      /*
      myXhr(commitsUrl, function(responseText) {
        extractAndDisplayMessage(responseText);
      });
      */
  });
}

// 1. create our own function that hides away details of using
//    XMLHttpRequest... add a callback as a second parameter so
//    that some action can be performed after XMLHttpRequest
//    completes
function myXhr(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function(evt) {
    if(xhr.status >= 200 && xhr.status < 400) {
      cb(xhr.responseText);
    } else {
      console.log('we haz an error!!!!'); 
    }
  });
  xhr.addEventListener('error', function(evt) {
    console.log('uh oh... could not get response');
  });
  xhr.send();
}

// 2. helper function to parse commits url from list of repos
function extractCommitsUrl(responseText) {
  // give back the commits url of first repository from repos json
  const repositories = JSON.parse(responseText);
  // prob check for repo
  const repo = repositories[0];
  const commitsUrl = repo.commits_url.replace(/\{.*\}/, '');
  return commitsUrl;
}

// 3. helper function to find commit message and place message
//    into DOM
function extractAndDisplayMessage(responseText) {
  const commits = JSON.parse(responseText);
  const c = commits[0];
  console.log(c)
  const message = c.commit.message;
  document.querySelector('#commitMessage').textContent = message;
}



///////////////////////////////////////////////
// Wrapping XMLHttpRequest Within a Promise! //
///////////////////////////////////////////////
function getCommitMessagePromises(username) {
  console.log('wrapping xhr within a promise!');
  const url = `https://api.github.com/users/${username}/repos`
  myXhrPromises(url)
    .then(extractCommitsUrl, console.log)
    .then(myXhrPromises)
    .then(extractAndDisplayMessage);

  /*
  ....or
  const promise = myXhrPromises(url);
  // our async task is getting the repositories
  // set the correct fulfill and reject functions
  promise.then(extractCommitsUrl, console.log)
  */
}

// modify our previous myXhr function so that a Promise is returned
// in order to execute some action after request completes (that is,
// use promises instead of callbacks... note that there's no second
// parameter for a callback hiere!)
function myXhrPromises(url) {
  return new Promise(function(fulfill, reject) {
    // this executes the async task
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function(evt) {
      if(xhr.status >= 200 && xhr.status < 400) {
        // our request was successful, call fulfill
        fulfill(xhr.responseText);
      } else {
        reject('we haz an error, bad status code!!!!'); 
      }
    });
    xhr.addEventListener('error', function(evt) {
      reject('uh oh... could not get response');
    });
    xhr.send();
  });
}
