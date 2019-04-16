(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['weather_info.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"weather-details\">\n    <table>\n        <tr>\n            <td>Temp: "
    + alias4(((helper = (helper = helpers.Temp || (depth0 != null ? depth0.Temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Temp","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>Humidity: "
    + alias4(((helper = (helper = helpers.Humidity || (depth0 != null ? depth0.Humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Humidity","hash":{},"data":data}) : helper)))
    + "</td>\n        </tr>\n        <tr>\n            <td>Min Temp: "
    + alias4(((helper = (helper = helpers.Min_Temp || (depth0 != null ? depth0.Min_Temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Min_Temp","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>Pressure: "
    + alias4(((helper = (helper = helpers.Pressure || (depth0 != null ? depth0.Pressure : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Pressure","hash":{},"data":data}) : helper)))
    + "</td>\n        </tr>\n        <tr>\n            <td>Max Temp: "
    + alias4(((helper = (helper = helpers.Max_Temp || (depth0 != null ? depth0.Max_Temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Max_Temp","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>Wind Speed: "
    + alias4(((helper = (helper = helpers.Wind_Speed || (depth0 != null ? depth0.Wind_Speed : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Wind_Speed","hash":{},"data":data}) : helper)))
    + "</td>\n        </tr>\n    </table>\n</div> ";
},"useData":true});
})();