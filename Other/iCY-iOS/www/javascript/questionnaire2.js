$(document).ready(function() {
    document.ontouchmove = function(event){ event.preventDefault(); }
    document.getElementById('done').onclick = onDone;
    
    //Centering questionnaire pages
    if($(document).height() >= 748)
    {
        $('#whiteSpace').css('margin-top','10%');
    }
});

function onDone(e) {
    var formData = $('form').serializeArray();
    var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    var results = JSON.parse( localStorage.getItem('results') );
    var current;
    
    $('input:checkbox').map(function() {
                            results['questionnaire'].push( { name: this.name, value: $(this).is(':checked')});
                            });
    
    for (var i in formData){
        current = formData[i];
        //results['questionnaire'].push(current);
        
        if (current.name === "prescription"){
            adviceToUse['difficultyReadLabels'] = "qYes";
            adviceToUse['discussGlassLargePrint'] = "qYes";
        }
        else if (current.name === "nonprescription") {
            adviceToUse['difficultyReadNonPrescription'] = true;
            adviceToUse['discussMagnifying'] = true;
        }
        else if (current.name === "worn"){
            adviceToUse['difficultyReadWorn'] = true;
            adviceToUse['difficultyDiscuss'] = "qYes";
            adviceToUse['noTape'] = false; 
        }
        else if (current.name === "glossy"){
            adviceToUse['difficultyReadGlossy'] = true;
            if (adviceToUse['difficultyDiscuss'] === "qYes"){
                adviceToUse['difficultyDiscuss'] = true;
            }
            else {
                adviceToUse['difficultyDiscuss'] = false;
            }
        }
    }
    
    var checkBoxSerialized = $('input:checkbox').map(function() {
                                                     return { name: this.name, value: $(this).is(':checked') };
                                                     });
    console.log(checkBoxSerialized);
    
    console.log (adviceToUse);
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
    
    console.log(results);
    localStorage.setItem ('results', JSON.stringify(results) );
    
    window.location.href= 'instructions.html';
}