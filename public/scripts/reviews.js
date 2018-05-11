
$(document).ready(function () {
    var pageUrl = window.location.href;
    var mid = pageUrl.substr(pageUrl.lastIndexOf('/') + 1);
	fetchAllReviews(mid);
});

function fetchAllReviews(mid) {
    const body = {
        mid: mid
	};
    $.post("/moviedetails/", body, function (response) {
        generateListings(response);
	});
}

function generateListings(reviewList) {
    reviewList.forEach(review => {
		$('.reviews_ul').append(
			'<li class="review_li">' +       
            '<h3 class="li_title">' + review.title + '</h3>' +
            '<h6 class="li_title">' + 'Email: ' + review.email + '</h6>' +
            '<h6 class="li_title">' + 'Rating: ' + review.score + '</h6>' +
            '<h6 class="li_title">' + 'Review Date: '  + getFormattedDateString(review.timestamp) + '</h6>' +
			'<h6 class="li_title">' + 'Detailed Review: '   + review.content + '</h6>' +     
			'</li>'
		);
    });
}

function submitReview() {
    window.alert('Submit a review here !');
}

function getFormattedDateString(inputDateStr) {
	//Input date string format: YYYY-MM-DDTHH:MM:SSZ
	var date = Date.parse(inputDateStr); 
	return moment(date).format('MMMM DD, YYYY');
}