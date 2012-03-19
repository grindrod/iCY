//var eventType = 'touchend';

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
var userLevel;

var objectRef1, objectRef2;

var pillCount=100;
var pillIdCount = 200;

var currentObj;

$(document).ready(function() {
	$('#repeatTest').hide();
	
	document.getElementById('breakfast').addEventListener('DOMNodeInserted', onDropAreaChange, true);
	document.getElementById('lunch').addEventListener('DOMNodeInserted', onDropAreaChange, true);
	document.getElementById('dinner').addEventListener('DOMNodeInserted', onDropAreaChange, true);
	document.getElementById('bedtime').addEventListener('DOMNodeInserted', onDropAreaChange, true);
	
	document.getElementById('breakfast').addEventListener('DOMNodeRemoved', onDropAreaChange, true);
	document.getElementById('lunch').addEventListener('DOMNodeRemoved', onDropAreaChange, true);
	document.getElementById('dinner').addEventListener('DOMNodeRemoved', onDropAreaChange, true);
	document.getElementById('bedtime').addEventListener('DOMNodeRemoved', onDropAreaChange, true);
	
    disableBtn('cancel', false);
    disableBtn('largerFontBtn', false);
    disableBtn('done', true);
    
    $('#instructionLabel').text( generateInstruction() );
	
	console.log("instructionSizeLevel: " + instructionSizeLevel);
	if (instructionSizeLevel=== "null"){ 
		console.log('changed to something else');
		instructionSizeLevel = 1; 
	} 
	
	var fontSize = labelOrder[instructionSizeLevel];
	$('#instructionLabel').css('font-size', fontSize)
	userLevel = fontSize;
	localStorage.setItem('userLevel', userLevel);
	console.log("instructionSize: " + labelOrder[instructionSizeLevel]);
    
    /*for (var i in expectedResult) {
		console.log('key is: ' + i + ', value is: ' + expectedResult[i]);
	}*/
	
});


//////////////////////////////////////////////
//				EVENT HANDLERS				//
//////////////////////////////////////////////

function onCancel(event){ 
	window.location = "index.html";
}

function onLargerFontBtn(event) {
	//alert('largerFontBtn clicked');
	console.log('largerFontBtn clicked');
	newLabelAnimation();
}

function onDone(event){
	//alert('done button clicked');
	console.log('done button clicked');
	if (validateContents() === true){ window.location = "patientfinished.html"; }
	else {
		//console.log("=====START ROLLOVER PROCESS [" + labelOrder[instructionSizeLevel] + "] =====");
		repeatTest();
		reset();
	}
}

function onDropAreaChange(event) {
	var total = 0;
	
	for (var i=0; i < TIMESLOTS.length; i++){
		box = document.getElementById( TIMESLOTS[i] );
		total += box.getElementsByTagName('div').length;
	}
	
	disableBtn('done', !(total > 0) );
}

function closeRepeatDone(event) {
	//console.log("close repeat done button [" + labelOrder[instructionSizeLevel] + "]");
	$('#repeatTest').fadeOut('slow', function(){ $('#repeatTest').hide();});
	$('#mainTestBody').fadeIn('slow', function(){ $('#mainTestBody').show();});
	newLabelAnimation();
}

function disableBtn(name, state){
	var btn = $('#'+name);
	
	if (state === true){ 
		//btn.unbind();
		btn.attr('disabled', state);
		document.getElementById(name).ontouchend = null;
	}
	else {
		btn.removeAttr('disabled');
		if (name === 'largerFontBtn') { 
			//btn.bind(eventType, onLargerFontBtn); 
			document.getElementById(name).ontouchend = onLargerFontBtn;
			document.getElementById(name).onclick = onLargerFontBtn;
		} 
		else if (name === 'done'){
			//btn.bind(eventType, onDone);
			document.getElementById(name).ontouchend = onDone;
			document.getElementById(name).onclick = onDone;
		}
		else if (name === 'cancel'){
			document.getElementById(name).ontouchend = onCancel;
			document.getElementById(name).onclick = onCancel;
		}
	}
}


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
		//console.log('timeslot ' + i + ': ' + result[i]);
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
	//console.log("Make it big function [" + labelOrder[instructionSizeLevel] + "]");
	if ( instructionSizeLevel < (labelOrder.length - 1) ) {
		//console.log("changing font size... from " + labelOrder[instructionSizeLevel]);
		instructionSizeLevel++;
		//console.log("changing font size... to " + labelOrder[instructionSizeLevel]);
		
		var fontSize = labelOrder[instructionSizeLevel];
		$('#instructionLabel').css("font-size", fontSize );
		userLevel = fontSize;
		localStorage.setItem('userLevel', userLevel);
		
	
		//console.log ( "font size: " + labelOrder[instructionSizeLevel] + ", " +  $('#instructionLabel').css('font-size'));
	}
	else {
		//console.log ("--MAX-- font size reached");
		userLevel = "failed";
		localStorage.setItem('userLevel', userLevel);
		window.location = "patientfinished.html"; 
		//console.log("GO TO NEXT PAGE!");
	}
}

// Originally from JQuery UI Effects - Slide
var newLabelAnimation = function(){
	//console.log("new label animation [" + labelOrder[instructionSizeLevel] + "]");
	var labelWidth = $('#instructionLabel').outerWidth();
	
	disableBtn('largerFontBtn', true);
	disableBtn('done', true);
	
	$('#instructionLabel').animate( {left: labelWidth }, 3000, function() { 
		makeItBig();
		$('#instructionLabel').css('left', -labelWidth);
		$('#instructionLabel').animate( {left: "0px" }, 3000, function() {
			disableBtn('largerFontBtn', false);
			onDropAreaChange();
			//console.log("=====END ROLLOVER PROCESS [" + labelOrder[instructionSizeLevel] + "]=====");
		});
	});
}

function repeatTest()
{
	if ( instructionSizeLevel === labelOrder.length-1) {				// max size reached
		//console.log("ANIMATION only. [" + labelOrder[instructionSizeLevel] + "]");
		newLabelAnimation();
	}
	else 
	{
		//console.log("REPEAT TEST MESSAGE [" + labelOrder[instructionSizeLevel] + "]");
		$('#mainTestBody').hide();
		var docHeight = $(document).height();
		$('#repeatTest').height(docHeight);
		$('#repeatTest').fadeIn('fast', function(){ $('#repeatTest').show();});
		//$('#repeatTest_done').bind('click', closeRepeatDone);
		//$('#repeatTest_done').bind('touchend', closeRepeatDone);
		document.getElementById('repeatTest_done').ontouchend = closeRepeatDone;
	}
}

//Function that removes everything.
function reset()
{
	var pillContainers = ['pill1Container','pill2Container','pill3Container','pill4Container','pill5Container','pill6Container']
	
	for(var i = 0; i<boxes.length; i++)
	{
		$('#'+boxes[i]).empty();
	}
	
	for(var i = 0; i< pillContainers.length; i++)
	{
		$('#'+pillContainers[i]).empty();
		regeratePill(pillContainers[i]);
	}
	
	
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
        	
			var g = $(ui.draggable).attr('id');
			show($(this).attr("data-row1"), $(this).attr("data-row2"), $('#'+g).parent().attr('id'));
			
        	
        	if($(this).children().last().children().children().first().children().length +
			$(this).children().last().children().children().last().children().length < 5)
			{
        		$(ui.draggable).remove();
        	
        		resizePills($(this).attr("data-row1"), $(this).attr("data-row2"));
        		
        	}
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

function regeratePill(id)
{
	var pillContainer = document.getElementById(id);
	
	var newPill = document.createElement('div');
	var newPillLabel = document.createElement('div');
	
	if($('#'+id).children().length == 0)
	{
		$(newPill).attr('id', 'pill'+id[4]);
		$(newPill).attr('class', 'touchBox');
		
		$(newPillLabel).attr('class','pillLabel');
		$(newPillLabel).text('Pill');
		
		pillContainer.appendChild(newPill);
		newPill.appendChild(newPillLabel);
		
		head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
		$(".touchBox").draggable({revert:true	})
		});
		
		$(currentObj).remove();
	}	

}

//Generates the dropped pills
function show(row1, row2, id){
	var row1 = document.getElementById(row1);
	var row2 = document.getElementById(row2);
	
	
	if(row1.childElementCount < 2)
	{	
		var cell = document.createElement('td');
		var obj = document.createElement('div');
		
    	obj.setAttribute('class', 'droppedBox');
    	obj.setAttribute('data-pillCount', pillCount);
    	obj.setAttribute('id',pillIdCount);
    	obj.setAttribute('data-origin',id);
    	
    	obj.setAttribute('onclick','currentObj = this;');
    	obj.setAttribute('ontouchstart','currentObj = this;');
    	
    	cell.setAttribute('id', pillCount);
    	
    	
    	if(row1.childElementCount == 0)
    	{
    		$(obj).css({'width':'80px', 'height':'80px'});
    		$(obj).css({'margin-left':'20px'});

    	}
    	
    	if(row1.childElementCount == 1)
    	{
    		$(objectRef1).css({'width':'50px', 'height':'50px', 'margin-left':'5px'});
    		$(obj).css({'width':'50px', 'height':'50px','margin-left':'5px'});

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
    	
    	obj.setAttribute('data-origin',id);
    	
    	cell.setAttribute('id', pillCount);
    
    	cell.appendChild(obj);
    	row2.appendChild(cell);
    	
    }
	
	pillCount++;
	pillIdCount++;
	dragOutDroppedPill();
}

//Makes the pills droppable objects. Also, handles the functionality of dropping the pills back 
//from the dropped boxes.

function revivePill()
{
	head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$('.pillOrigin').droppable({
		
		accept: ".droppedBox",
		drop: function( event, ui ) {
        	var get1 = $(currentObj).parent().parent().parent().children().first().attr('id');
        	var get2 = $(currentObj).parent().parent().parent().children().last().attr('id');
        	
			deleteCell();
			resizePills(get1, get2);
			$(this).show();
        	regeratePill($(currentObj).attr('data-origin'));
        	
        	
        	
    	},
    	
    	over: function(event, ui) {
    	},
    	out: function (event, ui){
    		
    	}
	
	});
	});
	
}


//Enabling the dropped pills to become draggable.
function dragOutDroppedPill(e)
{
	head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$(".droppedBox").draggable({revert:true, handle: function(){ 
	revivePill();
	
	}});
	
	});
}

//Deletes the cell from which the current pill is taken.
function deleteCell()
{
	var cell = document.getElementById($(currentObj).attr('data-pillCount'));
	var	parentCell = $(cell).parent().attr('id');
	
	$(cell).remove();
}

//Function responsible for resizing pills as they are dragged out.
function resizePills(id1, id2)
{	
	var one = document.getElementById(id1);
	var two = document.getElementById(id2);
	
	var total = one.childElementCount + two.childElementCount;
	
	if(one.childElementCount == 1 && two.childElementCount == 1)
	{
		console.log("0");
		$('#'+id1).children().children().first().css({'width':'40px', 'height':'40px', 'margin-left':'20px','margin-top':'-5px'});
		$('#'+id1).children().children().last().css({'width':'40px', 'height':'40px', 'margin-left':'40px','margin-top':'-5px'});
		
		$('#'+id2).children().children().first().css({'width':'40px', 'height':'40px', 'margin-left':'20px'});
		$('#'+id2).children().children().last().css({'width':'40px', 'height':'40px', 'margin-left':'40px'});
	}
	else
	{
	
		if(total == 1)
		{
			console.log("1");
			$('#'+id1).children().children().first().css({'width':'80px', 'height':'80px', 'margin-left':'20px'});
			$('#'+id1).children().children().last().css({'width':'80px', 'height':'80px', 'margin-left':'20px'});
			
			$('#'+id2).children().children().first().css({'width':'80px', 'height':'80px', 'margin-left':'20px'});
			$('#'+id2).children().children().last().css({'width':'80px', 'height':'80px', 'margin-left':'20px'});
		}
		
		if(total == 2)
		{
			console.log("2");
			$('#'+id1).children().children().first().css({'width':'40px', 'height':'40px', 'margin-left':'20px','margin-top':'-5px'});
			$('#'+id1).children().children().last().css({'width':'40px', 'height':'40px', 'margin-left':'2px','margin-top':'-5px'});
			
			$('#'+id2).children().children().first().css({'width':'40px', 'height':'40px', 'margin-left':'20px'});
			$('#'+id2).children().children().last().css({'width':'40px', 'height':'40px', 'margin-left':'2px'});
		}
		
		if(total == 3)
		{
			console.log("3");
			if($('#'+id1).children().children().first().attr('id') != $('#'+id1).children().children().last().attr('id'))
			{
				$('#'+id1).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
				$('#'+id1).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'5px'});
				
				$('#'+id2).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'5px'});
				$('#'+id2).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
			}
			else
			{
				$('#'+id1).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
				$('#'+id1).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
				
				$('#'+id2).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
				$('#'+id2).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'5px'});
			}
		}
		
		if(total == 4)
		{
			console.log("4");
			$('#'+id1).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
			$('#'+id1).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'5px', 'margin-top':'-5px'});
			
			$('#'+id2).children().children().first().css({'width':'35px', 'height':'35px', 'margin-left':'20px'});
			$('#'+id2).children().children().last().css({'width':'35px', 'height':'35px', 'margin-left':'5px'});
		}
	}
}