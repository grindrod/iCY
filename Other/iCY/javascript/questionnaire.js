$(document).ready(function() {
	$('#glassesnowContainer').hide();
	$('#bifocalsnowContainer').hide();
	$('#magnifiernowContainer').hide();
    
     $("#glasses, #bifocals, #magnifier").bind( "change", function(event, ui) {
     	var state = $(this).is(':checked');
  		var nowName = this.name + "now";
  		var nowNameContainer = $('#' + nowName + "Container");
  		
  		if (state === true) { 
  			nowNameContainer.slideDown();
			$('#aidsUsed').trigger( 'updatelayout' );
  		}
  		else {
  			nowNameContainer.slideUp();
  			$('#' + nowName).prop("checked", false).checkboxradio('refresh');
			$('#aidsUsed').trigger( 'updatelayout' );
  		}

		
	});
	
});