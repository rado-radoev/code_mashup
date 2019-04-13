(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['show-weather'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div id=\"Weather\">\n        <h1>"
    + alias4(((helper = (helper = helpers.weather || (depth0 != null ? depth0.weather : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weather","hash":{},"data":data}) : helper)))
    + "</h1>\n   \n        <div id=\"city\">"
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "</div>\n        <div id=\"temp\">"
    + alias4(((helper = (helper = helpers.temp || (depth0 != null ? depth0.temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temp","hash":{},"data":data}) : helper)))
    + "</div>\n        <div id=\"humidity\">"
    + alias4(((helper = (helper = helpers.humidity || (depth0 != null ? depth0.humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"humidity","hash":{},"data":data}) : helper)))
    + "</div>\n        <div id=\"temp_min\">"
    + alias4(((helper = (helper = helpers.temp_min || (depth0 != null ? depth0.temp_min : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temp_min","hash":{},"data":data}) : helper)))
    + "</div>\n    </div> ";
},"useData":true});
})();