$(document).ready(function () {
    populateYearSelectionDropdownList();
    populateRatingSelectionDropdownList();
	searchMovieDatabase();
    $(btnSearch).click(function () {
        searchMovieDatabase();
    });
});

function searchMovieDatabase() {
    const key = $("#txtSearch").val().trim();
    const year = $("#btnYearDropdown").text().trim();
    const rating = $("#btnPopularityDropdown").text().charAt(0);
    $("#search_ul").empty();
    const body = {
        search_query: key, 
        order_by: 'DESC',
        year: year,
        rating: rating
	};
    $.post("/search/", body, function (response) {
        generateListings(response);
	});
}

function generateListings(movieList) {
    movieList.forEach(movie => {
		$('.search_ul').append(
			'<li class="search_li">' +       
			'<img src="' + movie.url + '">' + '</img>' +
            '<h3 class="li_title">' + movie.name + '</h3>' +
            '<h6 class="li_title">' + 'Average Rating: ' + movie.avg_score + '</h6>' +
            '<h6 class="li_title">' + 'Release Date: '  + getFormattedDateString(movie.rel_date) + '</h6>' +
			'<p class="li_description">' + movie.description + '</p>' +     
			'</li>'
		);
	});
}

function populateRatingSelectionDropdownList() {
    var popularityDropdownList = document.getElementById('popularityDropdown');
    let anchorElement = document.createElement('a');
        anchorElement.setAttribute('class', 'dropdown-item');
        anchorElement.setAttribute('onmouseover', '');
        anchorElement.setAttribute('style', 'cursor: pointer;');
        anchorElement.innerHTML = '-';
        anchorElement.addEventListener("click", function (event) {
            $("#btnPopularityDropdown").text('-');
            $("#btnPopularityDropdown").val('-');
        });
        popularityDropdownList.appendChild(anchorElement);
    for (let num = 1; num <= 5; num++) {
        let anchorElement = document.createElement('a');
        anchorElement.setAttribute('class', 'dropdown-item');
        anchorElement.setAttribute('onmouseover', '');
        anchorElement.setAttribute('style', 'cursor: pointer;');
        anchorElement.innerHTML = num + ' Stars or Greater';
        anchorElement.addEventListener("click", function (event) {
            $("#btnPopularityDropdown").text(num + ' Stars or Greater');
            $("#btnPopularityDropdown").val(num + ' Stars or Greater');
        });
        popularityDropdownList.appendChild(anchorElement);
    }
    return anchorElement;
}

function populateYearSelectionDropdownList() {
    var yearDropdownList = document.getElementById('yearDropdown');
    let anchorElement = document.createElement('a');
        anchorElement.setAttribute('class', 'dropdown-item');
        anchorElement.setAttribute('onmouseover', '');
        anchorElement.setAttribute('style', 'cursor: pointer;');
        anchorElement.innerHTML = '-';
        anchorElement.addEventListener("click", function (event) {
            $("#btnYearDropdown").text('-');
            $("#btnYearDropdown").val('-');
        });
        yearDropdownList.appendChild(anchorElement);
    for (let yr = 2000; yr <= 2018; yr++) {
        let anchorElement = document.createElement('a');
        anchorElement.setAttribute('class', 'dropdown-item');
        anchorElement.setAttribute('onmouseover', '');
        anchorElement.setAttribute('style', 'cursor: pointer;');
        anchorElement.innerHTML = yr;
        anchorElement.addEventListener("click", function (event) {
            $("#btnYearDropdown").text(yr);
            $("#btnYearDropdown").val(yr);
        });
        yearDropdownList.appendChild(anchorElement);
    }
    return anchorElement;
}

function getFormattedDateString(inputDateStr) {
	//Input date string format: YYYY-MM-DDTHH:MM:SSZ
	var date = Date.parse(inputDateStr); 
	return moment(date).format('MMMM DD, YYYY');
}
