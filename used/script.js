jQuery.noConflict();

(function($) {
	var ua = navigator.userAgent;
	var isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
	var cc =  $('body').css('max-width');
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


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

		$.fn.preload = function() {
   			 this.each(function(){
    		    $('<img/>')[0].src = 'images/resp_images/'+this;
   			 });
		}
		$(['_home/img48a.png','_home/img48b.png','_home/img48c.png']).preload();
		$(['_music/img38a.png','_music/img38b.png','_music/img38c.png']).preload();
		$(['_shows/img47a.png']).preload();

		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		extramainheight=1;

		if (windowHeight >768 && windowWidth >1024){
			extramainheight = (windowHeight * 0.9-700)/2;
			$('.main').css('padding-top',extramainheight/2);
			$('.main').css('min-height',(windowHeight*0.9)-extramainheight);
			extramainheight+=20;
		}
		heightoffset=0;
		if(windowHeight > $('#home').height()){

			var heightoffset = (windowHeight - $('#home').height())/-4;
			// $('#plaatjes1,#plaatjes2,#plaatjes3,#plaatjes4').css('margin-top',heightoffset);
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

		// $('area').bind('touchstart', function() {
  // 			  	var mapname = $(this).parent().attr('name')+'selector';
  // 			  	orisrc = $("#"+mapname).attr('src');
  //   			newsrc = $(this).attr('data-image');
  // 			  	$("#"+mapname).attr('src',newsrc);
  // 			  });

  // 		$('area').bind('touchend', function() {
  // 			  	var mapname = $(this).parent().attr('name')+'selector';
	 //  		  	$("#"+mapname).attr('src', orisrc);
  //   		}
		// );


		$(".dragimg").each(function() {
			nb = Math.floor((Math.random() * 65) + 100) / 100; // 1-1.5
			if (!isMobileWebkit){
				$(this).attr('data-stellar-ratio', nb);
			}
			else{
				nb = Math.floor((Math.random() * 30));
				$(this).attr('data-stellar-ratio', nb);
			}
			if(!isMobileWebkit){
				if ($(this).hasClass('mapobject') === false) {
					$(this).clone().prop({ id: "" }).appendTo("#plaatjes5");
					$(this).clone().prop({ id: "" }).appendTo("#plaatjes5");

				}
			}else{
				//$("#underground").css('height', toppos + 300);
			}
		});

		// window.onscroll = function () {
 	// 		window.scrollTo(0,$(document).scrollTop());
		// }

maxheight = 700;
		$("#underground .dragimg ").each(function() {

			nb = Math.floor((Math.random() * 230) + 50) / 100; // 1-1.5

			if (!isMobileWebkit){
				$(this).attr('data-stellar-ratio', nb);
			}

			leftpos = Math.floor((Math.random() * ($(window).width()))); // 0-700
			toppos = Math.floor((Math.random() * 7500)) + 150; // 150-7650
			rot = Math.floor((Math.random() * 360)); // 1-1.5

			$(this).css('left', leftpos);
			$(this).css('top', toppos);
			$(this).rotate(rot);

			if (toppos > maxheight) {
				$("#plaatjes5").css('height', toppos + 300);
				maxheight = toppos + 200;
				$("#underground").css('height', toppos + 300);
			}

		});


		if (!isMobileWebkit && !phone){
			$(".dragimg img").unveil(200, function() {
				$(this).load(function() {
					this.style.opacity = 1;
				});
			});

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

			$(document).scrollsnap({
       			 snaps: '.snap',
        		 proximity: 130,
        		 duration: 400,
        		 offset: heightoffset
    		});

			//ipad
		}else if(isMobileWebkit && !phone){
			$(".dragimg img").unveil(3000, function() {
				$(this).load(function() {
					this.style.opacity = 1;
				});
			});
		}else {
			// mobile
			if(phone){

				$(".mobiletitle, .mobiletitle img").unveil(300, function() {
					$(this).load(function() {
						this.style.opacity = 1;
					});
				});

			}else{
				// other
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

			}

		}


		// set bandcamp players
		if (phone ==true) {
			//players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			//players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=e32c14/transparent=true/artwork=none" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/artwork=none" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=e32c14/transparent=true/artwork=none" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			players = '<iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=0f91ff/transparent=true" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=0f91ff/transparent=true" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';

			$('#players2').html(players);
		} else {
			//players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			//players = '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/artwork=none/" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/artwork=none" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe><iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true/artwork=none" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';

			players = '<iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe><iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>';
			$('#players').html(players);
		}


		// ztot=10;
		// $('.dragimg').click(function(){
		// 	ztot=ztot+1;
		// 	$(this).css('z-index', ztot);
		// });

		// $('.dragimg').draggable();
		// $('.but').css('display','block');

		// $('header').css('display','none');
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
						//gig.location.city
						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.venue.metroArea.displayName + " - " + place + wit + "</span></a></li>").appendTo(gigsContainer);

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

						$li = $("<li><a href='" + gig.uri + "' target='_blank'><span class='gigdate'>" + date + "</span><br><span class='gigloc'>" + gig.venue.metroArea.displayName + " - " + place + wit + "</span></a></li>").appendTo(gigsContainer);

					});
				}

				if (gigs && gigs.length < 4) {
					oldGigs(4 - gigs.length);
				}

			});

		$('#goup').click(function() {
			$(".wrapper_sidenav[rel='info']").click();
		});


		$('.wrapper_sidenav').click(function() {
			id = $(this).attr('rel');
				$('html, body').animate({
					scrollTop: $("#" + id).offset().top + heightoffset
				}, 2000);
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
		godownpos = Math.round($('#godown').offset().top);

		$(document).bind('mousemove',function(e){
			if($('#underground').css('display') == 'none'){}else{
        		if ( (godownpos-150) < e.pageY && e.pageY < (godownpos+150) ){
        			$('#godown').css('opacity', '1');
        		}else{
        			$('#godown').css('opacity', '0');
        		}
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

			if (windowPos > 3600) {
				$('#goup').css('display', 'block');
			} else {
				$('#goup').css('display', 'none');
			}

		});

	});
}(jQuery));