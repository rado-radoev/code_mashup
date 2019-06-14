Date.prototype.toShortFormat = function() {

  var month_names =["Jan","Feb","Mar",
                    "Apr","May","Jun",
                    "Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
  
  var day = this.getDate();
  var month_index = this.getMonth();
  var year = this.getFullYear();
  
  return "" + (month_index + 1) + "/" + day + "/" + year;  
  // return "" + day + "/" + month_names[month_index] + "/" + year;
};