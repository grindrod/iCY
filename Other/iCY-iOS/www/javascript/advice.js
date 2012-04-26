var ADVICE = {};

// RESULTS
ADVICE['ableReadStandard'] = { type: "read", 
                               color: "green", 
                               string: "Patient was able to read standard labels" };
ADVICE['notAbleReadStandard'] = {type: "read", 
                                color: "red", 
                                string: "Patient was NOT able to read standard label" };
ADVICE['notAbleReadLarge'] = {type: "read", 
                            color: "red", 
                            string: "Patient was NOT able to read large print label" };

// LABELLING
ADVICE['compliancePackaging'] = {type: "labelling", 
    string: "Compliance packaging recommended" };
ADVICE['regularLabelling'] = {type: "labelling", string: "Use regular label on vial" };
ADVICE['duplicate15pt'] = {type: "labellng", string: "Print duplicate paper label in 15-point font (Arial or Verdana)" };
ADVICE['duplicate18pt'] = {type: "labelling", string: "Print duplicate paper label in 18-point font (Arial or Verdana)" } ;
ADVICE['matchDuplicate'] = {type: "labelling", string: "Match duplicate label to vial with large-print numbers or colored stickers" };
ADVICE['noTape'] = {type: "labelling", string: "Do NOT tape labels" };
ADVICE['numbers'] = {type: "labelling", string: "ALWAYS use numbers instead of text" };
ADVICE['simpleLang'] = {type: "labelling", string: 'ALWAYS use simple language: e.g., "Take 1 tablet in the morning and in the evening" NOT "Take 1 tablet twice daily"'};
ADVICE['noAllCaps'] = {type: "labelling", string: "ALWAYS use upper and lower case, NOT ALL CAPS" };

//TALK TO PATIENT ABOUT: DISCUSS
ADVICE['difficultyReading'] = {type: "discuss", string: "Difficulty reading [types] labels" };
ADVICE['difficultyReadingType'] = {type: "none" };
ADVICE['needAid'] = {type: "discuss", string: "When they need [types]" };
ADVICE['needAidType'] = {type: "none" };
ADVICE['abilityAffected'] = {type: "discuss", string: "How [types] may affect their ability to read or understand labels" };
ADVICE['abilityAffectedType'] = {type: "none" };

//PATIENT LIKELY NEEDS 
ADVICE['complianceAids'] = {type: "needs", string: "Compliance aids (e.g., dosing calendars, diaries, charts, dose reminders)" };
ADVICE['protectFromWear'] = {type: "needs", string: "To protect labels from wear (e.g., using a daily or weekly pill box)" };
ADVICE['followUp'] = {type: "needs", string: "Follow-up with a physician for further assessment" };
ADVICE['regularMonitoring'] = {type: "needs", string: "Regular monitoring by a physician or vision specialist [types]" };
ADVICE['regularMonitoringType'] = {type: "none" };
ADVICE['magnifyingGlass'] = {type: "needs", string: "A magnifying glass to read prescription/non-prescription labels." };


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
	
	if ( userLevel === "9pt" || userLevel === "12pt" ||
        userLevel === "15pt" || userLevel === "18pt") {
        adviceToUse['ableReadStandard'] = true;
        adviceToUse['regularLabelling'] = true;
        
        if (userLevel === "15pt") {
            adviceToUse['notAbleReadStandard'] = true;
            adviceToUse['duplicate15pt'] = true;
            adviceToUse['matchDuplicate'] = true;
        }
        else if (userLevel === "18pt") {
            adviceToUse['notAbleReadStandard'] = true;
            adviceToUse['duplicate18pt'] = true;
            adviceToUse['matchDuplicate'] = true;
        }
	} 
	else if (userLevel === "failed") {
        adviceToUse['noTape'] = false;
        adviceToUse['numbers'] = false;
        adviceToUse['simpleLang'] = false;
        adviceToUse['noAllCaps'] = false;
        
        adviceToUse['notAbleReadLarge'] = true;
        adviceToUse['compliancePackaging'] = true;
        adviceToUse['followUp'] = true;
	}
    
    if (adviceToUse['difficultyReading'] === "qYes" ||
        adviceToUse['regularMonitoring'] === "qYes" ){
        if (userLevel === "9pt" || userLevel === "12pt"){
            adviceToUse['difficultyReading'] = true;
            adviceToUse['regularMonitoring'] = true;
        }
        else { 
            adviceToUse['difficultyReading'] = false;
            adviceToUse['regularMonitoring'] = false;
        }
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
        
        else if (ADVICE[i].type === "labelling" && adviceToUse[i]){
            item = '<li>' + ADVICE[i].string + '</li>';
            $('#labellingList').append(item);
        }
        
        else if (ADVICE[i].type === "discuss" && adviceToUse[i]){
            if ((i === "difficultyReading"  || i === "needAid"  ||
                i === "abilityAffected") && adviceToUse[i] &&
                (typeof adviceToUse[i + 'Type'] !== "undefined") ){
                console.log("NOT EMPTY! " + adviceToUse[i+'Type']);
                
                ADVICE[i].string = ADVICE[i].string.replace("[types]", adviceToUse[i+'Type']);
                console.log(ADVICE[i].string);
            }
            
            item = '<li>' + ADVICE[i].string + '</li>';
            $('#discussList').append(item);
        }
        
        else if (ADVICE[i].type === "needs" && adviceToUse[i]){
            if (i === "regularMonitoring" && adviceToUse[i] &&
                (typeof adviceToUse[i + 'Type'] !== "undefined") ){
                console.log("NOT EMPTY! " + adviceToUse[i+'Type']);
                
                ADVICE[i].string = ADVICE[i].string.replace("[types]", "for " + adviceToUse[i+'Type']);
                console.log(ADVICE[i].string);
            }
            
            item = '<li>' + ADVICE[i].string + '</li>';
            $('#needsList').append(item);
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
                  
    //ONLY FOR PILOT APP, TO BE REMOVED IN FINAL VERSION
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
    /*var btnTop = $('#cancel').offset().top;
    var discussionListTop = $('#discussList').offset().top;
    var discussionListHeight = (btnTop - discussionListTop) * (83/100);
    $('#discussList').css('height', discussionListHeight +"px");
      */            
    
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
