(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML Form object and generates a JSON string compatible with the
        // jQuery.dForm plugin. This plugin is useful paired with an automatic form builder tool
        // or if your designer crafts forms in some IDE (terrible!) which you have to translate.

        var form = this; // As documentation says, no need to wrap: $(this).
        var nodeseen = []; // Keep track of the already processed nodes. Avoids cyclic refences.

        // We should not proceed if we're not handed a Form object.
        if (form.prop("tagName").toLowerCase() != "form"){
            console.log("The element handed to dFormGenerate was not a Form.");
            return null; // Does returning null make sense?
        }

        var formobj = {};
        storeAttributes(form[0], formobj);
        formobj.html = getContent(form[0]);

        return JSON.stringify(formobj);

        function getChildNodes(node){
            // If there are multiple children, an array of objects will be returned, else just 1.
            
            var children = $([]);
            $(node).children().each(function(){
                if (nodeseen.indexOf(this) == -1){
                    children.push(this);
                }
            });

            if  (children.length > 1 ){
                // Return an array of children.
                var result = [];
                children.each(function(){
                    var child = {};
                    // Get attributes for section. These are k:v pair attributes.
                    storeAttributes(this, child);
                    // Get content (which may contain child nodes).
                    child.html = getContent(this);
                    result.push(child);
                });
                return result;
            } else if (children.length == 1){
                // Return a single node. (Which itself may have children).
                var nodeobj = {};
                storeAttributes(node, nodeobj);
                nodeobj.html = getContent(node);
                return nodeobj;
            } else {
                return null;
            }
        }

        function getContent(node){
            // Returns the contents for a node... This may be a string or child(ren).
            var children = $(node).children();
            if (children.length == 0){
                // JSON.stringify should ignore undefined values.
                return (node.innerHTML != "") ? node.innerHTML : undefined; 
            } else {
                return getChildNodes(node);
            }
        }

        function storeAttributes(node, storage){
            // Store attributes of a node in the storage object.
            nodeseen.push(node);

            var tag = $(node).prop("tagName").toLowerCase();
            var type = node.type;

            // All elements have a tagName, but not all have a type.
            // For everything that is not an Input type, use type=tagName.
            // Note: A DIV can also be a "container" type.
            if (tag == "input"){
                storage.type = type;
            } else {
                storage.type = tag;
            }

            storage.id = ($(node).prop("id") != "") ? $(node).prop("id") : undefined;
            storage.for = ($(node).prop("for") != "") ? $(node).prop("for") : undefined;
            storage.class = ($(node).prop("class") != "") ? $(node).prop("class") : undefined;
            storage.name = (node.name != "") ? node.name : undefined;
            storage.value = (node.value != "") ? node.value : undefined;
            storage.action = (node.action != "") ? node.action : undefined;
            storage.method = (node.method != "") ? node.method : undefined;
            storage.href = (node.href != "") ? node.href : undefined;
            storage.src = (node.src != "") ? node.src : undefined;
            storage.alt = (node.alt != "") ? node.alt : undefined;

            return;
        } // End storeAttributes
        
    }; // End function object
})( jQuery );

// This is thanks to Taryn, who set me on my feet, gave me my motivation back and who still leaves
// me in awe every day. -- Daniel Devine