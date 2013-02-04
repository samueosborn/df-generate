(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML form and generates JSON compatible with jQuery.dForm.
        // This is useful if you pair it with an automatic form builder tool - or if your designer 
        // crafts forms in some IDE (terrible!) which you have to translate.
        var form = this; // As documentation says, no need to wrap: $(this).
        var outobj = {}; // An object to store the data we extract. JSON stringify later.

        // We should not proceed if we're not handed a Form object.
        if(form.prop("tagName").toLowerCase() != "form"){ // I screwed around with .attr() for ages.
            console.log("Not a form!");
            return null; // Does returning null make sense? I'll find out.
        }

        // For each child push piece of JSON into the output.
        form.children().each(function() {
            console.log(this);

            var type = this.tagName.toLowerCase();
            switch(type){
                case "text":
                    console.log("type: text");
                    break;

                case "input":
                    console.log("type: text");
                    break;

                case "br":
                    console.log("type: br");
                    break;

                case "div":
                    console.log("type: div");
                    break;
                default:
                    console.log("Unknown element type: " + type);
            }

        }); // End foreach
    }; // End function   
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves me in awe every
// day. -- Daniel Devine