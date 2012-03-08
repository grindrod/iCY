var expectedResult = new Array(); 
expectedResult['breakfast'] = 0;
expectedResult['lunch'] = 0;
expectedResult['dinner'] = 0;
expectedResult['bedtime'] = 0;

var storage = window.localStorage;

var objectRef1, objectRef2;

var pillCount=100;
var pillIdCount = 200;

$(document).ready(function() {
	document.getElementById('cancel').ontouchend = function(){ 
		window.location = "index.html"
	};
	
	document.getElementById('largerFontBtn').ontouchend = makeItBig;
	document.getElementById('largerFontBtn').onclick = makeItBig;
		
	document.getElementById('done').ontouchend = function(){ 
		if (checkContents() === true){ window.location = "patientfinished.html"; }
		else { 
			storage.setItem('instructionSize', $('#instructionLabel').css('font-size'));
			window.location.reload();
		}
    };
    
    /*document.getElementById('restart').ontouchend = function(){
    	var currentString = document.getElementById('instructionLabel').innerHTML;
		storage.setItem("instructionString", currentString);
		window.location.reload();
    };*/
    
    var storageInstruction = storage.getItem('instructionString');
    if (storageInstruction === null){ generateInstruction(); } 
	else { document.getElementById('instructionLabel').innerHTML = storageInstruction; }
	
	var instructionSize = storage.getItem('instructionSize');
	if (instructionSize != null){
		$('#instructionLabel').css("font-size", instructionSize + "pt");
	}
    
    for (var i in expectedResult) {
		console.log('key is: ' + i + ', value is: ' + expectedResult[i]);
	}
});

var boundedRandomNumber = function(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var generateInstruction = function() {
	var timeslots = new Array ( "breakfast", "lunch", "dinner", "bedtime" );
	var numTimeslots = boundedRandomNumber(1, 2);
	var instructionString;
	var numTablets;
	var randomSlot;
	var tablet;
	
	instructionString = "Take ";
	var first = true;
	var previousTime = -1;
	for (var i=0; i < numTimeslots; i++){
		if (numTimeslots === 1) { 
			numTablets = boundedRandomNumber(1,3);
			first = false;
		}
		else { numTablets = boundedRandomNumber(1,2); }
		
		do { 
			randomSlot = Math.floor(Math.random() * timeslots.length); 
		} while (previousTime === randomSlot)
		previousTime = randomSlot;
		tabletTimeslot = timeslots[randomSlot];
		expectedResult[tabletTimeslot] = numTablets;
		
		tablet = (numTablets === 1)? "tablet" : "tablets";
		
		instructionString = instructionString + numTablets + " " + tablet + " at " + tabletTimeslot;
		
		if (first === true) {
			instructionString = instructionString + " and ";
			first = false;
		}
		else { instructionString = instructionString + "."; }
	}
	
	document.getElementById('instructionLabel').innerHTML=instructionString;
}

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

var boxes = ['drop1row1','drop1row2','drop2row1','drop2row2','drop3row1','drop3row2','drop4row1','drop4row2'];

function checkContents()
{
	var pillTimes = ['breakfast', 'lunch', 'dinner', 'bedtime'];
	var count1 = 0;
	var count2;
	var total = 0;
	var success = false;
	
	for(count2 = 1; count2 < boxes.length +1; count2++)
	{
		var tmpElement = document.getElementById(boxes[count2 - 1]);
				
		total += tmpElement.childElementCount;
		
		if(count2 % 2 == 0)
		{
			if(expectedResult[pillTimes[count1]] != 0)
			{
				
				if(total == expectedResult[pillTimes[count1]])
				{
					console.log(pillTimes[count1] + ' Correct!');
					success = true;
				}
				else
				{
					console.log(pillTimes[count1] + ' Wrong! ');
				}
			}
			
			total = 0;
			count1 = count1+1;
		}
	}
	return success; 


}

function makeItBig()
{
	var labelSize = parseInt($('#instructionLabel').css('font-size'));
	console.log ("original Label size: " + labelSize);
	if (labelSize < 30) { labelSize++; }
	else { alert("Max font size reached"); }
	console.log ("modified Label size: " + labelSize);
	$('#instructionLabel').css("font-size", labelSize + "px");
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