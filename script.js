jQuery.noConflict();

(function($) {
$(document).ready(function() {

	$(".dragimg").each(function(){
		nb = Math.floor((Math.random()*50)+100)/100;
		console.log(nb);
		$(this).attr('data-stellar-ratio', nb);
	});


	$(".dragimg img").unveil(200, function() {
  		$(this).load(function() {
    		this.style.opacity = 1;
 		 });
	});


	// $.stellar({
	// 	//scrollProperty: 'transform'
	// 	 hideElement: function($elem) { $elem.fadeOut(); },
 //     showElement: function($elem) { $elem.fadeIn(); }
	// });

			ztot=10;
			$('.dragimg').click(function(){
				ztot=ztot+1;
				$(this).css('z-index', ztot);
			});

			$('.dragimg').draggable();

			$('.but').click(function(){
				pos='';
				$('.dragimg', $(this).parent()).each(function(){
					posi = $(this).position();
					id = $(this).attr('id');
					zid = $(this).css('z-index');
					pos= pos+ '#'+id + "{left: " + Math.floor(posi.left) +"px;z-index:" + zid +"; top: " + Math.floor(posi.top) + 'px;} \n';
				});
				alert(pos);
			});




function oldGigs(amount){
	//console.log('test');
	$.getJSON('http://api.songkick.com/api/3.0/artists/4597758-riverdistrict/gigography.json?apikey=91AN7asUxDaqHrrv&order=desc&per_page='+amount+'&jsoncallback=?',
    		function(data){
   				//console.log(data);
    			 var gigs = data.resultsPage.results.event;

				    $.each(gigs, function(index, gig) {

				      if(gig.series){
				        var place = gig.series.displayName;
				      } else {
				        var place = gig.venue.displayName;
				      }

				      date = Date.parse(gig.start.date).toString('MMMM d, yyyy');

				      if(gig.performance && !gig.series && gig.performance[0].artist.displayName != "Riverdistrict") {
				        var wit = "<br>w/ "+gig.performance[0].artist.displayName;
				      } else {
				        var wit = "";
				      }

				      $li = $("<li>"+date+"<!--<br>--> "+gig.location.city+"<!--<br>--> "+place+wit+"<!--<br>--> <a href='"+gig.uri+"' target='_blank'>More Info</a></li>").appendTo("#gigs");

				    });


 	});
}

    $.getJSON('http://api.songkick.com/api/3.0/artists/4597758-riverdistrict/calendar.json?apikey=91AN7asUxDaqHrrv&per_page=100&page=1&jsoncallback=?',
    		function(data){
   				 $("#gigs").empty();
    			 var gigs = data.resultsPage.results.event;
   			    if (!gigs){
				    	oldGigs(5);
				    }else{
				    $.each(gigs, function(index, gig) {

				      if(gig.series){
				        var place = gig.series.displayName;
				      } else {
				        var place = gig.venue.displayName;
				      }

				      date = Date.parse(gig.start.date).toString('MMMM d, yyyy');

				      if(gig.performance && !gig.series && gig.performance[0].artist.displayName != "Riverdistrict") {
				        var wit = "<br>w/ "+gig.performance[0].artist.displayName;
				      } else {
				        var wit = "";
				      }

				      $li = $("<li>"+date+"<!--<br>--> "+gig.location.city+"<!--<br>--> "+place+wit+"<!--<br>--> <a href='"+gig.uri+"' target='_blank'>More Info</a></li>").appendTo("#gigs");

				    });
				    }

				    if (gigs.length > 5){
				    	oldGigs(5-gigs.length);
				    }

 	});



		$('.wrapper_sidenav').click(function(){
			id = $(this).attr('rel');
			  $('html, body').animate({
        			 scrollTop: $("#"+id).offset().top
    			 }, 2000,'swing');
		});


var aChildren = $("#sidenav").children(); // find the a children of the list items
//console.log(aChildren);
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('rel');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values
 	//console.log(aArray);

 	opened=false;
    oriheight = $(document).height();
    oriy = $('#underground').height();

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            //console.log(theID);
            var divPos = $('#'+theID).offset().top-110; // get the offset of the div from the top of page
			//console.log(theID);

            var divHeight = $('#'+theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $(".wrapper_sidenav[rel='" + theID + "']").addClass("active");
            } else {
                $(".wrapper_sidenav[rel='"+ theID + "']").removeClass("active");
            }
        }

        // if(windowPos + windowHeight == docHeight) {
        //    y = $('#underground').height();
        //    $('#underground').height(y+25);
        //   	if (opened==false){
        //   		$('.footer').animate({'bottom': '0'}, 2000);
        //   		opened=true;
        //   	}
        //   	// if ((windowPos + windowHeight)%1000){
        //   	// 	console.log((windowPos + windowHeight)%1000);
        //   	// 	console.log('animate');
        //   	// }
        // }
       	// if(windowPos + windowHeight < oriheight){
       	// 	 if (opened==true){
       	// 	 	$('#underground').height(oriy);
        //   		$('.footer').animate({'bottom': '-250'}, 2000);
        //   		opened=false;
        //   	}
       	// }

    });


		var controller = $.superscrollorama();

	// 	controller.addTween('#info',
	// 	  TweenMax.from($('#info'),.5,{
	// 	    css:{opacity:0}}),
	// 	    0, // scroll duration of tween (0 means autoplay)
	// 	    -200); // offset the start of the tween by 200 pixels

	// controller.addTween('#music',
	// 	  TweenMax.from($('#music'),.5,{
	// 	    css:{opacity:0}}),
	// 	    0, // scroll duration of tween (0 means autoplay)
	// 	    -200); // offset the start of the tween by 200 pixels

	// controller.addTween('#shows',
	// 	  TweenMax.from($('#shows'),.5,{
	// 	    css:{opacity:0}}),
	// 	    0, // scroll duration of tween (0 means autoplay)
	// 	    -200); // offset the start of the tween by 200 pixels

		/* removes text from search form on focus and replaces it on unfocus - if text is entered then it does not get replaced with default on unfocus */

	});
}(jQuery));
