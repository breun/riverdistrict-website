/*global jQuery*/
jQuery.noConflict();

(function ($) {
    "use strict";
    var ua = navigator.userAgent,
        isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua),
        cc = $('body').css('max-width'),
        width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        phone = false,
        gigsContainer = $('#gigs');

    $('#overlay').on('click', function () {
        $('#overlay').fadeOut();
    });

    if (cc === '600px') {
        phone = true;
        gigsContainer = $('#gigsmobile');
    }

    if (isMobileWebkit) {
        $('html').addClass('mobile');
    }

    function addBandcampPlayers() {
        if (phone) {
            $('#players2').html('<iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2477009346/size=large/bgcol=333333/linkcol=0f91ff/transparent=true" seamless=""><a href="http://shop.riverdistrictmusic.com/album/kansas-anymore">Kansas Anymore by Riverdistrict</a></iframe>' +
                '<iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=large/bgcol=333333/linkcol=0f91ff/transparent=true" seamless=""><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe>' +
                '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=large/bgcol=333333/linkcol=0f91ff/transparent=true" seamless=""><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>');
        } else {
            $('#players').html('<iframe id="player3" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2477009346/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true" seamless><a href="http://shop.riverdistrictmusic.com/album/kansas-anymore">Kansas Anymore by Riverdistrict</a></iframe>' +
                '<iframe id="player2" style="" src="http://bandcamp.com/EmbeddedPlayer/album=1250167618/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true" seamless><a href="http://shop.riverdistrictmusic.com/album/canvas-holes-2">Canvas Holes by Riverdistrict</a></iframe>' +
                '<iframe id="player1" style="" src="http://bandcamp.com/EmbeddedPlayer/album=2208739686/size=medium/bgcol=333333/linkcol=0f91ff/transparent=true" seamless><a href="http://shop.riverdistrictmusic.com/album/portrait-of-portraits">Portrait of Portraits by Riverdistrict</a></iframe>');
        }
    }

    function addShows() {
        var numGigs = 0,
            maxGigs = 4,
            songkick_artist_id = '4597758-riverdistrict',
            songkick_api_key = '91AN7asUxDaqHrrv';

        function getShows(songkickData) {
            var shows = [];

            if (songkickData.resultsPage.results.event) {
                $.each(songkickData.resultsPage.results.event, function (index, gig) {
                    var place = gig.venue.displayName,
                        date = Date.parse(gig.start.date).toString('MMMM d, yyyy'),
                        wit = "";

                    if (gig.series) {
                        place = gig.series.displayName;
                    }

                    if (gig.start.time) {
                        date += ' ' + Date.parse(gig.start.time).toString('h:mm tt');
                    }

                    if (gig.performance && !gig.series && gig.performance[0].artist.displayName !== "Riverdistrict") {
                        wit = gig.performance[0].artist.displayName;
                    }

                    shows.push({
                        uri: gig.uri,
                        date: date,
                        place: place,
                        metroArea: gig.venue.metroArea.displayName,
                        wit: wit
                    });

                    numGigs += 1;
                });
            }

            return shows;
        }

        function renderUpcomingShowHtml(show) {
            return $("<li><a href='" + show.uri + "' target='_blank'><span class='gigdate'>" + show.date + "</span><br><span class='gigloc'>" + show.place + " - " + show.metroArea + (show.wit ? (' (with ' + show.wit + ')') : '') + "</span></a></li>");
        }

        function addUpcomingEvents(songkickData) {
            getShows(songkickData).forEach(function (show) {
                gigsContainer.append(renderUpcomingShowHtml(show));
            });
        }

        function renderPastShowHtml(show) {
            return renderUpcomingShowHtml(show).css('opacity', '0.7');
        }

        function addPastEvents(songkickData) {
            getShows(songkickData).forEach(function (show) {
                gigsContainer.prepend(renderPastShowHtml(show));
            });
        }

        // Add upcoming shows
        $.getJSON('http://api.songkick.com/api/3.0/artists/' + songkick_artist_id + '/calendar.json?apikey=' + songkick_api_key + '&per_page=' + maxGigs + '&page=1&jsoncallback=?', addUpcomingEvents)
            .then(function () {
                // Add past shows if there is room left
                if (numGigs === 0) {
                    $.getJSON('http://api.songkick.com/api/3.0/artists/' + songkick_artist_id + '/gigography.json?apikey=' + songkick_api_key + '&per_page=' + (maxGigs - numGigs) + '&order=desc&jsoncallback=?', addUpcomingEvents);
                } else if (numGigs < maxGigs) {
                    $.getJSON('http://api.songkick.com/api/3.0/artists/' + songkick_artist_id + '/gigography.json?apikey=' + songkick_api_key + '&per_page=' + (maxGigs - numGigs) + '&order=desc&jsoncallback=?', addPastEvents);
                }
            });
    }

    $(document).ready(function () {
//        var hash = window.location.hash;
//        var link = $('a');
//        $('#sidenav a').click(function(e) {
//             e.preventDefault();
//             hash = link.attr("href");
//             window.location = hash;
//         });

        $.fn.preload = function () {
            this.each(function () {
                $('<img/>')[0].src = 'images/resp_images/' + this;
            });
        };
        $(['_home/img48a.png', '_home/img48b.png', '_home/img48c.png']).preload();
        $(['_music/img38a.png', '_music/img38b.png', '_music/img38c.png']).preload();
        $(['_shows/img47a.png']).preload();

        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            extramainheight = 1,
            heightoffset = 0,
            maxheight = 700,
            aArray = [], // create the empty aArray
            opened = false,
            oriheight = $(document).height(),
            oriy = $('#underground').height(),
            godownpos = Math.round($('#godown').offset().top);

        if (windowHeight > 768 && windowWidth > 1024) {
            extramainheight = (windowHeight * 0.9 - 700) / 2;
            $('.main').css('padding-top', extramainheight / 2);
            $('.main').css('min-height', (windowHeight * 0.9) - extramainheight);
            extramainheight += 20;
        }

        if (windowHeight > $('#home').height()) {
            heightoffset = (windowHeight - $('#home').height()) / -4;
        }

        $(window).resize(function () {
            if (windowWidth !== $(window).width()) {
                location.reload();
                return;
            }
        });

        $('area').hover(
            function () {
                var mapname = $(this).parent().attr('name') + 'selector',
                    newsrc = $(this).attr('data-image');
                $("#" + mapname).attr('src', newsrc);
            },
            function () {
                var mapname = $(this).parent().attr('name') + 'selector',
                    orisrc = $("#" + mapname).data('src');
                $("#" + mapname).attr('src', orisrc);
            }
        );

        $('area').bind('click', function () {
            var mapname = $(this).parent().attr('name') + 'selector',
                orisrc = $("#" + mapname).data('src');
            $("#" + mapname).attr('src', orisrc);
        });


        $('area').bind('touchend', function () {
            var mapname = $(this).parent().attr('name') + 'selector',
                orisrc = $("#" + mapname).data('src');
            $("#" + mapname).attr('src', orisrc);
        });

        $(".dragimg").each(function () {
            var nb = Math.floor((Math.random() * 65) + 100) / 100; // 1-1.5
            if (!isMobileWebkit) {
                $(this).attr('data-stellar-ratio', nb);
            } else {
                nb = Math.floor((Math.random() * 30));
                $(this).attr('data-stellar-ratio', nb);
            }
            if (!isMobileWebkit) {
                if ($(this).hasClass('mapobject') === false) {
                    $(this).clone().prop({id: ""}).appendTo("#plaatjes5");
                    $(this).clone().prop({id: ""}).appendTo("#plaatjes5");

                }
            }
        });

        $("#underground .dragimg ").each(function () {
            var nb = Math.floor((Math.random() * 230) + 50) / 100, // 1-1.5
                leftpos = Math.floor((Math.random() * ($(window).width()))), // 0-700
                toppos = Math.floor((Math.random() * 7500)) + 150, // 150-7650
                rot = Math.floor((Math.random() * 360)); // 1-1.5

            if (!isMobileWebkit) {
                $(this).attr('data-stellar-ratio', nb);
            }

            $(this).css('left', leftpos);
            $(this).css('top', toppos);
            $(this).rotate(rot);

            if (toppos > maxheight) {
                $("#plaatjes5").css('height', toppos + 300);
                maxheight = toppos + 200;
                $("#underground").css('height', toppos + 300);
            }
        });

        if (!isMobileWebkit && !phone) {
            $(".dragimg img").unveil(200, function () {
                $(this).load(function () {
                    this.style.opacity = 1;
                });
            });

            $.stellar({
                horizontalScrolling: false,
                hideElement: function ($elem) {
                    $elem.fadeOut();
                },
                showElement: function ($elem) {
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
        } else if (isMobileWebkit && !phone) {
            //ipad
            $(".dragimg img").unveil(3000, function () {
                $(this).load(function () {
                    this.style.opacity = 1;
                });
            });
        } else {
            // mobile
            if (phone) {
                $(".mobiletitle, .mobiletitle img").unveil(300, function () {
                    $(this).attr('src', $(this).attr('data-src'));
                    $(this).css('opacity', 1);
//					$(this).load(function() {
//                        this.style.opacity = 1;
//					});
                });
            } else {
                // other
                $('.dragimg img').each(function () {
                    $(this).attr('src', $(this).attr('data-src'));
                    $(this).css('opacity', 1);
                    if (!$(this).parent().hasClass('mapobject')) {
                        var delay = $(this).parent().attr('data-stellar-ratio');
                        $(this).parent().css({animationDelay: (5 * delay) + 's'}); // apply sequential trans delay to each character
                    }
                });
                $('.dragimg').css('display', 'block');
            }
        }

        addBandcampPlayers();

        addShows();

        $('#goup').click(function () {
            $(".wrapper_sidenav[rel='bio']").click();
        });

        $('.wrapper_sidenav').click(function () {
            var id = $(this).attr('rel');
            $('html, body').animate({
                scrollTop: $("#" + id).offset().top + heightoffset
            }, 2000);
        });

        //$('.contactbutton').click(function () {
        //
        //	$('html, body').animate({
        //		scrollTop: $("#contactdetails" ).offset().top + heightoffset
        //	}, 2000);
        //});

        $('.logo').click(function () {
            $('html, body').animate({
                scrollTop: $("#home").offset().top + heightoffset
            }, 2000);
        });

        $('.contactbutton').click(function () {
            $('.contactoverlay').toggleClass('showing');
        });

        $("#sidenav").children().each(function () {
            aArray.push($(this).attr('rel'));
        });

        $(document).bind('mousemove', function (e) {
            if ($('#underground').css('display') !== 'none') {
                $('#godown').css('opacity', (godownpos - 150) < e.pageY && e.pageY < (godownpos + 150) ? '1' : '0');
                $('.contactbutton').css('display', (godownpos + 150) < e.pageY ? 'none' : 'block');
            }
        });

        $(window).scroll(function (e) {
            var windowPos = $(window).scrollTop(), // get the offset of the window from the top of page
                windowHeight = $(window).height(), // get the height of the window
                docHeight = $(document).height();

            aArray.forEach(function (theID) {
                var divPos = $('#' + theID).offset().top - 110, // get the offset of the div from the top of page
                    divHeight = $('#' + theID).height(); // get the height of the div in question
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $(".wrapper_sidenav[rel='" + theID + "']").addClass("active");
                } else {
                    $(".wrapper_sidenav[rel='" + theID + "']").removeClass("active");
                }
            });

            if (windowPos + windowHeight === docHeight) {
                $(".wrapper_sidenav[rel='contact']").addClass("active");
                $(".wrapper_sidenav[rel='bio']").removeClass("active");
            }

            $('#goup').css('display', windowPos > 3600 ? 'block' : 'none');

            if ($('#underground').css('display') === 'none' && phone === false) {
                $('.contactbutton').css('display', ((windowPos + windowHeight) > (docHeight - 300)) ? 'none' : 'block');
            }
        });
    });
}(jQuery));
