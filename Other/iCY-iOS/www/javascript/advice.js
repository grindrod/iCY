/*1.  Use standard label on vial.
2.  Use numbers instead of text
3.  Use simple language: e.g., “Take 1 tablet in the morning and in the evening” NOT “Take 1 tablet twice daily”
4.  Use upper and lower case, NOT ALL CAPS
5.  Do NOT tape label.

6.  Patient was able to read standard labels.
7.  Patient was NOT able to read standard label.
8.  Patient was NOT able to read large print label.

9.  Print a duplicate (15/18 point font) label on paper stock using Arial or Verdana font
10. Match duplicate label to vial using a large-print number or colored sticker on both duplicate label and corresponding vial.

11. Patient should be routinely assessed by a family physician or vision specialist

12. Recommend compliance packaging

13. Patient uses large print reading materials at home. 
14. Patient expressed difficulty reading prescription labels.
15. Patient has difficulty reading non-prescription labels.
16. Patient has difficulty reading worn prescription labels. Consider taping label.
17. Patient has difficulty reading glossy papers.
18. Patient has difficulty reading worn prescription labels and glossy papers. Discuss importance of protecting label from wear (e.g., use a weekly pill box).

19. Discuss need for compliance packaging. Decision based pharmacist judgment.

20. Counsel patient on role of medications in low vision.
21. Discuss need for a magnifying glass.
22. Discuss need for a magnifying glass or large print label.*/


var ADVICE = {};
/*ADVICE['standardLabel'] = "Use the standard label (9-12pt font)";
ADVICE['min15pt'] = "Print custom label (15pt font minimum)";
ADVICE['min18pt'] = "Print custom label (18pt font minimum)";
ADVICE['followup'] = "Recommend a follow-up with an optometrist";
ADVICE['compliancePackaging'] = "Use compliance packaging";
ADVICE['noTape'] = "Do not tape";
ADVICE['discuss'] = "Discuss; decision based on judgment of pharmacist";
ADVICE['customCaveat'] = "If custom label does not fit on vial, use standard label on vial and use colour or number coding for the large print label.";*/


ADVICE['standardLabel'] = "Use standard label on vial.";
ADVICE['numbers'] = "Use numbers instead of text";
ADVICE['simpleLang'] = 'Use simple language: e.g., "Take 1 tablet in the morning and in the evening" NOT "Take 1 tablet twice daily"';
ADVICE['notAllCaps'] = "Use upper and lower case, NOT ALL CAPS";
ADVICE['noTape'] = "Do NOT tape label.";
 
ADVICE['ableReadStandard'] = "Patient was able to read standard labels.";
ADVICE['notAbleReadStandard'] = "Patient was NOT able to read standard label.";
ADVICE['notAbleReadLarge'] = "Patient was NOT able to read large print label.";
 
ADVICE['printDuplicate'] = "Print a duplicate (15/18 point font) label on paper stock using Arial or Verdana font.";
ADVICE['matchDuplicate'] = "Match duplicate label to vial using a large-print number or colored sticker on both duplicate label and corresponding vial.";
 
ADVICE['routineAssess'] = "Patient should be routinely assessed by a family physician or vision specialist";
 
ADVICE['compliancePackaging'] = "Recommend compliance packaging";
 
ADVICE['usesLargePrint'] = "Patient uses large print reading materials at home.";
ADVICE['difficultyReadLabels'] = "Patient expressed difficulty reading prescription labels.";
ADVICE['difficultyReadNonPrescription'] = "Patient has difficulty reading non-prescription labels.";
ADVICE['difficultyReadWorn'] = "Patient has difficulty reading worn prescription labels. Consider taping label.";
ADVICE['difficultyReadGlossy'] = "Patient has difficulty reading glossy papers.";
ADVICE['difficultyDiscuss'] = "Patient has difficulty reading worn prescription labels and glossy papers. Discuss importance of protecting label from wear (e.g., use a weekly pill box).";
 
ADVICE['discussCompliance'] = "Discuss need for compliance packaging. Decision based pharmacist judgment.";
 
ADVICE['counsel'] = "Counsel patient on role of medications in low vision.";
ADVICE['discussMagnifying'] = "Discuss need for a magnifying glass.";
ADVICE['discussGlassLargePrint'] = "Discuss need for a magnifying glass or large print label.";




//////////////////////////////////////////////
//				iOS POPOUT MENU				//
//////////////////////////////////////////////

var updateOptions = function (el) {
    var id, state;
    id = el.name;
    
    if ( el.value === "on" ) {          // for checkboxes
        state = $(el).is(':checked');
    }
    else {
        state = el.value;
    }
    //console.log(id + " : " + state);
    
    var optionsSetting = JSON.parse(localStorage.getItem('optionsSetting') );
    optionsSetting[id] = state;
    //console.log(optionsSetting);
    localStorage.setItem('optionsSetting', JSON.stringify(optionsSetting));
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

var loadDefaultOptions = function() {
    var currentDefaultFont, 
        optionsSetting = JSON.parse(localStorage.getItem('optionsSetting') ),
        currentLevel = optionsSetting['instructionSizeLevel'], 
        medPage = optionsSetting['medPage'];

    //console.log(optionsSetting);
    //console.log("medPage: " + medPage);
    //console.log("currentLevel: " + currentLevel);
    //alert('currentLevel: ' + currentLevel);

    if ( currentLevel === '0' ){ currentDefaultFont = '9point'; }
    else if (currentLevel === '1' ){ currentDefaultFont = '12point'; }
    else if (currentLevel === '2' ){ currentDefaultFont = '15point'; }
    
    console.log (currentDefaultFont);
    
    
    $('#' + currentDefaultFont + '_popup').prop("checked", true).checkboxradio("refresh");
    $('#medPage').prop("checked", medPage);
}


//////////////////////////////////////////////
//				ADVICE LOGIC				//
//////////////////////////////////////////////

var analyseResults = function() {
	var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
	var userLevel = localStorage.getItem('userLevel');
	//console.log(userLevel);
	
	if ( userLevel === "9pt" || userLevel === "12pt" ) {
        adviceToUse['ableReadStandard'] = true;
        if (adviceToUse['difficultyReadLabels'] === "qYes" && 
            adviceToUse['discussGlassLargePrint'] === "qYes"){
            adviceToUse['difficultyReadLabels'] = true;
            adviceToUse['discussGlassLargePrint'] = true;
        }
        else {
            adviceToUse['difficultyReadLabels'] = false;
            adviceToUse['discussGlassLargePrint'] = false;
        }
        
        if (adviceToUse['usesLargePrint'] === "qYes"){
            adviceToUse['usesLargePrint'] = true;
        }
        else {
            adviceToUse['usesLargePrint'] = false;
        }
	} 
	else if (userLevel === "15pt" || userLevel === "18pt"){
        adviceToUse['notAbleReadStandard'] = true;
        adviceToUse['printDuplicate'] = true;
        adviceToUse['matchDuplicate'] = true;
        adviceToUse['routineAssess'] = true;
	}
	else if (userLevel === "failed") {
		adviceToUse['notAbleReadLarge'] = true;
        adviceToUse['compliancePackaging'] = true;
        adviceToUse['routineAssess'] = true;
	}
	
	console.log(adviceToUse);
	return adviceToUse;
}

var displayResults = function (adviceToUse){
	//console.log(adviceToUse);
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

$(document).ready(function() {
    document.getElementById('fontOptionsBtn').onclick = popOptions;
    document.ontouchmove = function(event){ event.preventDefault(); }
    
    // POPUP UI SETUP
    var popupHeight = parseInt($('#optionsForm').css('height'), 10);
    popupHeight = popupHeight + popupHeight*0.05 + "px";
    $('#popupSlideWrapper_ios').css('height', popupHeight);
                  
    var popupBottom = parseInt( $('#fontOptionsBtn').css('height') , 10);
    popupBottom = popupBottom + popupBottom*0.3 + "px";
    $('#popupSlideWrapper_ios').css('bottom', popupBottom);
  
    
    loadDefaultOptions();
    $('#popupOptionsForPharmacy').hide();
    //$('.fontRadio').change(fontOption);

    var results = analyseResults();
    displayResults(results);
    
    // POP-UP
    $("input").change( function() {
       updateOptions(this);
    });     
});
