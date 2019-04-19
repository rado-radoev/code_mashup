(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['coords.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table id=\"coords\">\n    <tr>\n        <td>lat: "
    + alias4(((helper = (helper = helpers.Latitude || (depth0 != null ? depth0.Latitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Latitude","hash":{},"data":data}) : helper)))
    + "</td>\n        <td>lon: "
    + alias4(((helper = (helper = helpers.Longitude || (depth0 != null ? depth0.Longitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Longitude","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n</table>";
},"useData":true});
})();