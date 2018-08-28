$(document).ready(function(){
	resizeDiv();
	var s = skrollr.init();

});

window.onresize = function(event) {
	resizeDiv();
}

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	navbar = $('.nav-outer-container').height();
	videoheight= vph - navbar;
	$('#myVideo').css({'height': videoheight + 'px'});
	$('#tickets-outer-container').css({'min-height': videoheight + 'px'});
}

$(document).ready(function(){
	$( ".video-cover-img"  ).last().addClass( "right-border-radius" );
	$( ".video-cover-img"  ).first().addClass( "left-border-radius" );
});

$(document).ready(function(){
	$.ajax("https://docs.google.com/spreadsheets/d/e/2PACX-1vQy7PRXMh6GB88jf-4uDGdSfyx8qwEmQJQ6IxvSc9tQHyBGd3VpVNi8OW6GuHizI8TdVj-otfdeHCPw/pub?gid=0&single=true&output=csv").done(function(result){
	    csvJSON(result);
	});
});

function csvJSON(csv){
  // console.log("inside csv to json function");
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  var data = JSON.stringify(result); //JSON
  test(result);
}

function test(data){
	for (var i = data.length - 1; i >= 0; i--) {
		var template = $('#tickets_template').html();
		if (template) {
			var html = Mustache.to_html(template, data[i]);
			$('.tickets-container').append(html);
		}
	}
}

$(document).ready(function(){
	$('.team-dropdown').hover(function() {
	  $(this).find('.team-dropdown-content').stop(true, true).delay(200).fadeIn(500);
	}, function() {
	  $(this).find('.team-dropdown-content').stop(true, true).delay(200).fadeOut(500);
	});

});

//scroll to animation
$("a[href^='#']").click(function(e) {
	e.preventDefault();

	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({
		scrollTop: position
	},1000 );
});
