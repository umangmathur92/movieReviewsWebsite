$(document).ready(function () {
	searchMovieDatabase();
	$('select').formSelect();

	$("form").submit(function () {
		searchMovieDatabase();
		return false;
	});

	$("#apply_filter_button").click(function(){
		searchMovieDatabase();
	});

});

function searchMovieDatabase() {
    $.post("/search/", function (response) {
        generateListings(response);
	});
}

function generateListings(list) {
    list.forEach(listing => {
		$('.search_ul').append(
			'<li class="search_li">' +       
			'<img src="' + listing.url + '">' + '</img>' +
			'<h3 class="li_title">' + listing.name + '</h3>' +
			'<p class="li_description">' + listing.description + '</p>' +     
			'</li>'
		);
	});
}