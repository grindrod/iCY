var storage = window.localStorage;

$("#submitAdd").live('click', function () {
	var med = $("#med", addMedDialog).val();
    //storage.setItem("med", med);
    addCheckbox(med);
    $('.ui-dialog').dialog('close');
    $("#med", addMedDialog).val("");
    
    //$('[data-role="page"]').append('<label for="checkbox-1">Checkbox ' + '</label><input id="checkbox-' + '" name="checkbox-' + '" type="checkbox" />').trigger('create');
});


function addCheckbox(name) {
   	var html = '<input type="checkbox" id="'+name+'" value="'+name+'" class="custom" checked="true" /> <label for="'+name+'">'+name+'</label>';
   
	$('#columnb').append(html);
   	$('#choices').trigger('create');
}