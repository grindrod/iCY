var expectedResult = new Array(); 
expectedResult['breakfast'] = 0;
expectedResult['lunch'] = 0;
expectedResult['dinner'] = 0;
expectedResult['bedtime'] = 0;
var TIMESLOTS = new Array ("breakfast", "lunch", "dinner", "bedtime" );

var labelOrder = new Array ( "9pt", "12pt", "15pt", "18pt");
var boxes = ['drop1row1','drop1row2','drop2row1','drop2row2','drop3row1','drop3row2','drop4row1','drop4row2'];

var storage = window.localStorage;
var instructionSizeLevel = storage.getItem('instructionSizeLevel');		// from options menu

var objectRef1, objectRef2;

var pillCount=100;
var pillIdCount = 200;

$(document).ready(function() {
	document.getElementById('cancel').ontouchend = function(){ 
		window.location = "index.html"
	};
	
	//document.getElementById('largerFontBtn').ontouchend = function(){
	document.getElementById('largerFontBtn').onclick = function(){
		console.log('largerFontBtn clicked');
		newLabelAnimation();
	};
		
	//document.getElementById('done').ontouchend = function(){ 
	document.getElementById('done').onclick = function(){ 
		if (validateContents() === true){ window.location = "patientfinished.html"; }
		else { 
			newLabelAnimation();
			reset();
		}
    };
    
    $('#instructionLabel').text( generateInstruction() );
	
	if (instructionSizeLevel === null){ instructionSizeLevel = 1; } 
	$('#instructionLabel').css('font-size', labelOrder[instructionSizeLevel] )
	console.log("instructionSize: " + labelOrder[instructionSizeLevel]);
    
    /*for (var i in expectedResult) {
		console.log('key is: ' + i + ', value is: ' + expectedResult[i]);
	}*/
});


//////////////////////////////////////////////
//		PRESCRIPTION LABEL GENERATION		//
//////////////////////////////////////////////
var boundedRandomNumber = function(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var descendingTime = function(a, b){ 
	var sortOrder = new Array ( "breakfast", "lunch", "dinner", "bedtime");
	return (sortOrder.indexOf(a) < sortOrder.indexOf(b) ? -1 : 1);
}

var generateInstruction = function() {
	var originalTimeslots = TIMESLOTS.slice(),
		wordArray = new Array ("no", "one", "two", "three"),
		selectedTimeslots = new Array(),
		tabletArray = new Array(), 
		numTimeslots = boundedRandomNumber(1, 2),
		instructionString = "Take ", 
		randomSlot, 
		numTablets, 
		singular,
		and;
	
	for (var i=0; i < numTimeslots; i++){
		if (numTimeslots === 1) {
			numTablets = boundedRandomNumber(1, 3);
			and = "";
		}
		else {
			numTablets = boundedRandomNumber(1, 2);
			and = " and ";
		}
		tabletArray.push(numTablets);
		
		randomSlot = Math.floor(Math.random() * originalTimeslots.length); 
		selectedTimeslots.push( originalTimeslots[randomSlot] ); 
		originalTimeslots.splice(randomSlot, 1);
	}
	
	selectedTimeslots.sort( descendingTime );
	
	for (var i=0; i < numTimeslots; i++){
		singular = tabletArray[i] === 1? "tablet" : "tablets";
		
		expectedResult[ selectedTimeslots[i] ] = tabletArray[i];
		instructionString += wordArray[ tabletArray[i]] + " " 
						  + singular + " at " + selectedTimeslots[i];
		instructionString += i===0? and : "";
	}
	instructionString += "."
	return instructionString;
}

//////////////////////////////////////////////
//			  TEST VALIDATION  				//
//////////////////////////////////////////////
var validateContents = function(){
	var result = new Array(), 
		box;

	for (var i=0; i < TIMESLOTS.length; i++){
		box = document.getElementById( TIMESLOTS[i] );
		result[ TIMESLOTS[i] ] = box.getElementsByTagName('div').length;
	}
	
	for (var i in result){
		console.log('timeslot ' + i + ': ' + result[i]);
		if ( result[i] != expectedResult[i] ) {
			return false;
		}
	}
	return true;
}

//////////////////////////////////////////////
//				ACTION ON FAILURE			//
//////////////////////////////////////////////
function makeItBig()
{	
	if ( instructionSizeLevel < (labelOrder.length - 1) ) {
		instructionSizeLevel++;
		$('#instructionLabel').css("font-size", labelOrder[instructionSizeLevel] );
	
		console.log ( "font size: " + labelOrder[instructionSizeLevel] + ", " +  $('#instructionLabel').css('font-size'));
	}
	else {
		console.log ("Max font size reached");
		window.location = "patientfinished.html"; 
	}
}

// Originally from JQuery UI Effects - Slide
var newLabelAnimation = function(){
	var labelWidth = $('#instructionLabel').outerWidth();
	
	$('#largerFontBtn').attr('disabled', true);
	$('#done').attr('disabled', true);
	$('#instructionLabel').animate( {left: labelWidth }, 3000, function() { 
		makeItBig();
		$('#instructionLabel').css('left', -labelWidth);
		$('#instructionLabel').animate( {left: "0px" }, 3000, function() {
			$('#largerFontBtn').attr('disabled', false);
			$('#done').attr('disabled', false);
		});
	});
}

//Function that removes everything.
function reset()
{
	for(var i = 0; i<boxes.length; i++)
	{
		$('#'+boxes[i]).empty();
	}
	
	$('.touchBox').css('opacity','0.75');
}



//////////////////////////////////////////////
//			  DRAGGING PILLS  				//
//////////////////////////////////////////////
var anotherArray = ['breakfast', 'lunch', 'dinner', 'bedtime'];


head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$(".touchBox").draggable({revert:true, handle: function(){ 
	$(".dropArea").droppable({accept: ".touchBox"});}});
	$(".dropArea").droppable({
    	
    	drop: function( event, ui ) {
        	//checkContents(this.id);
        	show($(this).attr("data-row1"), $(this).attr("data-row2"));
        	
        	//$(ui.draggable).remove();
        	$(ui.draggable).css({'opacity':'0'});
        	
        	$(this).css({'border':'#777 solid 3px','background':'#eee', 'width':'125px', 'height':'125px'});
    	},
    	
    	over: function(event, ui) {
        	$(this).css({'border':'#a33 solid 3px','background':'#faa', 'width':'140px', 'height':'140px'});
    	},
    	out: function (event, ui){
        	$(this).css({'border':'#777 solid 3px','background':'#eee', 'width':'125px', 'height':'125px'});
    	}
	});
});

var currentObj;

function show(row1, row2){
	var row1 = document.getElementById(row1);
	var row2 = document.getElementById(row2);
	
	
	if(row1.childElementCount < 2)
	{	
		var cell = document.createElement('td');
		var obj = document.createElement('div');
		
    	obj.setAttribute('class', 'droppedBox');
    	obj.setAttribute('data-pillCount', pillCount);
    	obj.setAttribute('id',pillIdCount);
    	
    	obj.setAttribute('onclick','currentObj = this;');
    	obj.setAttribute('ontouchstart','currentObj = this;');
    	
    	cell.setAttribute('id', pillCount);
    	
    	if(row1.childElementCount == 0)
    	{
    		$(obj).css({'width':'80px', 'height':'80px'});
    		$(obj).css({'margin-left':'20px'});

    		objectRef1 = obj;
    	}
    	if(row1.childElementCount == 1)
    	{
    		$(objectRef1).css({'width':'50px', 'height':'50px', 'margin-left':'5px'});
    		$(obj).css({'width':'50px', 'height':'50px','margin-left':'5px'});
    		objectRef2 = obj;
    	}
    	
    
    	cell.appendChild(obj);
    	row1.appendChild(cell);
    }
    else
    {
		var cell = document.createElement('td');
		var obj = document.createElement('div');
	
    	obj.setAttribute('class', 'droppedBox');
    	obj.setAttribute('data-pillCount', pillCount);
    	
    	obj.setAttribute('onclick','currentObj = this;');
    	obj.setAttribute('ontouchstart','currentObj = this;');
    	
    	cell.setAttribute('id', pillCount);
    
    if(row1.childElementCount == 2)
    	{
    		$(objectRef1).css({'width':'35px', 'height':'35px','margin-left':'20px'});
    		$(objectRef2).css({'width':'35px', 'height':'35px','margin-left':'5px'});
    		$(obj).css({'width':'35px', 'height':'35px','margin-left':'20px'});
    	}
    
    	cell.appendChild(obj);
    	row2.appendChild(cell);
    }
	
	pillCount++;
	pillIdCount++;
	dragOutDroppedPill();
	reDrawPills(parentCell)
}

function revivePill()
{
	head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$('.touchBox').droppable({
		accept: ".droppedBox",
		drop: function( event, ui ) {
        	$(this).css({'opacity':'0.75'});
        	console.log($(currentObj).attr('data-pillCount'));
        	$(currentObj).remove();
        	deleteCell();
        	
    	},
    	
    	over: function(event, ui) {
    	},
    	out: function (event, ui){
    		if($(this).css('opacity') != 0)
    		{
    			$(this).css({'opacity':'0.75'});
    		}
    	}
	
	});
	});
	
}


function dragOutDroppedPill()
{
	head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$(".droppedBox").draggable({revert:true, handle: function(){ 
	revivePill();
	
	}});
	
	});
}

var parentCell;

function deleteCell()
{
	var cell = document.getElementById($(currentObj).attr('data-pillCount'));
	parentCell = $(cell).parent().attr('id');
	
	$(cell).remove();
	reDrawPills(parentCell);
}

function reDrawPills(parentCell)
{
	console.log('hello');
	var pCell = $('#' + parentCell);
	
	
	if(pCell.parent().children().first().length === 1 && pCell.parent().children().last().length === 1)
	{
		var urgh = pCell.parent().children().first().children().attr('id');
		$('#'+urgh).css({'width':'50px', 'height':'50px', 'margin-left':'20px'});
		
		var urgh1 = pCell.parent().children().last().children().attr('id');
		$('#'+urgh1).css({'width':'50px', 'height':'50px', 'margin-left':'20px'});
		
	};
	
	if(pCell.children().length === 1)
	{
		var urgh = pCell.children().children().attr('id');
		$('#'+urgh).css({'width':'80px', 'height':'80px', 'margin-left':'20px'});
		
	};
	
}