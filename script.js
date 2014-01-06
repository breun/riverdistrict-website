jQuery.noConflict();



(function($) {
	var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

	if (isMobileWebkit) {
		$('html').addClass('mobile');
	}

	$(document).ready(function() {

		var isPhone = false;
		if ($('#sidenav').css('display') == 'none') {
			isPhone = true;
		}

		$(".dragimg").each(function() {
			nb = Math.floor((Math.random() * 50) + 100) / 100; // 1-1.5
			$(this).attr('data-stellar-ratio', nb);
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
			nb = Math.floor((Math.random() * 200) + 50) / 100; // 1-1.5
			$(this).attr('data-stellar-ratio', nb);
			leftpos = Math.floor((Math.random() * 700)); // 0-700
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

		$("#home .dragimg img").unveil(0, function() {
			$(this).load(function() {
				this.style.opacity = 1;
			});
		});

		$("#music .dragimg img").unveil(200, function() {
			$(this).load(function() {
				this.style.opacity = 1;
			});
		});

		$("#shows .dragimg img").unveil(200, function() {
			$(this).load(function() {
				this.style.opacity = 1;
			});
		});

		$("#info .dragimg img").unveil(200, function() {
			$(this).load(function() {
				this.style.opacity = 1;
			});
		});

		$("#underground .dragimg img").unveil(200, function() {
			$(this).load(function() {
				this.style.opacity = 1;
			});
		});

		var iScrollInstance;

		if (isMobileWebkit) {
			// iScrollInstance = new iScroll('wrapper');

			// $('#scroller').stellar({
			// 	scrollProperty: 'transform',
			//        positionProperty: 'transform',
			// 	horizontalScrolling: false,
			// 	hideElement: function($elem) { $elem.fadeOut(); },
			//   	    showElement: function($elem) { $elem.fadeIn(); }
			// 	//verticalOffset: 150
			// });
		} else {
			$.stellar({
				horizontalScrolling: false,
				hideElement: function($elem) {
					$elem.fadeOut();
				},
				showElement: function($elem) {
					$elem.fadeIn();
				}
				//verticalOffset: 150
			});
		}


		if (isPhone) {
			players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
		} else {
			players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';

		}
		$('#players').html(players);

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

						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.location.city + " - " + place + wit + "</span></a></li>").appendTo("#gigs");

					});


				});
		}

		$.getJSON('http://api.songkick.com/api/3.0/artists/4597758-riverdistrict/calendar.json?apikey=91AN7asUxDaqHrrv&per_page=100&page=1&jsoncallback=?',
			function(data) {
				$("#gigs").empty();
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

						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.location.city + " - " + place + wit + "</span></a></li>").appendTo("#gigs");

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
			$('html, body').animate({
				scrollTop: $("#" + id).offset().top
			}, 2000, 'swing');
		});


		var aChildren = $("#sidenav").children(); // find the a children of the list items
		//console.log(aChildren);
		var aArray = []; // create the empty aArray
		for (var i = 0; i < aChildren.length; i++) {
			var aChild = aChildren[i];
			var ahref = $(aChild).attr('rel');
			aArray.push(ahref);
		} // this for loop fills the aArray with attribute href values
		//console.log(aArray);

		opened = false;
		oriheight = $(document).height();
		oriy = $('#underground').height();

		$(window).scroll(function() {
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();

			for (var i = 0; i < aArray.length; i++) {
				var theID = aArray[i];
				//console.log(theID);
				var divPos = $('#' + theID).offset().top - 110; // get the offset of the div from the top of page
				//console.log(theID);

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


		var controller = $.superscrollorama();



	});
}(jQuery));