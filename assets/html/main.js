var urls = {
	latest: "http://www.corsproxy.com/xkcd.com/info.0.json",
	specific: "http://www.corsproxy.com/xkcd.com/%id/info.0.json"
};

var loadn = 10;
var loaded = [];
var total = 0;

$("#scroller ul").empty();

function noconn() {
	$("#loading").html("<span>Error! No connection. </span><br /><a onclick='window.location.reload();'>Reload</a>");
}
function setdata(liele, data) {
	var datasrc = data.img;
	var imageele = liele.find(".image");
	// console.log(imageele);
	imageele.css("background-image", "url(" + datasrc + ")");
	imageele.attr("data-src", datasrc);
}

setTimeout(function () {

	$.getJSON(urls.latest, function (data) {
		// clearTimeout(ajaxautoout);
		console.log(data);
		total = data.num;
		var i = data.num;
		var iloop = function () {
			for (j = 0; j < 50; j++) {
				$("#wrapper ul").append('<li class="post" data-id="' + i + '"><div class="iwrapper"><div class="image" data-src=""></div></div></li>');
				i--;
				if (i < 0) {

			start();
			loadcurrentsector(2);
			$("#loading").fadeOut();
					break;

				}
			}
			if (i >= 0) {
				setTimeout(iloop);
			}
		}
		setTimeout(iloop);
	}).fail(noconn);
	// var ajaxautoout = setTimeout(noconn, 10000);

}, 100);

var mainscroller;

function start() {

	// $(function(){
	// 	var mySwiper = $('.swiper-container').swiper({
	// 		mode:'horizontal',
	// 		loop: false
	// 	});
	// });

	var viewportwidth = window.innerWidth;
	var viewportheight = window.innerHeight;

	// sets wrapper to resemble parent
	$("#wrapper").css("width", viewportwidth + "px").css("height", viewportheight + "px");

	// gives image fixed size
	$("#wrapper .iwrapper").css("height", viewportheight + "px");
	$("#wrapper .iwrapper .image").css("height", (viewportheight - 60) + "px");

	// // sets background based on data-src
	// $(".image").each(function () {
	// 	var datasrc = $(this).attr("data-src");
	// 	if (datasrc != '') {
	// 		$(this).css("background-image", "url(" +  + ")");
	// 	}
	// });

	// sets scroller fixed width
	var noofli = 0;
	$("#wrapper li").each(function () {
		noofli++;
	});
	$("#wrapper ul, #scroller").css("width", noofli * viewportwidth + "px");

	// sets every page width
	$("#wrapper li").css("width", viewportwidth + "px");

	// starts scroller
	mainscroller = new IScroll('#wrapper', {
		scrollX: true,
		scrollY: true,
		scrollbars: false,
	    snap: true,
	    zoom: true,
	    deceleration: 0.005
	});

	mainscroller.on('scrollEnd', loadcurrentsector);
}

function loadcurrentsector(sectorcount) {
		var sectorcount = sectorcount || 1;
		var currentpage = total - (mainscroller.currentPage.pageX + 2);
		var currentsector = Math.floor(currentpage / loadn);
		currentsector -= (sectorcount - 1);
	    if (loaded.indexOf(currentpage) < 0) {
			for (var i = currentsector * loadn + loadn * sectorcount; i > currentsector * loadn; i--) {
				if (loaded.indexOf(i) < 0 && currentpage <= total) {
					var liele = $("[data-id=" + i + "]");
					(function (liele) {
						$.getJSON(urls.specific.replace("%id", liele.attr("data-id")), function (datas) {
							setdata(liele, datas);
							loaded.push(liele.attr("data-id") * 1);
						});
					})(liele);
				}
			}
	    }
}