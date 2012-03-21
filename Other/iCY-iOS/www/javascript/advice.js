var ADVICE = new Array (/*0*/ "Use the standard label (9-12pt font)", 
						/*1*/ "Print custom label (15pt font minimum)", 
						/*2*/ "Print custom label (18pt font minimum)", 
						/*3*/ "Recommend a follow-up with an optometrist",
						/*4*/ "Use compliance packaging", 
						/*5*/ "Do not tape", 
						/*6*/ "Discuss; decision based on judgment of pharmacist", 
						/*7*/ "If custom label does not fit on vial, use standard label on vial and use colour or number coding for the large print label.");


/*Waiting for Behzad's response.
$(document).ready(function() {
	$('#popupOptionsForPharmacy').hide();   

});*/

function popOptions(event) {
    console.log('popOptions');
    var popupSection = $('#popupOptionsForPharmacy');
    popupSection.slideToggle();
    
    if ( popupSection.css('display') === 'none' ){
        document.getElementById('advicePage').onclick=null;
    }
    else {
        event.stopImmediatePropagation();
        document.getElementById('advicePage').onclick=closeOptions;
    }
}

function closeOptions() {
    console.log('closeOptions!');
    var popupSection = $('#popupOptionsForPharmacy');
	if(popupSection.css('display') != 'none'){
        console.log('apparently not displayed none?');
        popupSection.slideToggle();
	}
    else {
        console.log('display none!');
    }
}

var deviceOptions = function() {
    if ( navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) ){
        console.log('iPad!');
        document.getElementById('fontOptionsBtn').onclick = popOptions;
    }
    else {
        console.log('Playbook!');
        $('#fontOptionsBtn').attr('data-rel', 'dialog');
        $('#fontOptionsBtn').attr('href', '#pharmacy_options');
        
    }
}

$(document).ready(function() {
    deviceOptions();
    document.ontouchmove = function(event){ event.preventDefault(); }
    
    $('#popupOptionsForPharmacy').hide();   
	var results = analyseResults();
	displayResults(results);
});

var analyseResults = function() {
	var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
	var userLevel = localStorage.getItem('userLevel');
	console.log(userLevel);
	
	if ( userLevel === "9pt" || userLevel === "12pt" ) {
		adviceToUse[0] = true;
	} 
	else if (userLevel === "15pt"){
		adviceToUse[1] = true;
		adviceToUse[7] = true;
	}
	else if (userLevel === "18pt"){
		adviceToUse[2] = true;
		adviceToUse[3] = true;
		adviceToUse[7] = true;
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
	
	for (var i=0; i < adviceToUse.length - 1; i++){
		if (adviceToUse[i] === true) {
			item = '<li>' + ADVICE[i] + '</li>';
			
			if (i == 1 || i === 2) { //custom label caveat
				item += '<ul>' + ADVICE[7] + '</ul>';
			}
			
			$('#adviceList').append(item);
		}
	}
}

function fontOption(e)
{
	localStorage.setItem('instructionSizeLevel', JSON.stringify(e));
	var retrievedObject = localStorage.getItem('instructionSizeLevel');
    console.log(retrievedObject);
}
