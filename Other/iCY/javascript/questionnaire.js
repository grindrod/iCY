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
	
	$('#done').click(function() {
	  	console.log("done clicked");
		var formData = $('form').serializeArray(); 
  		//console.log( formData );
  		
  		var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
  		console.log(adviceToUse);
  		
  		for (var i in formData){
  			console.log(formData[i].name);
  			
  			if (adviceToUse[6] === false &&  formData[i].value === "on" && 
  				(formData[i].name === "largeprint" || formData[i].name === "prescription" || 
  				formData[i].name === "nonprescription" || formData[i].name === "worn") ){
  				adviceToUse[6] = true;
  			}
  			
  			else if (formData[i].name === "glossy" && formData[i].value === "on") {
  				adviceToUse[5] = true;
  			}
  		}
  		console.log (  JSON.stringify(adviceToUse));
  		
  		localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
  		
  		return false;
	});

	
});