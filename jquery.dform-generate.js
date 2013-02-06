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

        console.log(JSON.stringify(formobj));
        return JSON.stringify(formobj); //Just use JSON.stringify until things are working well. 
        // Crockford json2.js prototypes over JSON.stringify!

        function getChildNodes(node){
            // If there is multiple children an array will be returned, else just 1 object.
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
                    child = {};
                    // Get attributes for section. These are k:v pair attributes.
                    storeAttributes(this, child);
                    // Get content (which may contain child nodes) to store in the html attribute.
                    child.html = getContent(this); // JSON.stringify should ignore undefined values.
                    console.log(child.html);
                    result.push(child);
                });
                return result;
            } else {
                nodeobj = {};
                storeAttributes(node, nodeobj);
                nodeobj.html = getContent(node);
                return nodeobj;
            }
        }

        function getContent(node){
            // Return the contents for a node... This may be a string or 1 or many children.
            console.log(node);
            children = $(node).children();
            console.log("getContent children: " + children.length);
            if (children.length == 0){
                var innerhtml = node.innerHTML;
                if (innerhtml == null){
                    return node.value;
                } else {
                    return innerhtml;
                }
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
                    storage.type = type;
                    storage.id = node.id;
                    storage.name = $(node).attr("for");
                    break;

                case "p":
                    console.log("tag: p");
                    storage.type = "p";
                    storage.id = node.id;
                    break;

                case "input": // Note: we output "text" (a type attribute of HTMLInputElement), though "input" works and is equally valid?
                    console.log("tag: input");
                    storage.type = type;
                    storage.id = node.id;
                    break;

                case "br":
                    console.log("tag: br");
                    storage.type = "br";
                    break;

                case "div":
                    console.log("tag: div");
                    storage.type = "div";
                    storage.id = node.id;
                    storage.name = node.name;
                    break;

                case "form":
                    console.log("tag: form");
                    storage.action = node.action;
                    storage.method = node.method;
                    storage.id = node.id;
                    storage.name = node.name;
                    break;
                default:
                    console.log("Unknown element tag: " + tag);
            }
        } // End storeAttributes
        
    }; // End function object
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves
// me in awe every day. -- Daniel Devine