$(document).ready(function(){
	resizeDiv();
	skrollrInit();
});


window.onresize = function(event) {
	resizeDiv();
	skrollrInit();
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

$(document).ready(function() {
	var formUrl= "http://128.199.218.232:89/eic-contact/";
      $('form').submit(function(evt){
      	console.log("inside form");
      	var $this = $(this);
		var name = $('#name').val();
		var email = $('#email').val();
		var contact = $('#phone').val();
		var description = $('#description').val();
		var formdata = $this.serialize();
		console.log(formdata);
		console.log(name);
		if ($this.attr('id') == 'contact-us') {
			console.log("sending...");
			$('#contact-us .mail-button ').text("Sending...");
		}
		if (!name == '' && !email == '' && !contact == '' && !description == '') {
			console.log("1");
			$.ajax({
				type: 'POST',
				data: formdata,
				url: formUrl,
				success: function(data) {
					console.log("mail sent");
					clearForm();
					 // location.reload();
                },
				error: function(data) {
					console.log(data);
					alert('Sorry, something went wrong! Please try again ');
				}
			});
		}

        evt.preventDefault();
      });
 });
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("description").value = "";
    $('#contact-us .mail-button ').text("Send Mail");
}

//function Skrollr
function skrollrInit() {

    //initialize skrollr

    skrollr.init({
        smoothScrolling: false
    });

    // disable skrollr if using handheld device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        skrollr.init().destroy();
    }
}