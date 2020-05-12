"use strict";
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
    	key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
}

function handleSubmit(){
	$("#submit-states").on('submit', function(event) {
		event.preventDefault();
		$(".list").empty();
		$(".error").empty();
		getParks();
	});
}

function getParks(){
	let maxRes = $('.enter-results').val();
	let stateArr = $('.enter-states').val();
	let formatArr = stateArr.split(",");
	formatArr = formatArr.map(function (el) {
  		return el.trim().toUpperCase();
	});
	const params = {
		stateCode: stateArr,
		limit:maxRes
	};

	const key = 'QdGRZjm3TDc4W4RZb8T7YGJEEe13792EtlXiDgWU';
	const baseURI = 'https://api.nps.gov/api/v1/parks';
	const queryString = formatQueryParams(params);
	const URL = baseURI + "?" + queryString + '&api_key='+key;
	console.log(URL);
	fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.error').text(`Something went wrong...`);
        });
}

function displayResults(responseJson){
	console.log(responseJson)
	if (responseJson.total <=0){
		$('.list').append(`<h2>Check your search again</h2>`);
	}
	else{
		$('.list').append(`<h2 class='title'>Here is the results:</h2>`);
		for (let i = 0; i < responseJson.data.length & i < responseJson.limit; i++) {
        	$('.list').append(`<li class="title"><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        	<p class="description">${responseJson.data[i].description}</p>
        	</li>`);
    	}
	}
	
}


$(function() {
  console.log('App loaded!');
  handleSubmit();
});