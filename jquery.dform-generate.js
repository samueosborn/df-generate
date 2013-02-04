(function ( $ ){
    $.fn.dFormGenerate = function(){
        // This function takes a HTML form and generates JSON compatible with jQuery.dForm.
        // This is useful if you pair it with an automatic form builder tool - or if your designer 
        // crafts forms in some IDE (terrible!) which you have to translate.
        var form = this;
        var outobj = {}; // An object to store the data we extract. JSON stringify later.

        // For each child push piece of JSON into the output.
        form.children().each(function() {
            console.log(this);
        });
    };    
})( jQuery );

// For Taryn, who set me on my feet, gave me my motivation back and who still leaves me in awe every
// day. -- Daniel Devine