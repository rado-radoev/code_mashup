(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['city_details.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"city_details\">\n    <p>\n        <div id=\"cityname\">"
    + alias4(((helper = (helper = helpers.City_Name || (depth0 != null ? depth0.City_Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"City_Name","hash":{},"data":data}) : helper)))
    + "</div>\n        <div id=\"weatherdescription\">"
    + alias4(((helper = (helper = helpers.WeatherDescription || (depth0 != null ? depth0.WeatherDescription : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"WeatherDescription","hash":{},"data":data}) : helper)))
    + "</div>\n    </p>\n</div>";
},"useData":true});
})();