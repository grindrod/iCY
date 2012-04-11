var ADVICE = {};
ADVICE['standardLabel'] = "Use the standard label (9-12pt font)";
ADVICE['min15pt'] = "Print custom label (15pt font minimum)";
ADVICE['min18pt'] = "Print custom label (18pt font minimum)";
ADVICE['followup'] = "Recommend a follow-up with an optometrist";
ADVICE['compliancePackaging'] = "Use compliance packaging";
ADVICE['noTape'] = "Do not tape";
ADVICE['discuss'] = "Discuss; decision based on judgment of pharmacist";
ADVICE['customCaveat'] = "If custom label does not fit on vial, use standard label on vial and use colour or number coding for the large print label.";

//////////////////////////////////////////////
//				iOS POPOUT MENU				//
//////////////////////////////////////////////

function fontOption() {
    var newFontLevel = this.value;
    console.log('newFontLevel: ' + newFontLevel);
    localStorage.setItem('instructionSizeLevel', newFontLevel);
    
	//var retrievedObject = localStorage.getItem('instructionSizeLevel');
    //console.log(retrievedObject);
    //alert('retrieved: ' + retrievedObject);*/

}

function popOptions(event) {
    var popupSection = $('#popupOptionsForPharmacy');
    
    if ( popupSection.css('display') === 'none' ) {
        $('#popupOverlay').css('display', 'block');	
        popupSection.slideToggle();
        event.stopImmediatePropagation();
        document.getElementById('popupOptionsForPharmacy').onclick=null;
        document.getElementById('popupOverlay').onclick=closeOptions;
    }
    else {      // popup current being displayed
        closeOptions();
    }
     
     
     
}

function closeOptions() {
    var popupSection = $('#popupOptionsForPharmacy');
	if(popupSection.css('display') != 'none'){
        popupSection.slideToggle();
        $('#popupOverlay').css('display', 'none');
        document.getElementById('popupOverlay').onclick=null;
    }
}

var loadCurrentDefaultFont = function(device) {
    var currentDefaultFont, 
        currentLevel = localStorage.getItem('instructionSizeLevel');
    
    console.log('currentLevel: ' + currentLevel);
    //alert('currentLevel: ' + currentLevel);

    if ( currentLevel === '0' ){ currentDefaultFont = '9point'; }
    else if (currentLevel === '1' ){ currentDefaultFont = '12point'; }
    else if (currentLevel === '2' ){ currentDefaultFont = '15point'; }
    
    console.log (currentDefaultFont);
    
    
    $('#' + currentDefaultFont + '_popup').prop("checked", true).checkboxradio("refresh");
    $('#medPage').prop("checked", includeMed).checkboxradio("refresh");
}


//////////////////////////////////////////////
//				ADVICE LOGIC				//
//////////////////////////////////////////////

var analyseResults = function() {
	var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
	var userLevel = localStorage.getItem('userLevel');
	//console.log(userLevel);
	
	if ( userLevel === "9pt" || userLevel === "12pt" ) {
		adviceToUse['standardLabel'] = true;
	} 
	else if (userLevel === "15pt"){
		adviceToUse['min15pt'] = true;
	}
	else if (userLevel === "18pt"){
		adviceToUse['min18pt'] = true;
		adviceToUse['followup'] = true;
	}
	else if (userLevel === "failed") {
		adviceToUse['followup'] = true;
		adviceToUse['compliancePackaging'] = true;
	}
	
	console.log(adviceToUse);
	return adviceToUse;
}

var displayResults = function (adviceToUse){
	console.log(adviceToUse);
	var item;
    
    for (var i in adviceToUse){
        if (adviceToUse[i] === true){
            item = '<li>' + ADVICE[i] + '</li>';
            
			if (i == 'min15pt' || i === 'min18pt') { //custom label caveat
				item += '<ul>' + ADVICE['customCaveat'] + '</ul>';
			}
			
			$('#adviceList').append(item);
        }
    }
}


//////////////////////////////////////////////
//				INITIALIZE                  //
//////////////////////////////////////////////

var deviceOptions = function() {
    var iPadTest = true; 
    
    //document.getElementById('fontOptionsBtn').onclick = popOptions;
    
    if ( iPadTest || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) ){
        console.log('iPad!');
        document.getElementById('fontOptionsBtn').onclick = popOptions;
        loadCurrentDefaultFont('ipad');
    }
    else {
        console.log('Playbook!');
        $('#fontOptionsBtn').attr('data-rel', 'dialog');
        $('#fontOptionsBtn').attr('href', '#pharmacyOptions_playbook');
        loadCurrentDefaultFont('playbook');
    }
}

$(document).ready(function() {
    deviceOptions();
    document.ontouchmove = function(event){ event.preventDefault(); }
  
    $('#popupOptionsForPharmacy').hide();
    $('.fontRadio').change(fontOption);

    var results = analyseResults();
    displayResults(results);
});
