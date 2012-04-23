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
    var formData = $('form').serializeArray();
    var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    var results = JSON.parse( localStorage.getItem('results') );
    var current;
    
    console.log(formData);
    
    for (var i in formData){
        current = formData[i];
        console.log("current: " + formData[i].name);
        
        if (current.name === "corticosteriods" || current.name === "anticholinergics"){
            adviceToUse['counsel'] = true; 
        }
        else if (current.name === "hypertension" || current.name === "glaucoma" || 
                 current.name === "cataracts"){
            adviceToUse['routineAssess'] = true;
        }
        else if (current.name === "diabetes" || current.name === "macular degeneration"){
            adviceToUse['routineAssess'] = true;
            adviceToUse['routineAssessDisease'] = current.name;
            
        }
    }
    
    console.log(adviceToUse);
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
    
    results['medications'] = new Array();
    $('input:checkbox').map(function() {
                            results['medications'].push({ name: this.name, value: $(this).is(':checked') } )});
    localStorage.setItem ('results', JSON.stringify(results) );
    console.log(results);
    
	window.location.href='advice.html';
}

var listenerForCheckbox = function() {
	$("input[type='checkbox']").change(function(){
    	disableBtn('done', $(':checked').length < 1 );
	});
}


function disableBtn(btn, state){
	//console.log('btn disabled: ' + state);
	var $btn = $('#'+btn);
    
    if ($btn.is(':disabled') === state){ return; }
    
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
    var id = name.replace(/\s/g, '');
    
   	var html = '<input type="checkbox" id="'+id+'" name="'+id+'" class="custom" checked="true" /> <label for="'+id+'">'+name+'</label>';
   
	$('#columnb').append(html);
   	$('#choices').trigger('create');
   	disableBtn('done', false );
   	listenerForCheckbox();
}