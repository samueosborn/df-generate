(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML Form object and generates JSON compatible with the
        // jQuery.dForm plugin. This plugin is useful paired with an automatic form builder tool
        // or if your designer crafts forms in some IDE (terrible!) which you have to translate.

        var form = this; // As documentation says, no need to wrap: $(this).
        var nodeseen = []; // Keep track of the nodes we have already processed.

        // We should not proceed if we're not handed a Form object.
        if (form.prop("tagName").toLowerCase() != "form"){ // I screwed around with .attr() for ages.
            console.log("Not a form!");
            return null; // Does returning null make sense? I'll find out.
        }

        var formobj = {};
        storeAttributes(form[0], formobj);
        formobj.html = getContent(form[0]);

        console.log(formobj);
        return JSON.stringify(formobj); //Just use JSON.stringify until things are working well. 
        // Crockford json2.js prototypes over JSON.stringify!

        function getChildNodes(node){
            // A node may multiple children, so we will return an array of child nodes.
            // Else we return a single child node.
            children = $([]);
            $(node).children().each(function(){
                if (nodeseen.indexOf(this) == -1){
                    children.push(this);
                }
            });

            console.log("nodeseen:");
            console.log(nodeseen);

            if  (children.length > 0){
                result = [];
                children.each(function(){
                    obj = {};
                    // Get attributes for section. These are k:v pairs which are pushed onto the section.
                    storeAttributes(this, obj);
                    // Get content (which may contain child nodes) which is stored in the html attribute of the section.
                    html = getContent(this);
                    if (html != null){ // There is not always a html attribute.
                        obj.html = html;
                    }
                    result.push(obj);
                });
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
            console.log(node);
            children = $(node).children();
            if (children.length == 0){
                return node.innerHTML;
            } else {
                return getChildNodes(node);
            }
        }

        function storeAttributes(node, storage){
            // Store attributes of a node in the storage object.

            nodeseen.push(node);

            var tag = $(node).prop("tagName").toLowerCase();
            console.log("tag:" + tag);
            var type = node.type;
            console.log("type: " + type);

            // All elements have a tagName, but not all have a type.
            switch(tag){
                case "label":
                    console.log("tag: label");
                    // Return the properties for this node.
                    break;

                case "p":
                    console.log("tag: p");
                    break;

                case "input": // Note: we output "text" (a type attribute of HTMLInputElement), though "input" works and is equally valid?
                    console.log("tag: input");
                    break;

                case "br":
                    console.log("tag: br");
                    break;

                case "div":
                    console.log("tag: div");
                    break;

                case "form":
                    console.log("tag: form");
                    return {"id": node.id, "name": node.name,};
                    break;
                default:
                    console.log("Unknown element tag: " + tag);
            }
        } // End storeAttributes
        
    }; // End function object
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves
// me in awe every day. -- Daniel Devine