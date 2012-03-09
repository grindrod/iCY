var storage = window.localStorage;

document.ontouchmove = function(e){ e.preventDefault(); }

$("#submitAdd").live('click', function () {
	console.log("submitAdd called!");
	var med = $("#med", addMedDialog).val();
	
	if (med != ""){
	    addCheckbox(med);
    	$("#med", addMedDialog).val("");
    }
    $('.ui-dialog').dialog('close');
    
    //$('[data-role="page"]').append('<label for="checkbox-1">Checkbox ' + '</label><input id="checkbox-' + '" name="checkbox-' + '" type="checkbox" />').trigger('create');
});

$("#cancel").live('click', function () {
    $('.ui-dialog').dialog('close');
});


function addCheckbox(name) {
   	var html = '<input type="checkbox" id="'+name+'" value="'+name+'" class="custom" checked="true" /> <label for="'+name+'">'+name+'</label>';
   
	$('#columnb').append(html);
   	$('#choices').trigger('create');
}