var storage = window.localStorage;
var eventType ='click';

document.ontouchmove = function(e){ e.preventDefault(); }

//////////////////////////////////////////////
//				EVENT HANDLERS				//
//////////////////////////////////////////////

// collect, update advice, store data to be sent to the server
function onDone() {
    var formData = $('form').serializeArray();
    var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    var results = JSON.parse( localStorage.getItem('results') );
    var current, 
        prefixAll, 
        prefixSome;
       
    //console.log(formData);
    
    for (var i in formData){
        current = formData[i];
        //console.log("current: " + formData[i].name);
        
        //any conditions
        adviceToUse['abilityAffected'] = true;
        
        if (current.name === "diabetes" || current.name === "hypertension" ||
            current.name === "cognitive impairment" ||
            current.name === "corticosteroids"){
                
                adviceToUse['regularMonitoring'] = true;
                
                if (current.name === "cognitive impairment"){
                    adviceToUse['complianceAids'] = true;
                }
        }
        
        if (current.name !== "eyedrops"){
            if (typeof adviceToUse['abilityAffectedType'] === "undefined"){
                prefixAll = "";
            }
            else {
                prefixAll = adviceToUse['abilityAffectedType'] + ", ";
            }
        
            adviceToUse['abilityAffectedType'] = prefixAll + current.name;
        }
        
        if (current.name === "diabetes" || current.name === "hypertension" ||
            current.name === "cognitive impairment"  || 
            current.name === "corticosteroids" ){
                if (typeof adviceToUse['regularMonitoringType'] === "undefined"){
                    prefixSome = "";
                }
                else {
                    prefixSome = adviceToUse['regularMonitoringType'] + ", ";
                }
                
                adviceToUse['regularMonitoringType'] = prefixSome + current.name;
        }
        
    }
    
   // console.log(adviceToUse);
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
    
    results['history'] = new Array();
    $('input:checkbox').map(function() {
                            results['history'].push({ name: this.name, value: $(this).is(':checked') } )});
 
    localStorage.setItem ('results', JSON.stringify(results) );
    
    $.ajax({
    type: 'POST',
  	url: 'http://morning-light-8582.herokuapp.com/records',
  	data: results,
  	complete: function(jqXHR, textStatus) {
		window.location.href='advice.html';
  	}
	});
    
}

// done button is only active if there is at least one checked checkbox
var listenerForCheckbox = function() {
	$("input[type='checkbox']").change(function(){
    	disableBtn('done', $(':checked').length < 1 );
	});
}

// disables described button
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

// once the new item has been inputted, create checkbox
function addCheckbox(name) {
    var id = name.replace(/\s/g, '');
    
   	var html = '<input type="checkbox" id="'+id+'" name="'+id+'" class="custom" checked="true" /> <label for="'+id+'">'+name+'</label>';
   
	$('#columnb').append(html);
   	$('#choices').trigger('create');
   	disableBtn('done', false );
   	listenerForCheckbox();
}


//////////////////////////////////////////////
//				INITIALIZE                  //
//////////////////////////////////////////////
$(document).ready(function() {
	disableBtn('done', true);
	listenerForCheckbox();

	//////////////////////////////////////////////
	//				MODAL DIALOG				//
	//////////////////////////////////////////////
	$("#submitAdd").live('click', function () {
		//console.log("submitAdd called!");
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
