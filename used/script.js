jQuery.noConflict();

(function($) {
	var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
		cc =  $('body').css('max-width');
		if (cc =='600px'){
			phone = true;
			$('html').addClass('phone');
			gigsContainer = $('#gigsmobile');
		}else{
			phone=false;
			gigsContainer = $('#gigs');
		}
	if (isMobileWebkit) {
		$('html').addClass('mobile');
	}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
	$(document).ready(function() {

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		extramainheight=0
		if (windowHeight >768){
			extramainheight = (windowHeight * 0.9-700)/2;
			$('.main').css('padding-top',extramainheight);
			$('.main').css('min-height',(windowHeight*0.9)-extramainheight);
			extramainheight+=30;
		}

		$(window).resize(function() {
		    if(windowWidth != $(window).width()){
		    location.reload();
		    return;
		    }
		});

		$('area').hover(
   			 function() {
  			  	var mapname = $(this).parent().attr('name')+'selector';
  			  	orisrc = $("#"+mapname).attr('src');
    			newsrc = $(this).attr('data-image');
  			  	$("#"+mapname).attr('src',newsrc);
  			  },
  			  function() {
  			  	var mapname = $(this).parent().attr('name')+'selector';
	  		  	$("#"+mapname).attr('src', orisrc);
    		}
		);


		// var isPhone = false;
		// if ($('#sidenav').css('display') == 'none') {
		// 	isPhone = true;
		// }


		$(".dragimg").each(function() {
			nb = Math.floor((Math.random() * 65) + 100) / 100; // 1-1.5
			if (!isMobileWebkit){
				$(this).attr('data-stellar-ratio', nb);
			}
			else{
				nb = Math.floor((Math.random() * 30));
				$(this).attr('data-stellar-ratio', nb);
			}
			if ($(this).hasClass('mapobject') === false) {
				$(this).clone().prop({
					id: ""
				}).appendTo("#plaatjes5");
				$(this).clone().prop({
					id: ""
				}).appendTo("#plaatjes5");

			}
		});

		maxheight = 700;
		$("#underground .dragimg ").each(function() {

			nb = Math.floor((Math.random() * 230) + 50) / 100; // 1-1.5

			if (!isMobileWebkit){
				$(this).attr('data-stellar-ratio', nb);
			}
			//console.log($(window).width()-200);
			leftpos = Math.floor((Math.random() * ($(window).width()-500))); // 0-700
			toppos = Math.floor((Math.random() * 7500)) + 100; // 0-1500
			rot = Math.floor((Math.random() * 360)); // 1-1.5

			$(this).css('left', leftpos);
			$(this).css('top', toppos);
			$(this).rotate(rot);

			if (toppos > maxheight) {
				$("#plaatjes5").css('height', toppos + 200);
				maxheight = toppos + 200;
				$("#underground").css('height', toppos + 200);
			}

		});

		if (!isMobileWebkit && !phone){
			$(".dragimg img").unveil(0, function() {
				$(this).load(function() {
					this.style.opacity = 1;
				});
			});

		}else {
			if(phone){
				// $(".mobiletitle img").unveil(0, function() {
				// $(this).load(function() {
				// 	this.style.opacity = 1;
				// });
				$('.mobiletitle img').each(function(){
					$(this).attr('src', $(this).attr('data-src'));
					$(this).css('opacity',1);
				});

			}else{
			$('.dragimg img').each(function(){
				$(this).attr('src', $(this).attr('data-src'));
				$(this).css('opacity',1);
				if ($(this).parent().hasClass('mapobject')==false){
					delay = $(this).parent().attr('data-stellar-ratio');
					$(this).parent().css({animationDelay: (5*delay)+'s'}) // apply sequential trans delay to each character
				}
			});
			$('.dragimg').css('display','block');

			allimg = $('.dragimg img');
			function myTimer(){

			 	shuffle(allimg);
			 	var randimg = allimg[0];
			 	$(randimg).animate({'opacity':0.3},1500, function(){
			 		$(randimg).animate({'opacity':1},1500);
			 	});
			}

			}

		 //setInterval(function(){myTimer()},100);


	//}


		if (!isMobileWebkit) {
			$.stellar({
				horizontalScrolling: false,
				hideElement: function($elem) {
					$elem.fadeOut();
				},
				showElement: function($elem) {
					$elem.fadeIn();
				},
				verticalOffset: extramainheight
			});
		}else{
				// Something nice for ipads

		}


		if (phone ==true) {
			players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			$('#players2').html(players);
		} else {
			players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			$('#players').html(players);
		}


		// ztot=10;
		// $('.dragimg').click(function(){
		// 	ztot=ztot+1;
		// 	$(this).css('z-index', ztot);
		// });

		// $('.dragimg').draggable();

		// $('.but').click(function(){
		// 	pos='';
		// 	$('.dragimg', $(this).parent()).each(function(){
		// 		posi = $(this).position();
		// 		id = $(this).attr('id');
		// 		zid = $(this).css('z-index');
		// 		pos= pos+ '#'+id + "{left: " + Math.floor(posi.left) +"px;z-index:" + zid +"; top: " + Math.floor(posi.top) + 'px;} \n';
		// 	});
		// 	alert(pos);
		// });



		function oldGigs(amount) {
			$.getJSON('http://api.songkick.com/api/3.0/artists/4597758-riverdistrict/gigography.json?apikey=91AN7asUxDaqHrrv&order=desc&per_page=' + amount + '&jsoncallback=?',
				function(data) {
					var gigs = data.resultsPage.results.event;

					$.each(gigs, function(index, gig) {

						if (gig.series) {
							var place = gig.series.displayName;
						} else {
							var place = gig.venue.displayName;
						}

						date = Date.parse(gig.start.date).toString('MMMM d, yyyy');

						if (gig.performance && !gig.series && gig.performance[0].artist.displayName != "Riverdistrict") {
							var wit = "<br>w/ " + gig.performance[0].artist.displayName;
						} else {
							var wit = "";
						}

						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.location.city + " - " + place + wit + "</span></a></li>").appendTo(gigsContainer);

					});


				});
		}

		$.getJSON('http://api.songkick.com/api/3.0/artists/4597758-riverdistrict/calendar.json?apikey=91AN7asUxDaqHrrv&per_page=100&page=1&jsoncallback=?',
			function(data) {

				gigsContainer.empty();
				var gigs = data.resultsPage.results.event;
				if (!gigs) {
					oldGigs(4);
				} else {
					$.each(gigs, function(index, gig) {

						if (gig.series) {
							var place = gig.series.displayName;
						} else {
							var place = gig.venue.displayName;
						}

						date = Date.parse(gig.start.date).toString('MMMM d, yyyy');

						if (gig.performance && !gig.series && gig.performance[0].artist.displayName != "Riverdistrict") {
							var wit = "<br>w/ " + gig.performance[0].artist.displayName;
						} else {
							var wit = "";
						}

						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.location.city + " - " + place + wit + "</span></a></li>").appendTo(gigsContainer);

					});
				}

				if (gigs && gigs.length > 4) {
					oldGigs(4 - gigs.length);
				}

			});

		$('#goup').click(function() {
			$(".wrapper_sidenav[rel='info']").click();
		});


		$('.wrapper_sidenav').click(function() {
			id = $(this).attr('rel');
			if (!isMobileWebkit){
				$('html, body').animate({
					scrollTop: $("#" + id).offset().top -30
				}, 2000, 'swing');
			}else{
				$('html, body').scrollTop( $("#" + id).offset().top);
			}
		});


		var aChildren = $("#sidenav").children(); // find the a children of the list items
		var aArray = []; // create the empty aArray
		for (var i = 0; i < aChildren.length; i++) {
			var aChild = aChildren[i];
			var ahref = $(aChild).attr('rel');
			aArray.push(ahref);
		} // this for loop fills the aArray with attribute href values

		opened = false;
		oriheight = $(document).height();
		oriy = $('#underground').height();

		$(document).bind('mousemove',function(e){
        		if (2700 < e.pageY && 3000 > e.pageY ){
        			//console.log(e.pageY);
        			$('#godown').css('opacity', '1');
        		}else{
        			$('#godown').css('opacity', '0');
        		}
			});

		$(window).scroll(function() {
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();

			for (var i = 0; i < aArray.length; i++) {
				var theID = aArray[i];
				var divPos = $('#' + theID).offset().top - 110; // get the offset of the div from the top of page

				var divHeight = $('#' + theID).height(); // get the height of the div in question
				if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
					$(".wrapper_sidenav[rel='" + theID + "']").addClass("active");
				} else {
					$(".wrapper_sidenav[rel='" + theID + "']").removeClass("active");
				}
			}

			if (windowPos > 3000) {
				$('#goup').css('display', 'block');
			} else {
				$('#goup').css('display', 'none');
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


		//var controller = $.superscrollorama();



	});
}(jQuery));