var ADVICE = {};

ADVICE['ableReadStandard'] = { type: "read", 
                               color: "green", 
                               string: "Patient was able to read standard labels" };
ADVICE['notAbleReadStandard'] = {type: "read", 
                                color: "red", 
                                string: "Patient was NOT able to read standard label" };
ADVICE['notAbleReadLarge'] = {type: "read", 
                            color: "red", 
                            string: "Patient was NOT able to read large print label" };

ADVICE['standardLabel'] = {type: "standard", 
                            string: "Use standard label on vial" };
ADVICE['numbers'] = {type: "standard" , 
                    string: "Use numbers instead of text" };
ADVICE['simpleLang'] = {type: "standard", 
                        string: 'Use simple language: e.g., "Take 1 tablet in the morning and in the evening" NOT "Take 1 tablet twice daily"' };
ADVICE['notAllCaps'] = {type: "standard", 
                        string: "Use upper and lower case, NOT ALL CAPS" };
ADVICE['noTape'] = {type: "discussion", 
                    string: "Do NOT tape label" };
 
ADVICE['printDuplicate'] = {type: "discussion", 
                            string: "Print a duplicate (15/18 point font) label on paper stock using Arial or Verdana font" };
ADVICE['matchDuplicate'] = {type: "discussion", 
                            string: "Match duplicate label to vial using a large-print number or colored sticker on both duplicate label and corresponding vial" };
 
ADVICE['routineAssess'] = {type: "discussion", 
                            string: "Patient should be routinely assessed by a family physician or vision specialist" };
ADVICE['routineAssessDisease'] = {type: "none" };
 
ADVICE['compliancePackaging'] = {type: "discussion", 
                                string: "Recommend compliance packaging" };
 
ADVICE['usesLargePrint'] = {type: "discussion", 
                            string: "Patient uses large print reading materials at home" };
ADVICE['difficultyReadLabels'] = {type: "discussion", 
                                string: "Patient expressed difficulty reading prescription labels" };
ADVICE['difficultyReadNonPrescription'] = {type: "discussion", 
                                            string: "Patient has difficulty reading non-prescription labels" };
ADVICE['difficultyReadWorn'] = {type: "discussion", 
                                string: "Patient has difficulty reading worn prescription labels. Consider taping label" };
ADVICE['difficultyReadGlossy'] = {type: "discussion", 
                                string: "Patient has difficulty reading glossy papers" };
ADVICE['difficultyDiscuss'] = {type: "discussion", 
                            string: "Patient has difficulty reading worn prescription labels and glossy papers. Discuss importance of protecting label from wear (e.g., use a weekly pill box)" };
 
ADVICE['discussCompliance'] = {type: "discussion", 
                                string: "Discuss need for compliance packaging. Decision based pharmacist judgment" };
ADVICE['counsel'] = {type: "discussion", 
                    string: "Counsel patient on role of medications in low vision" };
ADVICE['discussMagnifying'] = {type: "discussion", 
                                string: "Discuss need for a magnifying glass" };
ADVICE['discussGlassLargePrint'] = {type: "discussion", 
                                    string: "Discuss need for a magnifying glass or large print label" };

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
    console.log("medPage: " + medPage);
    //console.log("currentLevel: " + currentLevel);
    //alert('currentLevel: ' + currentLevel);

    if ( currentLevel === '0' ){ currentDefaultFont = '9point'; }
    else if (currentLevel === '1' ){ currentDefaultFont = '12point'; }
    else if (currentLevel === '2' ){ currentDefaultFont = '15point'; }
    
    console.log ("currentDefaultFont: " + currentDefaultFont);
    
    
    $('#' + currentDefaultFont + '_popup').prop("checked", true).checkboxradio("refresh");
    $('#medPage').prop("checked", medPage).checkboxradio("refresh");
}


//////////////////////////////////////////////
//				ADVICE LOGIC				//
//////////////////////////////////////////////

var analyseResults = function() {
	var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    var results = JSON.parse( localStorage.getItem('results') );
	var userLevel = results['test']['userFont'];
	console.log("userLevel: " + userLevel);
	
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
        console.log(ADVICE[i]);
        if (ADVICE[i].type === "read" && adviceToUse[i]){
            $('#colouredRead').css('color', ADVICE[i].color);
            $('#colouredRead').append(ADVICE[i].string);
        }
        
        else if (ADVICE[i].type === "standard" && adviceToUse[i]){
            item = '<li>' + ADVICE[i].string + '</li>';
            $('#standardList').append(item);
        }
        
        else if (ADVICE[i].type === "discussion" && adviceToUse[i]){
            if (i === "routineAssess" && adviceToUse[i] &&
                (typeof adviceToUse['routineAssessDisease'] !== "undefined") ){
                ADVICE[i].string = ADVICE[i].string + " for " + adviceToUse['routineAssessDisease'];
            }
            
            item = '<li>' + ADVICE[i].string + '</li>';
            $('#discussionList').append(item);
        }
    }
}

function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }
    
    return zeroString+n;
}

//////////////////////////////////////////////
//				INITIALIZE                  //
//////////////////////////////////////////////

$(document).ready(function() {
    var results = JSON.parse( localStorage.getItem('results') );
    results['userID'] = results['userID'] + 1;
    document.getElementById('userSection').innerHTML = "User ID: " + zeroPad(results['userID'], 5);
    localStorage.setItem ('results', JSON.stringify(results) );
                  
    document.getElementById('fontOptionsBtn').onclick = popOptions;
    //document.ontouchmove = function(event){ event.preventDefault(); }
    
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

    var adviceResults = analyseResults();
    displayResults(adviceResults);
                
      
    // SET Discussion list
    var btnTop = $('#cancel').offset().top;
    var discussionListTop = $('#discussionList').offset().top;
    var discussionListHeight = (btnTop - discussionListTop) * (83/100);
    $('#discussionList').css('height', discussionListHeight +"px");
                  
    
    var results = JSON.parse( localStorage.getItem('results') );
    results['advice'] = new Array();
    for (var i in adviceResults){
        if (adviceResults[i]){
                  results['advice'].push( { name: i, string: ADVICE[i] } );
        }
    }
    //console.log(results);
    
    // POP-UP
    $("input").change( function() {
       updateOptions(this);
    });     
});
