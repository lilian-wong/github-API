'use Strict';

const searchURL = 'https://api.github.com/users/';
const queryString = '/repos'

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    let results = responseJson;
    let numresults = results.length;
    for (let i = 0; i < numresults; i++){
        $('#results-list').append(
           `<li>
                <a href =${results[i].html_url}><h3>${results[i].name}<h3><a>
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
        .then(responseJson => displayResults(responseJson))
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