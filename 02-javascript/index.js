'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. 
It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

This kind of functionality was previously achieved using XMLHttpRequest. 
Fetch provides a better alternative that can be easily used by other technologies such as Service Workers. 
Fetch also provides a single logical place to define other HTTP-related concepts such as CORS and extensions to HTTP.

- How it's used? Add different use-case examples that covers every functionality.
A basic fetch request is really simple to set up. Have a look at the following code:

fetch('https://api.github.com/users/mediastream')
  .then(response => response.json())
  .then(data => console.log(data));

- How it is called this design pattern or technique?

It is basically the new interface to perform Ajax functionalities with Javascript,
which we can now use to facilitate the organization of the code in our applications.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json())
}

fetch('https://api.github.com/users/mediastream')
  .then(response => response.json())
  // .then(data => console.log(data));

// Example POST method implementation: Supplying request options
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://api.github.com/users/mediastream', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });


  // Uploading JSON data
  // Use fetch() to POST JSON-encoded data.
  
  const data = { username: 'example' };
  
  fetch('https://api.github.com/users/mediastream', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });