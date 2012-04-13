$(document).ready(function() {
    document.ontouchmove = function(event){ event.preventDefault(); }
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
			
			/*var text;
			if ( $(this)[0].name === 'magnifier') {
				text = "If you have it with you, you may use it.";
			} 
			else { // glasses or bifocals
				text = "If you have them with you, please put them on.";
			}
			showMessage(text); */
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
        console.log( formData );
        
        //aidCheck(formData);
                     
        collectAdviceData(formData);
                     
  		/*if (window.location.href.search(/questionnaire1.html/) > 0){
  			window.location.href = 'questionnaire2.html';
  		}
  		else {
  			window.location.href= 'instructions.html';
  		}*/
  		return false;
	});
});

var showMessage = function(usedAid) {
    var text = "This is a measure of your ability to read prescription labels. If you require " + usedAid + " to read labels, we suggest that you wait to take the test when you have your visual aid.";
    
	if($('.modalMessage').css('display') == "none")
	{
		$('#mainSection').hide();
		var docHeight = $(document).height();
		$('.modalMessage').height(docHeight);
		$('#modalMessage_text').html(text); 
        document.getElementById('modalMessage_done').onclick=onContinue;
        document.getElementById('modalMessage_cancel').onclick=onCancel;
		$('.modalMessage').fadeIn('slow', function(){ $('.modalMessage').show();});
	}
}

function onContinue(event){
    if (window.location.href.search(/questionnaire1.html/) > 0){
        window.location.href = 'questionnaire2.html';
    }
    else {
        window.location.href= 'instructions.html';
    }
}

function onCancel(event){
    $('.modalMessage').fadeOut('slow', function(){ $('.modalMessage').hide();});
	$('#mainSection').fadeIn('slow', function(){ $('#mainSection').show();});
}

var aidCheck = function (formData){
    for (var i in formData){
        
    }
}

var collectAdviceData = function(formData) {
    console.log("COLLECT ADVICE DATA");
    var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    //console.log(adviceToUse);
    var current;
    
    for (var i in formData){
        current = formData[i].name;
        
        // VISUAL AID CHECK
        var aidUsed;
        /*var increment = formData.length < i+1? i + 1 : i;
        if ((formData[i].name === "glasses" && formData[increment].name != "glassesnow") ||
            (formData[i].name === "magnifier" && formData[i+1].name != "magnifiernow")){
            console.log("has visual aid but does not have them now");
            aidUsed = $('#formData[i].name + "Label"').attr('value');
            console.log(aidsUsed);
            showMessage(aidsUsed);
        }*/
        
        if (formData[i].name === "glasses" || formData[i].name === "magnifier"){
            increment = formData.length < i+1? i+1 : i;
            if (formData[increment].name === "glassesnow" || formData[increment].name === "magnifiernow"){
                console.log("User has visual aid now");
            }
            else {
                console.log("has visual aid but does not have them now: " + current);
                aidUsed = $('#' + formData[i].name + 'Label').attr('value');
                //aidUsed = $('#' + current);
                console.log(aidUsed);
                showMessage(aidUsed);
            }
            
        }
        
        // COLLECT ADVICE DATA
        if (adviceToUse['discuss'] === false &&  formData[i].value === "on" && 
            (formData[i].name === "largeprint" || formData[i].name === "prescription" || 
             formData[i].name === "nonprescription" || formData[i].name === "worn") ){
  				adviceToUse['discuss'] = true;
  			}
        
        else if (formData[i].name === "glossy" && formData[i].value === "on") {
            adviceToUse['noTape'] = true;
        }
    }
    console.log (  JSON.stringify(adviceToUse));
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
}