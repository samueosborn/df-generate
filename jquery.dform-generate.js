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
        if (form.attr("id") != null)
            outobj.id = form.attr("id");

        if (form.attr("action") != null)
            outobj.action = form.attr("action");

        if (form.attr("method") != null)
            outobj.method = form.attr("method");

        // Let's assume the form actually has elements...
        outobj.html = [];


        // For all the children of the form we need to make an object with attributes and content.
        // Children may be nested.
        getChildNodes(node){
            result = [];
            node.children().each(function(){
                    section = {};
                    // Get attributes for section. These are k:v pairs which are pushed onto the section.
                    storeAttributes(node, section);
                    // Get content (which may contain child nodes) which is stored in the html attribute of the section.
                    html = getContent(node);
                    if (html != null){
                        section.html = html;
                    }
                    result.push(section);
                }
            );
            return result;
        }

        function getContent(node){
            // Return the contents for a node... This may be a string or an object (for children) or null.
            if (node.children().length == 0){
                return node.innherHTML();
            } else {
                return {getChildNodes(node)};
            }

        }

        function storeAttributes(node, storage){
            // Store attributes of a node in the storage object.
            var type = node.tagName.toLowerCase();
            switch(type){
                case "label":
                    console.log("type: label");
                    // Return the properties for this node.
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
        } // End storeAttributes
        
    }; // End function object
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves
// me in awe every day. -- Daniel Devine