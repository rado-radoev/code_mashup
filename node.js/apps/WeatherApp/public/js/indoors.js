(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['indoors'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table>\n    <tr>\n        <th>Indoor Temp</th>\n        <th>Indoor Humidity</th>\n    </tr>\n    <tr>\n        <td>"
    + alias4(((helper = (helper = helpers.indoor_temp || (depth0 != null ? depth0.indoor_temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"indoor_temp","hash":{},"data":data}) : helper)))
    + "</td>\n        <td>"
    + alias4(((helper = (helper = helpers.indoor_humidity || (depth0 != null ? depth0.indoor_humidity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"indoor_humidity","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n</table>";
},"useData":true});
})();