var expectedResult = new Array(); 
expectedResult['breakfast'] = 0;
expectedResult['lunch'] = 0;
expectedResult['dinner'] = 0;
expectedResult['bedtime'] = 0;

$(document).ready(function() {
	document.getElementById('start').ontouchend=function(){ window.location = "index.html"};
	
	document.getElementById('largerFontBtn').ontouchend=function(){
		var labelSize = parseInt($('#instructionLabel').css('font-size'));
		console.log ("original Label size: " + labelSize);
		labelSize++; 
		console.log ("modified Label size: " + labelSize);
		$('#instructionLabel').css("font-size", labelSize + "pt");
	};
		
	document.getElementById('done').ontouchend=function(){ 
        			alert("still needs validation. Continuing..."); 
        			window.location = "patientfinished.html"
    };
    
    generateInstruction();
    
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

head.js("https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js","../javascript/ui.js","../javascript/touch.js", function (){
	$(".touchBox").draggable({revert:true});
	$(".dropArea").droppable({
    	drop: function( event, ui ) {
        	//checkContents(this.id);
        	show($(this).attr("data-row1"), $(this).attr("data-row2"));
        	
        	$(ui.draggable).remove();
        	$(this).css({'border':'#777 dashed 3px','background':'#eee'});
    	},
    	over: function(event, ui) {
        	$(this).css({'border':'#a33 dashed 3px','background':'#faa'});
    	},
    	out: function (event, ui){
        	$(this).css({'border':'#777 dashed 3px','background':'#eee'});
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

function checkContents(id)
{
	var box = document.getElementById(id);
	if(box.childElementCount > 2)
	{
		alert('STOPP YOUUU!!!');
	}
	else
	{
		show(id);
	}
}