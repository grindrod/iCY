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
	
	/*
	if (numTimeslots === 1) {
		numTablets = boundedRandomNumber(1, 3);
		randomSlot = Math.floor(Math.random() * timeslots.length);
		tabletTimeslot = timeslots[randomSlot];
		tablet = (numTablets === 1)? "tablet" : "tablets";
		instructionString = "Take " + numTablets + " " + tablet + " at " + tabletTimeslot + ".";
	}
	else {
		instructionString = "Take ";
		var first = true;
		for (var i=0; i < numTimeslots; i++){
			numTablets = boundedRandomNumber(1,2);
			tablet = (numTablets === 1)? "tablet" : "tablets";
			randomSlot = Math.floor(Math.random() * timeslots.length);
			tabletTimeslot = timeslots[randomSlot];
			instructionString = instructionString + numTablets + " " + tablet + " at " + tabletTimeslot;
			if (first === true) {
				instructionString = instructionString + " and ";
				first = false;
			}
			else {
				instructionString = instructionString + ".";
			}
		}	
	}*/
	
	
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
	$("#touchme1, #touchme2, #touchme3, #touchme4, #touchme5, #touchme6").draggable({revert:true});
	$("#drop1, #drop2, #drop3, #drop4").droppable({
    	drop: function( event, ui ) {
        	show(this.id);
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

function show(id){
	var gen_box = document.getElementById(id);
    var gen_box_new = document.createElement('div');
        
    gen_box_new.setAttribute('class', 'droppedBox');
        
    gen_box.appendChild(gen_box_new);
}