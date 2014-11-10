var gridSize = 10; /** starting size **/
var etchType = "normal";
var traceToggle = "off";
var traceButton = 1;

$(document).ready(function () {
	initiateBody();
	initiate();
	$("button#changeSize").click(function(){

		gridSize = prompt("choose the grid dimensions");
		initiate();

	});
	$("button#random").click(function(){
		etchType = "random";
		initiate();
	});
	$("button#normal").click(function(){
		etchType = "normal";
		initiate();
	});
	$("button#trace").click(function(){
		traceButton += 1;
		if (traceButton%2==0) {
			traceToggle = "on";
			$("#trace").css("background-color", "#FFCC99");
		} else{
			traceToggle="off";
			$("#trace").css("background-color", "#FFB5FF");
		};
		initiate();
	});
	$("button#clear").click(function(){
		initiate();
	});
});

function initiate() {
	erase();
	create_grid(gridSize);
	etch();
};

function etch(){
	switch(etchType) {
		case "normal":
		normal(".sameDiv", "#66CCFF");
		break;
		case "random":
		rand();
		break;			
	};
	switch(traceToggle) {
		case "off":
		break;
		case "on":
		trace(".sameDiv","white");
		break;
	};
};

function create_grid(gridSize) {
	var boxSize = (480/gridSize);
	var boxBorder = Math.ceil(boxSize/24) + "px solid grey";
	var boxRadius = Math.ceil(boxSize/12) + "px";
	for (var i = 0; i<gridSize*gridSize; i++) {
		$("<div/>", {
			class: "sameDiv",
			width: boxSize,
			height: boxSize,
			// border: boxBorder, NOT WORKING??
			// border-radius: boxRadius, 


		}).appendTo("div#container");
	};
	$(".sameDiv").css({
		'border': boxBorder,
		'border-radius': boxRadius,
	});

};

function erase(){
	$(".sameDiv").remove();
};

function normal(target, color){
	$(target).mouseenter(function() {
		$(this).css("background-color", color);

	});
};

function rand() {
	$(".sameDiv").mouseenter(function(){
		$(this).css("background-color", randomColor());
	});
};

function randomColor() {
	var alphabet = "0123456789abcdef".split('');
	var randColor = "#";
	for (var i = 1; i <= 6; i++) {
		randColor += alphabet[Math.round(Math.random()*15)];
	};
	return randColor;
};

function trace(target, color){
	$(target).mouseleave(function(){
		$(this).animate({
			backgroundColor: color,
		}, 600);
	});
};

function initiateBody(){
	for (var i = 0; i < 4; i++) {
		$("<div/>", {
			class: "backDiv",
		});
	};
	normal(".backDiv", "#D1D1FF");
	trace(".backDiv", "#E8E8FF");
};