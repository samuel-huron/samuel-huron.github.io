var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser 				= new xml2js.Parser();
var dirname 			= "Coding";
var annotationXMLFile 	= "annotations.xml";
var reportLOG			= "";
var mainJSON 			= []

// to merge vategorie, put the key as the categories you want to search and the value as the category you want to remplace
var mergeCategories 	= {
							"Visual Mapping creation":"Visual mapping modification",
							"Presentation mapping creation":"Presentation mapping modification"
							}

var allData = {

				annotations:[
							{p:"1",c:"excel", file:"P1 - Excel.annotation"},
							{p:"2",c:"excel", file:"P2 - Excel 2.annotation"},
							{p:"3",c:"excel", file:"P3 - Excel 3.annotation"},
							{p:"4",c:"excel", file:"P4 - Excel 2.annotation"},
							{p:"5",c:"excel", file:"P5 - Excel 2.annotation"},
							{p:"6",c:"excel", file:"P6 - Excel 2.annotation"},
							{p:"7",c:"excel", file:"p7-excel-annotation-sam.annotation"},
							{p:"8",c:"excel", file:"p8-excel-annotation-sam.annotation"},
							{p:"9",c:"excel", file:"p9-excel-annotations-LAST.annotation"},
							{p:"10",c:"excel", file:"p10 excel-Annotations.annotation"},
							{p:"11",c:"excel", file:"p11- Excel annotations.annotation"},
							{p:"12",c:"excel", file:"p12-excel-annotations-sam.annotation"},
							{p:"13",c:"excel", file:"p13 excel.annotation"},
							{p:"14",c:"excel", file:"p14 excel.annotation"},
							{p:"15",c:"excel", file:"p15 excel.annotation"},
							{p:"16",c:"excel", file:"p16 excel.annotation"},
							{p:"17",c:"excel", file:"p17 excel.annotation"},

							{p:"1", c:"tiles", file:"P1 - Tiles.annotation"},
							{p:"2", c:"tiles", file:"P2 - Tiles.annotation"},
							{p:"3", c:"tiles", file:"P3 - Tiles.annotation"},
							{p:"4", c:"tiles", file:"P4 - Tiles.annotation"},
							{p:"5", c:"tiles", file:"P5 - Tiles.annotation"},
							{p:"6", c:"tiles", file:"P6 - Tiles.annotation"},
							{p:"7", c:"tiles", file:"p7-tiles-annotations-good-version.annotation"},
							{p:"8", c:"tiles", file:"p8-tiles-annotations-sam.annotation"},
							{p:"9", c:"tiles", file:"p9-tiles-annotations-sam.annotation"},
							{p:"10",c:"tiles", file:"p10-tiles-annotation-sam.annotation"},
							{p:"11",c:"tiles", file:"P11 - Tiles - annotations.annotation"},
							{p:"12",c:"tiles", file:"p12-tiles-annotation-sam.annotation"},
							{p:"13",c:"tiles", file:"p13 tiles.annotation"},
							{p:"14",c:"tiles", file:"p14 excel.annotation"},
							{p:"15",c:"tiles", file:"p15 tiles.annotation"},
							{p:"16",c:"tiles", file:"p16 tiles.annotation"},
							{p:"17",c:"tiles", file:"p17 tiles.annotation"},
							]
				}	 

//

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function saveAs (path,name,content){
	fs.writeFile(path+"/"+name, content, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file "+name+" was saved!");
	});
}

function mergeCat (input){
	var output = input
	for (var i in mergeCategories){
		console.log(i,input)
		if(i==input){
			console.log("modify")
			output=mergeCategories[i]
		}
	};
	return output
}


function transformJSON (json){
	var output = []
	myobject = json.data.event

	for(var i in myobject){

		var timeValues = checkValues(myobject[i].$.startTimeInterval,myobject[i].$.endTimeInterval)
		// *1000 to convert to JS Date format for the viz
		var starting_time = Math.round(timeValues.start*1000)
		var ending_time   = Math.round(timeValues.end*1000)
		
		totalAnnotation+=1

		// if you should merge categories do it
		if(Object.size(mergeCategories)>0){
			myobject[i].$["annotation-category"] = mergeCat(myobject[i].$["annotation-category"])	
		}

		output.push({
						"starting_time":starting_time,
						"ending_time":ending_time,
						"content":myobject[i]._,
						"is_duration":myobject[i].$.isDuration,
						"category":myobject[i].$["annotation-category"],
						"user":myobject[i].$["annotation-modificationUser"],
						"image":myobject[i].$.image
		})
	}
	return output.reverse();
}

// To test : 
//var tempjson = {"data":{"event":[{"_":"Entering the planet names and values.\n    ","$":{"startTimeInterval":"7.981244","start":"September 3 2015 13:43:17 GMT-0600","endTimeInterval":"77.81057800000001","end":"September 3 2015 13:44:27 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Loading data","image":"images/718312.jpg"},"category":[{"$":{"name":"Loading data"}}]},{"_":"Exploring the menus.\n    ","$":{"startTimeInterval":"77.9306","start":"September 3 2015 13:44:27 GMT-0600","endTimeInterval":"146.449712","end":"September 3 2015 13:45:36 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Exploring the tool","image":"images/7013754.jpg"},"category":[{"$":{"name":"Exploring the tool"}}]},{"_":"Verifying.\n    ","$":{"startTimeInterval":"380.006011","start":"September 3 2015 13:49:30 GMT-0600","endTimeInterval":"403.330611","end":"September 3 2015 13:49:53 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Verifying the visualization","image":"images/34200541.jpg"},"category":[{"$":{"name":"Verifying the visualization"}}]},{"_":"Tiffany asks them to verify.\n    ","$":{"startTimeInterval":"372.298988","start":"September 3 2015 13:49:22 GMT-0600","endTimeInterval":"379.769577","end":"September 3 2015 13:49:29 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Interuption","image":"images/33506909.jpg"},"category":[{"$":{"name":"Interuption"}}]},{"_":"Asking for help, demonstrating problem.\n    ","$":{"startTimeInterval":"150.147488","start":"September 3 2015 13:45:40 GMT-0600","endTimeInterval":"205.633344","end":"September 3 2015 13:46:35 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Ask for help","color":"#7c2d15","image":"images/13513274.jpg"},"category":[{"$":{"name":"Ask for help"}}]},{"_":"Getting help, including Tiffany's response.\n    ","$":{"startTimeInterval":"150.147488","start":"September 3 2015 13:45:40 GMT-0600","endTimeInterval":"279.237022","end":"September 3 2015 13:47:49 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Help from the operator","image":"images/13513274.jpg"},"category":[{"$":{"name":"Help from the operator"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"122.381677","start":"September 3 2015 13:45:12 GMT-0600","endTimeInterval":"124.200011","end":"September 3 2015 13:45:14 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Selecting data","image":"images/11014351.jpg"},"category":[{"$":{"name":"Selecting data"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"131.316386","start":"September 3 2015 13:45:21 GMT-0600","endTimeInterval":"134.000011","end":"September 3 2015 13:45:24 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Selecting data","image":"images/11818475.jpg"},"category":[{"$":{"name":"Selecting data"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"289.925711","start":"September 3 2015 13:47:59 GMT-0600","endTimeInterval":"369.602633","end":"September 3 2015 13:49:19 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Visual mapping modification","image":"images/26093314.jpg"},"category":[{"$":{"name":"Visual mapping modification"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"96.075422","start":"September 3 2015 13:44:46 GMT-0600","endTimeInterval":"146.442944","end":"September 3 2015 13:45:36 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Visual Mapping creation","image":"images/8646788.jpg"},"category":[{"$":{"name":"Visual Mapping creation"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"279.449588","start":"September 3 2015 13:47:49 GMT-0600","endTimeInterval":"289.6472","end":"September 3 2015 13:47:59 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Exploring the tool","image":"images/25150463.jpg"},"category":[{"$":{"name":"Exploring the tool"}}]},{"_":"New Annotation…\n    ","$":{"startTimeInterval":"362.133344","start":"September 3 2015 13:49:12 GMT-0600","endTimeInterval":"371.166677","end":"September 3 2015 13:49:21 GMT-0600","isDuration":"true","title":"","annotation-modificationDate":"September 28 2015 12:44:02 GMT-0600","annotation-modificationUser":"Jennifer Payne","annotation-category":"Presentation mapping modification","image":"images/32592001.jpg"},"category":[{"$":{"name":"Presentation mapping modification"}}]}]}}
//console.log(transformJSON(tempjson))

function checkValues (start,end){
	var output = {start:0,end:0}
	var value = end-start
	if(typeof(end) == "undefined"){
		end = start+30
	}
	if(value<0){
		output.start = end
		output.end   = start
		//console.log("under 0 = "+value+" // "+ JSON.stringify(output))
	}else{
		output.start = start
		output.end   = end
	}
	return output
}

var totalAnnotation=0

function readXMl (__filepath,p,c){
		//console.log("__filepath:"+__filepath)

		fs.readFile(__filepath, function(err, data) {
			//console.log("ICI",__filepath,p,c)

		    parser.parseString(data, function (err, result) {
       			 //console.dir(result);
       			 resultClean = transformJSON(result)
       			 //console.log('Done '+p+" "+c);
       			 if(p.length==1){p="0"+p}
       			 mainJSON.push({label:"p "+p+" "+c,p:p,c:c,times:resultClean})

       			 // save one file by annotation
       			 saveAs("output","p_"+p+"_c_"+c+".json",JSON.stringify(resultClean))
       			 //console.log("mainJSON.length",mainJSON.length)

       			 if(mainJSON.length==33){
       			 	// Save one file with all the annotations
       			 	saveAs("output","main.json",JSON.stringify(mainJSON))
       			 	console.log("totalAnnotation",totalAnnotation)
       			 }
       			 //
    		});    
		});
}


// GENERAL LOOP 
function parseAll (){
	var myobject = allData.annotations
	for(var i in myobject){
	    //console.log(i+": "+myobject[i].file);
	    if(myobject[i].file!=null){
	    	var __filepath = dirname+"/"+myobject[i].file+"/"+annotationXMLFile
	    	//console.log(__filepath)
	    	readXMl(__filepath,myobject[i].p,myobject[i].c)

	    }else{
			reportLOG+=" \n missing the annotation for participant "+myobject[i].p+" condition "+myobject[i].c
	    }
	}
}
parseAll();


/*
fs.readFile("Coding/p17 tiles.annotation/annotations.xml", function(err, data) {
    parser.parseString(data);
});
*/
