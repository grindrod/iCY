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
	
	$('#done').click(function() {
	  	console.log("done clicked");
        var formData = $('form').serializeArray(); 
        console.log( formData );
                     
        console.log("COLLECT ADVICE DATA");
        var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
        //console.log(adviceToUse);
        var current;
         
        for (var i=0; i < formData.length; i++){
            current = formData[i].name;
            console.log("current[" +i + "]: " + current);
         
            // COLLECT ADVICE DATA
            if (current.name === "largeprint"){
                     adviceToUse['usesLargePrint'] = "qYes";
            }
         
            else if (formData[i].name === "glossy" && formData[i].value === "on") {
                     adviceToUse['noTape'] = true;
            }
        }
                     
        
        //console.log (  JSON.stringify(adviceToUse));
        localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
        window.location.href = 'questionnaire2.html';
        
  		return false;
	});
});



var aidsCheck = function (aid){
    var text; 
    console.log("aid: " + aid);
    if (aid === "glasses"){
        $('#modalMessage_cancel').addClass('glassesCheck');
        text = "Are you wearing them now?";
        showMessage(text, "yesNo", closeModalDialog, appExplain);
    }
    else if (aid === "magnifier"){
        $('#modalMessage_cancel').addClass('magnifierCheck');
        text = "Are you using your magnifier now?";
        showMessage(text, "yesNo", closeModalDialog, appExplain);
    }
    else if (aid === "helpWithMed"){
        $('#modalMessage_cancel').addClass('helpCheck');
        text = "Are they here with you now?";
        showMessage(text, "yesNo", closeModalDialog, appExplain);
    }
    else {
        console.log("wut? 0.o");
    }
}




//////////////////////////////////
//          MODAL DIALOG        //
//////////////////////////////////

var showMessage = function(text, messageClass, yesHandler, noHandler) {
    console.log("SHOW MESSAGE");
    
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
}

function appExplain(event) {
    var text;
    var okHandler; 
    
    if (this.className.search(/glassesCheck/) >= 0){
        text = "This app is checking how you read medication labels. Please wait until you have your glasses or contacts to try the app.";
        okHandler = noVisualAid;
    }
    else if (this.className.search(/magnifierCheck/) >= 0){
        text = "This app is checking how you read medication labels. Please ask the pharmacist for a magnifier to complete the test if needed.";
        okHandler = closeModalDialog; 
    }
    else if (this.className.search(/helpCheck/) >= 0){
        text = "This app is checking how you read medication labels. Please repeat the test when your support person is with you.";
        okHandler = noVisualAid;
    }
    
    showMessage(text, "okOnly", okHandler, null);
}

function closeModalDialog(){
    $('.modalMessage').fadeOut('slow', function(){ $('.modalMessage').hide();});
	$('#mainSection').fadeIn('slow', function(){ $('#mainSection').show();});
    $('#modalMessage_cancel').hide();
    $('#modalMessage_done').hide();
    $('#modalMessage_ok').hide();
}

function noVisualAid(){
    console.log("no visual aid!");
    window.location.href="index.html";
}