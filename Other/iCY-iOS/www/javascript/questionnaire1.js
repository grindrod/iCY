//////////////////////////////////
//          MODAL DIALOG        //
//////////////////////////////////
var showMessage = function(text, messageClass, yesHandler, noHandler) {
    //console.log("SHOW MESSAGE");
    
    $('#mainSection').hide();
	var docHeight = $(document).height();
	$('.modalMessage').height(docHeight);
    $('#modalMessage_text').hide(); 
    
    var yesText;
    var noText;
    if (messageClass == "yesNo"){
        yesText = "YES";
        noText = "NO";
        document.getElementById('modalMessage_done').innerHTML=yesText;
        document.getElementById('modalMessage_cancel').innerHTML=noText;
        document.getElementById('modalMessage_done').onclick=yesHandler;
        document.getElementById('modalMessage_cancel').onclick=noHandler;
        $('#modalMessage_cancel').show();
        $('#modalMessage_done').show();
    }
    else if (messageClass == "okOnly"){
        yesText = "OK";
        document.getElementById('modalMessage_ok').innerHTML=yesText;
        document.getElementById('modalMessage_ok').onclick=yesHandler;  //change to redirect to index
        $('#modalMessage_cancel').hide();
        $('#modalMessage_done').hide();
        $('#modalMessage_ok').show();
    }
    
    $('#modalMessage_text').html(text);
	$('#modalMessage_text').fadeIn('slow', function(){ $('#modalMessage_text').show();});
    $('.modalMessage').fadeIn('slow', function(){ $('.modalMessage').show();});
    
    //Set ok and cancel buttons on modal dialog
    midMessageBoxWidth = $('#messageBox').width()/2;
    $('#modalMessage_done').css('left', (midMessageBoxWidth - $('#modalMessage_done').outerWidth())*(98/100) );
    $('#modalMessage_cancel').css('left', midMessageBoxWidth*(102/100));
    $('#modalMessage_ok').css('left', midMessageBoxWidth - $('#modalMessage_ok').outerWidth()/2);
}

// generates text based on the checkbox clicked for the first part of modal dialog
var aidsCheck = function (aid){
    var text; 
    console.log("aid: " + aid);
    if (aid === "glasses"){
        $('#modalMessage_cancel').addClass('glassesCheck');
        //text = "Are you wearing them now?";
        text = "Are you wearing your glasses, contact lenses, bifocals or reading glasses?";
        showMessage(text, "yesNo", closeModalDialog, appExplain);
    }
    else if (aid === "magnifier"){
        $('#modalMessage_cancel').addClass('magnifierCheck');
        text = "Are you using your magnifier now?";
        showMessage(text, "yesNo", closeModalDialog, appExplain);
    }
    else if (aid === "helpWithMed"){
        $('#modalMessage_cancel').addClass('helpCheck');
        text = "Is the person who helps you here now? If yes, they can help you complete the test."
        showMessage(text, "okOnly", closeModalDialog, null);
    }
}

// generates secondary text for the second part of the modal dialog
function appExplain(event) {
    var text;
    var okHandler; 
    
    if (this.className.search(/glassesCheck/) >= 0){
        text = "This app is checking how you read medication labels. Please wait until you have your glasses, contact lenses, bifocals or reading glasses to try the app.";
        okHandler = noVisualAid;
    }
    else if (this.className.search(/magnifierCheck/) >= 0){
        text = "This app is checking how you read medication labels. Please ask the pharmacist for a magnifier to complete the test if needed.";
        okHandler = closeModalDialog; 
    }
    
    showMessage(text, "okOnly", okHandler, null);
}

// animates the dialog is closed
function closeModalDialog(){
    $('.modalMessage').fadeOut('slow', function(){ $('.modalMessage').hide();});
	$('#mainSection').fadeIn('slow', function(){ $('#mainSection').show();});
    $('#modalMessage_cancel').hide();
    $('#modalMessage_done').hide();
    $('#modalMessage_ok').hide();
    
    $('#modalMessage_cancel').removeClass('glassesCheck');
    $('#modalMessage_cancel').removeClass('magnifierCheck');
    $('#modalMessage_cancel').removeClass('helpCheck');
}

// if visual aid is necessary for the test, 
// redirect the user back to the front page
function noVisualAid(){
    window.location.href="index.html";
}

//////////////////////////////////
//          INITIALIZE          //
//////////////////////////////////
$(document).ready(function() {
    document.ontouchmove = function(event){ event.preventDefault(); }
	$('.modalMessage').hide();
    $('#modalMessage_cancel').hide();
    $('#modalMessage_done').hide();
    $('#modalMessage_ok').hide();
    
    //Centering questionnaire pages
    if($(document).height() >= 748)
    {
        $('#whiteSpace').css('margin-top','10%');
    }
    
    
    $("#glasses, #magnifier, #helpWithMed").bind( "change", function(event, ui) {
     	var state = $(this).is(':checked');
  		
  		if (state === true) { 
            aidsCheck(this.name);
  		}
	});
	
    //EVENT HANDLER: done is clicked
	$('#done').click(function() {
	  	//console.log("done clicked");
        var formData = $('form').serializeArray(); 
        var results = JSON.parse( localStorage.getItem('results') );
        results['questionnaire'] = new Array();
        $('input:checkbox').map(function() {
            results['questionnaire'].push({ name: this.name, value: $(this).is(':checked') } )});
        
        var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
        //console.log(adviceToUse);
        var current;
        var prefix;
        
        for (var i=0; i < formData.length; i++){
            current = formData[i].name;
            
            // COLLECT ADVICE DATA
            if (current.name === "magnifier" || current.name === "largeprint") {
                adviceToUse['needAid'] = true;
                
                if (typeof adviceToUse['needAidType'] === "undefined"){
                    prefix = "";
                }
                else {
                    prefix = adviceToUse['needAidType'] + ", ";
                }
                
                adviceToUse['needAidType'] = prefix + current.name;
            }
        }
        
        //console.log (  JSON.stringify(adviceToUse));
        localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
        localStorage.setItem ('results', JSON.stringify(results) );
        
        window.location.href = 'questionnaire2.html';
        
  		return false;
	});
});
