$(document).ready(function() {
	$('.modalMessage').hide();
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
			
			var text;
			if ( $(this).name === 'magnifier') {
				text = "If you have it with you, you may use it.";
			} 
			else { // glasses or bifocals
				text = "If you have them with you, please put them on.";
			}
			showMessage(text); 
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
  		
  		if (window.location.href.search(/questionnaire1.html/) > 0){
  			window.location.href = 'questionnaire2.html';
  		}
  		else {
  			window.location.href= 'test.html';
  		}
  		return false;
	});
});

var showMessage = function(text) {
	if($('.modalMessage').css('display') == "none")
	{
		$('#mainSection').hide();
		var docHeight = $(document).height();
		$('.modalMessage').height(docHeight);
		$('#modalMessage_text').html(text); 
		$('.modalMessage').fadeIn('slow', function(){ $('.modalMessage').show();});
	}
}

var closeMessage = function() {
	$('.modalMessage').fadeOut('slow', function(){ $('.modalMessage').hide();});
	$('#mainSection').fadeIn('slow', function(){ $('#mainSection').show();});
}