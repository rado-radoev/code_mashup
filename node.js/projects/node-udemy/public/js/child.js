$(function() {

    Mustache.tags = ["[[", "]]"];
    var template = $('#template').html();
    Mustache.parse(template)
    console.log(template)
    var rendered = Mustache.render(template, {name: "Luke"});
    console.log(rendered)
    $('#messages').html(rendered)

})

function run_mustache() {

    // Change Default Mustache Tags to avoid conflicts with handlebars
    Mustache.tags = ["[[", "]]"];

    //Get Template
    var template = $('#template').html();

    //Prepare Template for Mustache
    Mustache.parse(template)

    //Render template
    var rendered = Mustache.render(template, {name: "Luke"});

    //Update ID messages with new template
    $('#messages').html(rendered)
 
}
