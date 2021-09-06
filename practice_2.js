require('isomorphic-fetch');

fetch('https://api.github.com/users/mediastream')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		// console.log(stories);
        // console.log(stories.login);
	});

    //----------------------------------------------------------------------

fetch('https://api.github.com/users/mediastream')
  .then(response => response.json())
  .then(data => console.log(data));