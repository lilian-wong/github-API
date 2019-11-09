'use Strict';

const searchURL = 'https://api.github.com/users/';
const queryString = '/repos'

function displayResults(responseJson, username){
    console.log(responseJson);
    $('#results-list').empty();
    let results = responseJson;
    let numresults = results.length;
    $('#search-repo').append(`<span>${username}</span>`);
    console.log(username);
    for (let i = 0; i < numresults; i++){
        $('#results-list').append(
           `<li>
                <a href =${results[i].html_url}><p>${results[i].name}</p><a>
           </li>`
        );
    }
    $('#results').removeClass('hidden');
};

function getRepo(username){
    const url = searchURL + username + queryString;
    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error(response.text);
        })
        .then(responseJson => displayResults(responseJson, username))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-form-repo').val();
        getRepo(username);
    });
}

$(watchForm);