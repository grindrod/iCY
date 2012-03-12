var storage = window.localStorage;
var eventType ='click';

document.ontouchmove = function(e){ e.preventDefault(); }


$(document).ready(function() {
	disableBtn('done', true);
	listenerForCheckbox();
	
	//////////////////////////////////////////////
	//				MODAL DIALOG				//
	//////////////////////////////////////////////
	$("#submitAdd").live('click', function () {
		console.log("submitAdd called!");
		var med = $("#med", addMedDialog).val();
	
		if (med != ""){
		    addCheckbox(med);
    		$("#med", addMedDialog).val("");
	    }
	    $('.ui-dialog').dialog('close');
    });

	$("#cancel").live('click', function () {
    	$('.ui-dialog').dialog('close');
	});
	
});


//////////////////////////////////////////////
//				EVENT HANDLERS				//
//////////////////////////////////////////////
function onDone() {
	window.location.href='advice.html';
}

var listenerForCheckbox = function() {
	$("input[type='checkbox']").change(function(){
    	disableBtn('done', $(':checked').length < 1 );
	});
}


function disableBtn(btn, state){
	console.log('btn disabled: ' + state);
	var $btn = $('#'+btn);
	$btn.attr('disabled', state);
	//$btn.addClass('btnDisabled');
	
	if (state === true){ 
		$btn.unbind('toggle').unbind(eventType); 
	}
	else {
		$btn.bind(eventType, onDone);
	}
}


//////////////////////////////////////////////
//				MODAL DIALOG				//
//////////////////////////////////////////////
function addCheckbox(name) {
   	var html = '<input type="checkbox" id="'+name+'" value="'+name+'" class="custom" checked="true" /> <label for="'+name+'">'+name+'</label>';
   
	$('#columnb').append(html);
   	$('#choices').trigger('create');
   	disableBtn('done', false );
   	listenerForCheckbox();
}