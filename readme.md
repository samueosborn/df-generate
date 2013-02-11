dForm-generate
==============
dForm-generate is a jQuery plugin for generating JSON from a HTML form element which is compatible with the [jQuery.dForm plugin](https://github.com/daffl/jquery.dform).

Useage
------
Refer to example.html and example2.html
Though typical useage will be: 
> $("#MyForm").dFormGenerate()
This generates a JSON string ready to use with a JSON parser of your choice.
So for example, to read one form from your HTML and then display it using jQuery.dForm:
> var form = JSON.parse($("#form").dFormGenerate());
> $("#form2").dform(form);

All newish browsers (newer than Internet Explorer 7) have the native JSON.parse and JSON.stringify methods built in. If you need to support older browsers then I recommend using the [JSON parser and stringifier implementation by Douglas Crockford (the guy who made JSON)](https://github.com/douglascrockford/JSON-js) which will add the JSON object to the JavaScript namespace.

Instead of JSON.parse you can use the eval() function in JavaScript - however only use this with JSON from a trusted source, for security reasons. A proper parser is safer.

*Disclaimer*: I do not claim to be competent at JavaScript or jQuery. This code works for me, but may not work for you.
