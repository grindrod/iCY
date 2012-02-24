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
    
    //generateInstruction();
});

var generateInstruction = function() {
	var randomnumber=Math.floor(Math.random()*11);
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