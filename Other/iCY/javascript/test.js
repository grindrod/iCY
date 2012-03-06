var expectedResult = new Array(); 
expectedResult['breakfast'] = 0;
expectedResult['lunch'] = 0;
expectedResult['dinner'] = 0;
expectedResult['bedtime'] = 0;

var storage = window.localStorage;

$(document).ready(function() {
	document.getElementById('cancel').ontouchend = function(){ 
		window.location = "index.html"
	};
	
	document.getElementById('largerFontBtn').ontouchend = makeItBig;
	document.getElementById('largerFontBtn').onclick = makeItBig;
		
	document.getElementById('done').ontouchend = function(){ 
	//document.getElementById('done').onclick = function(){ 
		if (checkContents() === true){ window.location = "patientfinished.html"; }
		else { 
			makeItBig();
			storage.setItem('instructionSize', $('#instructionLabel').css('font-size'));
			window.location.reload();
		}
    };
    
    $('#instructionLabel').text( generateInstruction() );
	
	var instructionSize = storage.getItem('instructionSize');
	$('#instructionLabel').css('font-size', instructionSize)
	console.log("instructionSize: " + instructionSize);
    
    for (var i in expectedResult) {
		console.log('key is: ' + i + ', value is: ' + expectedResult[i]);
	}
});

var boundedRandomNumber = function(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var descendingTime = function(a, b){ 
	var sortOrder = new Array ( "breakfast", "lunch", "dinner", "bedtime");
	return (sortOrder.indexOf(a) < sortOrder.indexOf(b) ? -1 : 1);
}

var generateInstruction = function() {
	var timeslots = new Array ( "breakfast", "lunch", "dinner", "bedtime"),
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
		
		randomSlot = Math.floor(Math.random() * timeslots.length); 
		selectedTimeslots.push( timeslots[randomSlot] ); 
		timeslots.splice(randomSlot, 1);
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

head.js("../javascript/lib/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$(".touchBox").draggable({revert:true});
	$(".dropArea").droppable({
    	drop: function( event, ui ) {
        	//checkContents(this.id);
        	show($(this).attr("data-row1"), $(this).attr("data-row2"));
        	
        	$(ui.draggable).remove();
        	$(this).css({'border':'#777 dashed 3px','background':'#eee', 'width':'125px', 'height':'125px'});
    	},
    	over: function(event, ui) {
        	$(this).css({'border':'#a33 dashed 3px','background':'#faa', 'width':'140px', 'height':'140px'});
    	},
    	out: function (event, ui){
        	$(this).css({'border':'#777 dashed 3px','background':'#eee', 'width':'125px', 'height':'125px'});
    	}
	});
});

function show(row1, row2){
	var row1 = document.getElementById(row1);
	var row2 = document.getElementById(row2);
	
	if(row1.childElementCount < 3)
	{	var cell = document.createElement('td');
		var obj = document.createElement('div');
	
    	obj.setAttribute('class', 'droppedBox');
    
    	cell.appendChild(obj);
    	row1.appendChild(cell);
    }
    else
    {
		var cell = document.createElement('td');
		var obj = document.createElement('div');
	
    	obj.setAttribute('class', 'droppedBox');
    
    	cell.appendChild(obj);
    	row2.appendChild(cell);
    }
	
    
}

function checkContents()
{
	var boxes = ['drop1row1','drop1row2','drop2row1','drop2row2','drop3row1','drop3row2','drop4row1','drop4row2'];
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

function dragOutPill()
{
	
}