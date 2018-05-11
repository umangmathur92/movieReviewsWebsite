$(document).ready(function () {
	fetchListings();
	$('select').formSelect();

	$("form").submit(function () {
		searchListings();
		return false;
	});

	$("#apply_filter_button").click(function(){
		searchListings();
	});

});

fetchListings = () => {
	$.get("/search", function (response) {
        window.alert(JSON.stringify(response));
        generateListings(response);
	});
}

generateListings = (list) => {
	list.forEach(listing => {
		$('.search_ul').append(
			'<li class="search_li">' +       
			'<img src="' + listing.url + '">' + '</img>' +
			'<h3 class="li_title">' + listing.name + '</h3>' +
			'<p class="li_description">' + listing.description + '</p>' +     
			'</li>'
		);
	})
}