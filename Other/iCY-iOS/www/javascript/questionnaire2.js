$(document).ready(function() {
    document.ontouchmove = function(event){ event.preventDefault(); }
    document.getElementById('done').onclick = onDone;
});

function onDone(e) {
    var formData = $('form').serializeArray();
    var adviceToUse = JSON.parse( localStorage.getItem('adviceToUse') );
    var current;
    
    for (var i in formData){
        current = formData[i];
        console.log(current);
        
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
    
    console.log (  adviceToUse );
    localStorage.setItem ('adviceToUse', JSON.stringify(adviceToUse) );
    window.location.href= 'instructions.html';
}