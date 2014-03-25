var DEFAULT_PLAYERS = 4;

var hasStarted = false;
var isPaused = false;
var halfPassed = false;
var players = [];
var playerClasses = [Mario, Sonic, MegaMan, Pikachu, Smurf, Ryu, Zelda, Kirby, Prince, Duke];
var bench = [];
var trackWidth = 0;
var winners = [];

$(function() {

	refresh();
	
	$("#btn-start").click(start);
	
	function start() {
		if (hasStarted)
			return;
		
		hasStarted = true;
		trackWidth = $(".track").width();

		(function loop() {
			if (isPaused) {
				setTimeout(loop, 50);
			
			} else {
				if (hasStarted) {
					requestAnimFrame(loop);
					render();
				}
			}
		}());
	}
	
	$("#btn-plus").click(function() {
		var n = parseInt($("#num-players").html());
		
		if (n >= playerClasses.length)
			return false;
		
		addPlayer();
		
		$("#num-players").html(n + 1);
	});
		
	$("#btn-minus").click(function() {
		var n = parseInt($("#num-players").html());
		
		if (n <= 1)
			return false;
		
		removePlayer();
		
		$("#num-players").html(n - 1);
	});
	
	$("#btn-refresh").click(function() {
		refresh();
	});
	
	function addPlayer() {
		var stadium = $("#stadium");
		var track = $('<div class="track"></div>');
		
		var p = bench.pop();
		var obj = new p();
		obj.class = p;
		
		var player = $('<div class="player"></div>');
		player.addClass(obj.name.toLowerCase());	
		player.append('<img src="' + obj.runImage + '">');
		player.appendTo(track);
		
		obj.node = player;
		
		track.appendTo(stadium);
		
		players.push(obj);
	}
	
	function removePlayer() {
		var p = players.pop();
		$(".track:last").remove();
		
		bench.push(p.class);
	}
	
	function refresh() {
		players = [];
		winners = [];
		bench = shuffle(playerClasses.slice(0));
		
		$("#stadium").html("");
		
		var n = parseInt($("#num-players").html());
		
		for (var i = 0; i < n; i++) {
			addPlayer();
		}
		
		hasStarted = false;
        halfPassed = false; 
	}
	
	function render() {
        if (!hasStarted)
            return;
        
		var allFinished = true;

		players.forEach(function(p) {
			var skillRandom = Math.random() * 100;

			if (!p.hasFinished && !p.penaltyTimer && skillRandom < p.skillPercent && p.skill) {
				var now = new Date();
				
				if (now - p.lastSkillTime > 3000) {
					p.lastSkillTime = now;
					
					isPaused = true;

					$.proxy(p.skill, p)();
					
					setTimeout(function() {
						isPaused = false;
					}, 1500);
				}
			}

			var left = p.getLeft();

			if (left > trackWidth - 60) {
				if (!p.hasFinished) {
					p.hasFinished = true;
					winners.push(p);
					
					p.node.append('<span class="ranking">' + winners.length + '</span>');
				}
				
			} else {
                if (!halfPassed && left > trackWidth / 2) {
                    halfPassed = true;

                    players.forEach(function(pp) {
                        pp.skillPercent += 0.3;
                    });
                }
                
				allFinished = false;
				var dx = Math.random() * (p.maxSpeed - p.minSpeed) + p.minSpeed;

				p.moveBy(dx / trackWidth * 100);
			}
		});
		
		if (allFinished) {
			hasStarted = false;
		}
	}
	
	
});

var magicEffect = new Image();
magicEffect.src = "img/magic-circle.png";

function showSkillOverlay(img, msg) {
	var width = $(window).width();
	
	$("#skill-overlay img").attr("src", img);
	$("#skill-overlay span").html(msg);
	
	$("#skill-overlay").css("left", width + "px").css("opacity", 0).show()
	.animate({
		left: "-=" + width + "px",
		opacity: 80
	}, 400)
	.delay(500)
	.animate({
		left: "-=" + width + "px",
		opacity: 0
	}, 400, null, function() {
		$("#skill-overlay").hide();
	});
}

function shuffle(array) {
	var currentIndex = array.length
	, temporaryValue
	, randomIndex
	;
	
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	
	return array;
}

function showMagicEffect(p) {
    var effect = new Image();
    effect.src = magicEffect.src;
    
    var obj = $(effect);
    obj.addClass("effect");
    obj.css({
        opacity: 0,
        position: "absolute",
        left: "-4px",
        width: "100%"
    }).appendTo(p.node);
    
    obj.animate({
        opacity: 100
    }, 800)
    .delay(500)
    .animate({
        opacity: 0
    }, 800);
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();