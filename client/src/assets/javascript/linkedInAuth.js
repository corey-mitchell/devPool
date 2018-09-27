// Exchanges LinkedIn auth code for an access token
$(document).ready(()=>{
    console.log("document loaded");

                // Closes window once everything is done.
                const closeCurrentWindow = () => {
                    window.close();
                };

                
    // Targets the auth code given by the linkedin confirmation.
    const authCode = window.location.search.substr(1);
    console.log(authCode);

    // Passes auth code thru to linkedin url to get access token.
    const tokenURL = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&${authCode}&redirect_uri=http://localhost:9090/success&client_id=78k0z5io5whh5e&client_secret=rhqY2Mgy6OhOnS0Q`;

    // Ajax call to linkedin for access token.
    // Fixed CORS issues by prepending the url line
    $.ajax({
        method: 'POST',
        url: `https://cors-escape.herokuapp.com/${tokenURL}`,
        headers: {
            "Allow-Control-Access-Origin": "*"
        }
    }).then((res)=>{
        console.log(res);
        // LinkedIn API Call
        $.ajax({
            method: 'GET',
            url: 'https://cors-escape.herokuapp.com/https://api.linkedin.com/v1/people/~:(id,first-name,last-name,picture-url,headline,summary,email-address)?format=json',
            headers: {
                "Authorization": `Bearer ${res.access_token}`,
                "Connection": "Keep-Alive",
                "Content-type": "application/json"
            }
        }).then((response)=>{
            // console.log(response);

            // Sends info from LI to DB
            const name = `${response.firstName} ${response.lastName}`;
            const email = response.emailAddress;
            const password = response.id;
            const imageURL = response.pictureUrl;
            const user = {
                name: name,
                email: email,
                password: password,
                imageURL: imageURL
            };

            $.post('/api/user', user);
        }).then(()=>{
            // Closes Window. Need to fix. Keeps closing window before data can post to DB.
            return window.close();
        })
    });

});