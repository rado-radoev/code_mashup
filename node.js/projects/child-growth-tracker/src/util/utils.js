function calcAge(birthDate) {
    
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        
    var currDate = new Date()

    const utc1 = Date.UTC(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    const utc2 = Date.UTC(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
 
    // returns days
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function convertDaysToMonths(days) {
    return Math.floor(days / 30);
}

function convertDaysToYears(days) {
    return Math.floor(days / 365); 
}

function toShortFormat(date) {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = date.getDate();
    var month_index = date.getMonth();
    var year = date.getFullYear();
    
    return "" + (month_index + 1) + "/" + day + "/" + year;  
    // return "" + day + "/" + month_names[month_index] + "/" + year;
  };


module.exports = {
    calcAge,
    convertDaysToMonths,
    convertDaysToYears,
    toShortFormat
}