var ADVICE = new Array ("Use the standard label (9-12pt font)", 
						"Print a second (large) label", 
						"Colour/Number code", 
						"Recommend a follow-up with an optometrist",
						"Use compliance packaging", 
						"Do not tape", 
						"Discuss; decision based on judgment of pharmacist");


/*Waiting for Behzad's response.
$(document).ready(function() {
	$('#popupOptionsForPharmacy').hide();   

});

function popOptions()
{
	if($('#popupOptionsForPharmacy').css('display') == 'none')
	{
		$('#popupOptionsForPharmacy').fadeIn('fast', function(){ $('#popupOptionsForPharmacy').show(); });
	}
	else
	{
		$('#popupOptionsForPharmacy').fadeOut('fast', function(){ $('#popupOptionsForPharmacy').hide(); });
	}
}

function closeOptions()
{
	if($('#popupOptionsForPharmacy').css('display') != 'none')
	{
		$('#popupOptionsForPharmacy').fadeOut('fast', function(){ $('#popupOptionsForPharmacy').hide(); });
	}
}
*/

$(document).ready(function() {
	var results = analyseResults();
	displayResults(results);
});

var analyseResults = function () {
	var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
	var userLevel = localStorage.getItem('userLevel');
	console.log(userLevel);
	
	if ( userLevel === "9pt" || userLevel === "12pt" ) {
		adviceToUse[0] = true;
	} 
	else if (userLevel === "18pt"){
		adviceToUse[1] = true;
		adviceToUse[2] = true;
		adviceToUse[3] = true;
	}
	else if (userLevel === "failed") {
		adviceToUse[3] = true;
		adviceToUse[4] = true;
	}
	
	console.log(adviceToUse);
	return adviceToUse;
}

var displayResults = function (adviceToUse){
	console.log(adviceToUse);
	var item;
	
	for (var i in adviceToUse){
		if (adviceToUse[i] === true) {
			item = '<li>' + ADVICE[i] + '</li>';
			$('#adviceList').append(item);
		}
	}
}

function fontOption(e)
{
	localStorage.setItem('instructionSizeLevel', JSON.stringify(e));
	//var retrievedObject = localStorage.getItem('instructionSizeLevel');
}
