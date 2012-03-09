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

function fontOption(e)
{
	localStorage.setItem('fontSizeOption', JSON.stringify(e));
	//var retrievedObject = localStorage.getItem('fontSizeOption');
}