(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML form and generates JSON compatible with jQuery.dForm.
        // This is useful if you pair it with an automatic form builder tool - or if your designer 
        // crafts forms in some IDE (terrible!) which you have to translate.
        var form = this; // As documentation says, no need to wrap: $(this).
        var outobj = {}; // An object to store the data we extract. JSON stringify later.

        // We should not proceed if we're not handed a Form object.
        if (form.prop("tagName").toLowerCase() != "form"){ // I screwed around with .attr() for ages.
            console.log("Not a form!");
            return null; // Does returning null make sense? I'll find out.
        }

        // Get data about the form itself.
        // id, action, method...
        if(form.attr("id") != null){
            outobj.id = form.attr("id");
        } else if (form.attr("action") != null){
            outobj.action = form.attr("action");
        } else if (form.attr("method") != null){
            outobj.method = form.attr("method");
        } else {}

        // For each child push piece of JSON into the output.
        form.children().each(function() {
            console.log(this);

            var type = this.tagName.toLowerCase();
            switch(type){
                case "label":
                    console.log("type: label");
                    break;

                case "p":
                    console.log("type: p");
                    break;

                case "input": // Note: we output "text", though "input" works and is equally valid?
                    console.log("type: input");
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

            echo("This is echoing!");

        }); // End foreach
        
    }; // End function   
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves me in awe every
// day. -- Daniel Devine