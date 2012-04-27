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
    
    var prefix; 
    for (var i in formData){
        current = formData[i];
        //results['questionnaire'].push(current);
        
        if (current.name === "prescription"){
            adviceToUse['difficultyReading'] = "qYes";
            adviceToUse['regularMonitoring'] = "qYes";
        }
        else if (current.name === "non-prescription") {
            adviceToUse['difficultyReading'] = true;
            adviceToUse['regularMonitoring'] = true;
        }
        else if (current.name === "worn"){
            adviceToUse['difficultyReading'] = true;
            adviceToUse['protectFromWear'] = true;
        }
        else if (current.name === "glossy"){
            adviceToUse['difficultyReading'] = true;
        }
        
        if (typeof adviceToUse['difficultyReadingType'] === "undefined"){
            prefix = "";
        }
        else {
            prefix = adviceToUse['difficultyReadingType'] + ", ";
        }
        
        adviceToUse['difficultyReadingType'] = prefix + current.name;
    }
    
    
    var checkBoxSerialized = $('input:checkbox').map(function() {
                                                     return { name: this.name, value: $(this).is(':checked') };
                                                     });
    //console.log(checkBoxSerialized);
    
    console.log (adviceToUse);
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
    
    console.log(results);
    localStorage.setItem ('results', JSON.stringify(results) );
    
    window.location.href= 'instructions.html';
}