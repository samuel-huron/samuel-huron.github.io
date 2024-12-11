//  Json to CSV 
var fs 		 	= require('fs');
var json2csv 	= require('json2csv');

var jsonfile	= require('./output/main.json');
var dirname 	= "output";
var csvFileName = "main.csv";

// The Columns of the CSV 
var csv_column  = 	{
					 'p':null,// participant 0
					 'c':null,// condition 1
					 'Loading data':0,
                     'Transform data':0,
                     'Visual Mapping creation':0,
                     'Visual mapping modification':0,

                     'Presentation mapping creation':0,
                     'Presentation mapping modification':0,
                     
                     'Exploring the tool':0,
                     'Verifying the visualization':0,
                     'Ask for help':0,

                     'Help from the operator':0,
                     'Interuption':0,
                     'Selecting data':0,
                     'Manipulation Error':0
                     };

// Add "_i" column for number of instances
for (key in csv_column) {
	if(key!='p' || key!='c'){
		csv_column[key+"_i"]=0
	}
}
console.log("csv_column",csv_column)

var csv_output	= [] //

function listFields(csv_column){
	var output = []
	for (key in csv_column) {
		output.push(key)
		//console.log(key)
	}
	return output;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function saveAs (path,name,content){
	fs.writeFile(path+"/"+name, content, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file "+name+" was saved!");
	});
}

function readJson (json){

	var tilesrow = clone(csv_column);
	var excelrow = clone(csv_column);
	tilesrow.c = 'tiles'
	excelrow.c = 'excel'
	excelrow.p = tilesrow.p = 'total'


	for(var i in json){
		// participant and condition loop
		//console.log(json[i].p,json[i].c)
		var temprow = clone(csv_column);
		temprow.p = json[i].p
		temprow.c = json[i].c
		
		// annotation loop
		for(var j in json[i].times){
			var k = json[i].times[j]
			// category 
			var duration = k['ending_time']-k['starting_time']
			var category = k['category']
			temprow[category] += duration
			temprow[category+"_i"]+=1

			if(excelrow.c==json[i].c){
				excelrow[category] += duration
				excelrow[category+"_i"]+=1				
			}else if (tilesrow.c==json[i].c){
				tilesrow[category] += duration
				tilesrow[category+"_i"]+=1				
			}
		}
		csv_output.push(temprow)
		//console.log(temprow)
	}

	csv_output.push(excelrow)
	csv_output.push(tilesrow)


}


jsonfile.sort(function (a, b) {
      if (a.condition > b.condition)
        return 1;
      else if (a.condition < b.condition)
        return -1;
      else if (a.label > b.label)
        return 1;
      else if (a.label < b.label)
        return -1;

      // a doit être égale à b
      return 0;
})


// Read Json 
readJson(jsonfile);


// List fields
var fields = listFields(csv_column)


// Transform array to csv 
json2csv({ data: csv_output, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  	console.log(csv);
	// Save Csv 
	saveAs(dirname,csvFileName,csv)
});


// Do minimal stats ??

