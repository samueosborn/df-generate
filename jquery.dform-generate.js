(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML Form object and generates JSON compatible with the
        // jQuery.dForm plugin. This plugin is useful paired with an automatic form builder tool
        // or if your designer crafts forms in some IDE (terrible!) which you have to translate.

        var form = this; // As documentation says, no need to wrap: $(this).

        // We should not proceed if we're not handed a Form object.
        if (form.prop("tagName").toLowerCase() != "form"){ // I screwed around with .attr() for ages.
            console.log("Not a form!");
            return null; // Does returning null make sense? I'll find out.
        }

        var formobj = {}
        storeAttributes(form, formobj);
        formobj.html = getChildNodes(form);

        return JSON.stringify(formobj); //Just use JSON.stringify until things are working well.

        function getChildNodes(node){
            // A node may multiple children, so we will return an array of child nodes.
            // Else we return a single child node.
            children = node.children();
            if  (children.length > 0){
                result = [];
                children.each(function(){
                        obj = {};
                        // Get attributes for section. These are k:v pairs which are pushed onto the section.
                        storeAttributes(node, obj);
                        // Get content (which may contain child nodes) which is stored in the html attribute of the section.
                        html = getContent(node);
                        if (html != null){ // There is not always a html attribute.
                            obj.html = html;
                        }
                        result.push(obj);
                    }
                );
                return result;
            } else {
                // We just return this node.
                obj = {};
                storeAttributes(node, obj);
                html = getContent(node);
                if (html != null){
                    obj.html = html;
                }
                return obj;
            }
        }

        function getContent(node){
            // Return the contents for a node... This may be a string or 1 or many children.
            children = node.children();
            if (children.length == 0){
                return node.innerHTML();
            } else {
                return getChildNodes(node);
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