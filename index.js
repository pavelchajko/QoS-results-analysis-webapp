var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
url = require('url');
const util = require('util');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));

//get data Sources
app.get('/getSources', function(req,res){

    var url_parts = url.parse(req.url,true);
    let directory = url_parts.query.firstFolder;
    var arr = [];
    var index = -1;
    let sources = fs.readdirSync(directory);
    for(var i in sources){
        arr.push(sources[i]);
        index = 1;
    }
    if(index!=-1){
        res.send(arr);
    }
    else{
        res.send("sources not present!!");
    }

});

app.get('/getListOfDimensions', function(req,res){

    var url_parts = url.parse(req.url,true);
    let directory = url_parts.query.firstFolder;
    var arr = [];
    var index = -1;
    let folders = fs.readdirSync(directory);
    for(var i in folders){
        if(folders[i].includes("_attributes")){
            arr.push(folders[i].substring(0,folders[i].indexOf("_attributes")));

        }
        //
        index = 1;
    }
    if(index!=-1){
        res.send(arr);
    }
    else{
        res.send("folders not present!!");
    }

});

app.get('/directLink', function(req,res){

    var url_parts = url.parse(req.url,true);
    let directory = url_parts.query.firstFolder;
    var arr = [];
    var index = -1;
    let folders = fs.readdirSync(directory);
    for(var i in folders){
    	if(folders[i].includes("_values")){
            arr.push(folders[i].replace("_values",""));

		}
        //
        index = 1;
    }
    if(index!=-1){
        res.send(arr);
    }
    else{
        res.send("folders not present!!");
    }

});

//to get the tables for results.js
 app.get('/getResults', function(req,res){
	
	  var url_parts = url.parse(req.url,true);
     let directory = url_parts.query.firstFolder;
     let attribute = url_parts.query.selectedAtr;
     let valuesArray = url_parts.query.filterArr;
     var valuesFolder = [];
    
     var compMissArr = [];
     var compFreqArr = [];
     var consArr = [];
     var volArr = [];
     var timelinessArr = [];
	 var precisionArr = [];
     var finalResult = {"compMissArr" :[], "compFreqArr":[], "volArr":[], "consArr":[], "timelinessArr":[], "precisionArr":[]};

     valuesArray = valuesArray.split(",").map(Number);
     let firstFolders = fs.readdirSync(directory);
     var index = -1;
     var att=-1;
     var minL = 300;
    
     for(var i in firstFolders){
     	if( (firstFolders[i].includes("values"))  && (!firstFolders[i].includes("accuracy")) ){
     		valuesFolder.push(firstFolders[i]);
     	}

     }
     for(var i in valuesFolder){
     	 var arr =[];
     	if(valuesFolder[i].includes("completeness_missing") && valuesArray[0]!=2 ){
     		var current = directory+"/"+valuesFolder[i];
			let currentFolder = fs.readdirSync(current);
			
					for(var j in currentFolder){
						if(currentFolder[j].includes(attribute)){
							arr.push(currentFolder[j]);
						}
					 }
				for(var j in arr){
				 	if((arr[j].length)<minL){
				   		minL = arr[j].length;
				    	att =j;
				  	}
			    }




						index = -1;
						let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
							     for(var k in thirdFolder) {
								   	if(path.extname(thirdFolder[k]) === ".json") {
								       index = k;

								   	}
								   	
								 }

						 let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
						 let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
						 let str = rawdata.replace(/\n/g, ",");
						 str = str.slice(0,-1);
						 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
						 fileToJson = JSON.parse(fileToJson);
								
							for(var q in fileToJson){
							 
							 	 
						   		 if(fileToJson[q].CompletenessMissingValue == valuesArray[0]){
								 compMissArr.push(fileToJson[q]);
								 }
							 
						   }

				
		}
     	
		if(valuesFolder[i].includes("completeness_frequency") && valuesArray[1]!=2  && valuesArray[2]!=2){
     		var current = directory+"/"+valuesFolder[i];
			let currentFolder = fs.readdirSync(current);
			
					for(var j in currentFolder){
						if(currentFolder[j].includes(attribute)){
							arr.push(currentFolder[j]);
						}
					 }
				for(var j in arr){
				 	if((arr[j].length)<minL){
				   		minL = arr[j].length;
				    	att =j;
				  	}
			    }




						index = -1;
						let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
							     for(var k in thirdFolder) {
								   	if(path.extname(thirdFolder[k]) === ".json") {
								       index = k;

								   	}
								   	
								 }

						 let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
						 let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
						 let str = rawdata.replace(/\n/g, ",");
						 str = str.slice(0,-1);
						 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
						 fileToJson = JSON.parse(fileToJson);
								
							for(var q in fileToJson){
							 
							 	 
						   		 if( (fileToJson[q].CompletenessFrequencyValue >= valuesArray[1]) && (fileToJson[q].CompletenessFrequencyValue <= valuesArray[2]) ){
								 compFreqArr.push(fileToJson[q]);
								 }
							 
						   }

				
		}

     	if(valuesFolder[i].includes("consistency") && valuesArray[5]!=2 && valuesArray[6]!=2 ){
     		var current = directory+"/"+valuesFolder[i];
			let currentFolder = fs.readdirSync(current);
			var tempAtt = "";

			
					for(var j in currentFolder){
						if(!attribute.includes("_")){
							if((currentFolder[j].includes(attribute)) && (!currentFolder[j].includes("_"+attribute)) && (!currentFolder[j].includes(","))){
							arr.push(currentFolder[j]);
							}
						}
						if(attribute.includes("_")){

							tempAtt = attribute.replace("_",",");
							if(currentFolder[j].includes(tempAtt)){
								arr.push(currentFolder[j]);
							}
						}
					 }
					 
				

			    for(var att in arr){


						index = -1;
						let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
							     for(var k in thirdFolder) {
								   	if(path.extname(thirdFolder[k]) === ".json") {
								       index = k;

								   	}
								   	
								 }

						 let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
						 let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
						 let str = rawdata.replace(/\n/g, ",");
						 str = str.slice(0,-1);
						 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
						 fileToJson = JSON.parse(fileToJson);
								
							for(var q in fileToJson){
							 
							 	 
						   		 if( (fileToJson[q].ConsistencyValue >= valuesArray[5]) && (fileToJson[q].ConsistencyValue <= valuesArray[6]) ){
								 consArr.push(fileToJson[q]);
								 }
							 
						   }
				}
		
		}

		if(valuesFolder[i].includes("volume") && valuesArray[3]!=2 && valuesArray[4]!=2){
     		var current = directory+"/"+valuesFolder[i];
			let currentFolder = fs.readdirSync(current);
			
					for(var j in currentFolder){
						if(currentFolder[j].includes(attribute)){
							arr.push(currentFolder[j]);
						}
					 }
				for(var j in arr){
				 	if((arr[j].length)<minL){
				   		minL = arr[j].length;
				    	att =j;
				  	}
			    }




						index = -1;
						let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
							     for(var k in thirdFolder) {
								   	if(path.extname(thirdFolder[k]) === ".json") {
								       index = k;

								   	}
								   	
								 }

						 let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
						 let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
						 let str = rawdata.replace(/\n/g, ",");
						 str = str.slice(0,-1);
						 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
						 fileToJson = JSON.parse(fileToJson);
								
							for(var q in fileToJson){
							 
							 	 
						   		 if( (fileToJson[q].VolumeValue >= valuesArray[3]) && (fileToJson[q].VolumeValue <= valuesArray[4]) ) {
								 volArr.push(fileToJson[q]);
								 }
							 
						   }
		
		}

		if(valuesFolder[i].includes("timeliness") && valuesArray[7]!=2  && valuesArray[8]!=2){
             var current = directory+"/"+valuesFolder[i];
             let currentFolder = fs.readdirSync(current);

             for(var j in currentFolder){
                 if(currentFolder[j].includes(attribute)){
                     arr.push(currentFolder[j]);
                 }
             }
             for(var j in arr){
                 if((arr[j].length)<minL){
                     minL = arr[j].length;
                     att =j;
                 }
             }




             index = -1;
             let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
             for(var k in thirdFolder) {
                 if(path.extname(thirdFolder[k]) === ".json") {
                     index = k;

                 }

             }

             let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
             let rawdata = fs.readFileSync(jsonFile,'utf-8');
             let str = rawdata.replace(/\n/g, ",");
             str = str.slice(0,-1);
             let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
             fileToJson = JSON.parse(fileToJson);

             for(var q in fileToJson){


                 if( (fileToJson[q].TimelinessMean >= valuesArray[7]) && (fileToJson[q].TimelinessMean <= valuesArray[8]) ){
                     timelinessArr.push(fileToJson[q]);
                 }

             }


         }

         if(valuesFolder[i].includes("precision") && valuesArray[9]!=2  && valuesArray[10]!=2){
             var current = directory+"/"+valuesFolder[i];
             let currentFolder = fs.readdirSync(current);

             for(var j in currentFolder){
                 if(currentFolder[j].includes(attribute)){
                     arr.push(currentFolder[j]);
                 }
             }
             for(var j in arr){
                 if((arr[j].length)<minL){
                     minL = arr[j].length;
                     att =j;
                 }
             }
             index = -1;
             let thirdFolder = fs.readdirSync(current+"/"+arr[att]);
             for(var k in thirdFolder) {
                 if(path.extname(thirdFolder[k]) === ".json") {
                     index = k;

                 }

             }
             let jsonFile = current+"/"+arr[att]+"/"+thirdFolder[index];
             let rawdata = fs.readFileSync(jsonFile,'utf-8');
             let str = rawdata.replace(/\n/g, ",");
             str = str.slice(0,-1);
             let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
             fileToJson = JSON.parse(fileToJson);

             for(var q in fileToJson){
                 if( (fileToJson[q].Precision >= valuesArray[9]) && (fileToJson[q].Precision <= valuesArray[10]) ){
                     precisionArr.push(fileToJson[q]);

                 }
             }


         }
     }

    finalResult.compMissArr = JSON.stringify(compMissArr);
    finalResult.compFreqArr = JSON.stringify(compFreqArr);
    finalResult.volArr = JSON.stringify(volArr);
    finalResult.consArr = JSON.stringify(consArr);
    finalResult.timelinessArr = JSON.stringify(timelinessArr);
    finalResult.precisionArr = JSON.stringify(precisionArr);
	//finalResult = JSON.stringify(finalResult);
	//finalResult = JSON.parse(finalResult);
     res.send(finalResult);
		
});

app.get('/getAttributes', function(req,res){
	
	 var url_parts = url.parse(req.url,true);
     let directory = url_parts.query.firstFolder;
     var attributes = []; 

		let folders = fs.readdirSync(directory);
		for(var i in folders) {
		 	if(folders[i].includes("_attributes")){
		 			let folder = directory + "/" + folders[i];
			 		let jsonFolder = fs.readdirSync(folder);
			 		var index = -1;
			 		for(var j in jsonFolder){
			 			if(path.extname(jsonFolder[j]) === ".json") {
					       index = j;
					   	}
			 		}
			 		let file = folder+"/"+jsonFolder[index];
					let rawdata = fs.readFileSync(file,'utf-8');
					let str = rawdata.replace(/\n/g, ",");
					str = str.slice(0,-1);
					let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
					fileToJson = JSON.parse(fileToJson);
					for(var i in fileToJson){
						if(fileToJson[i].Attribute){
							if(attributes.indexOf(fileToJson[i].Attribute) === -1) {
						      attributes.push(fileToJson[i].Attribute);
						      
						    }
						}
					}
						
					
		 	}

	 		
		}

		
		res.send(attributes);
});

//to get final_quality
app.get('/folder', function(req,res){
	
	 var url_parts = url.parse(req.url,true);
     let directory = url_parts.query.query;
    
		let files = fs.readdirSync(directory);
		var index = -1;
		for(var i in files) {
		   	if(path.extname(files[i]) === ".json") {
		       //res.send(files[i]);
		       index = i;
		   	}
		   	
		}
		if(index!=-1){
			res.send(files[index]);
		}
		else{
			res.send("file not present!!");
		}

});


//to get dimension from attribute folder
app.get('/attribute', function(req,res){
	
	 var url_parts = url.parse(req.url,true);
     let firstFolder = url_parts.query.firstFolder;
     let dimension = url_parts.query.dimension;

     
	 let files = fs.readdirSync(firstFolder);
	 var index = -1;
	 for(var i in files) {
	 	if(files[i].includes(dimension+"_attributes")){
	 		index = i;
	 		}
	 	
	 }
     if(index!=-1){
	     let dimensionFolder = files[index];
	     let finalUrl = firstFolder+dimensionFolder;
	     let secondFolder = fs.readdirSync(finalUrl);
	     index = -1;
	     for(var i in secondFolder) {
		   	if(path.extname(secondFolder[i]) === ".json") {
		       index = i;

		   	}
		   	
		 }
		 let file = finalUrl+"/"+secondFolder[index];
		 let rawdata = fs.readFileSync(file,'utf-8');  
		 
		 let str = rawdata.replace(/\n/g, ",");
		 str = str.slice(0,-1);
		 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
		 fileToJson = JSON.parse(fileToJson);
		 if(dimension == "precision"){
		 	for(var i in fileToJson){
		 		fileToJson[i].Precision = fileToJson[i].Precision.toFixed(2);
			}
		 }
         if(dimension == "completeness_frequency"){
             for(var i in fileToJson){
                 fileToJson[i].CompletenessFrequencyValue = fileToJson[i].CompletenessFrequencyValue.toFixed(2);
             }
         }
         if(dimension == "completeness_missing"){
             for(var i in fileToJson){
                 fileToJson[i].CompletenessMissingValue = fileToJson[i].CompletenessMissingValue.toFixed(2);
             }
         }
         if(dimension == "accuracy"){
             for(var i in fileToJson){
                 fileToJson[i].AccuracyDynamic = (fileToJson[i].AccuracyDynamic*100).toFixed(2);
                 fileToJson[i].AccuracyStatic = (fileToJson[i].AccuracyStatic*100).toFixed(2);
             }
         }
         if(dimension == "timeliness"){
             for(var i in fileToJson){
                 fileToJson[i].TimelinessMean = (fileToJson[i].TimelinessMean).toFixed(2);
                 fileToJson[i].TimelinessMax = (fileToJson[i].TimelinessMax).toFixed(2);
                 fileToJson[i].TimelinessMin = (fileToJson[i].TimelinessMin).toFixed(2);
             }
         }
         if(dimension == "distinctness"){
             for(var i in fileToJson){
                 fileToJson[i].Distinctness = (fileToJson[i].Distinctness).toFixed(2);
             }
         }
         if(dimension == "consistency"){
             for(var i in fileToJson){
                 fileToJson[i].ConsistencyValue = (fileToJson[i].ConsistencyValue).toFixed(2);
             }
         }
         if(dimension == "completeness_population"){
             for(var i in fileToJson){
                 fileToJson[i].CompletenessPopulationValue = (fileToJson[i].CompletenessPopulationValue).toFixed(2);
             }
         }
		  res.send(fileToJson);
	  } 

	 else{
			res.send("");
		}


});


//to get value granularity from value folder
app.get('/value', function(req,res){
	
	 var arr = [];

	 var url_parts = url.parse(req.url,true);
     let firstFolder = url_parts.query.firstFolder;
     let dimension = url_parts.query.dimension;
     let attributeOfAggregation = url_parts.query.attribute;
	 let files = fs.readdirSync(firstFolder);
	 var index = -1;
	 for(var i in files) {
	 	if(files[i].includes(dimension+"_values")){
	 		index = i;
	 		}
	 	
	 }
     if(index!=-1){
			     let valuesFolder = files[index];
			     let finalUrl = firstFolder+valuesFolder;
			     let secondFolder = fs.readdirSync(finalUrl);
			     index = -1;

			     for(var j in secondFolder){
			     	if(secondFolder[j].includes(attributeOfAggregation)){
			     		arr.push(secondFolder[j]);
			     	}

			     }

			     var minL=150;

			     for(var j in arr){
			     	if((arr[j].length)<minL){
			     		minL = arr[j].length;
			     		
			     		index =j;
			     	}
			     }
			     
			     let aggregationAttributeFolder = arr[index];
			     let jsonFolder = "/"+aggregationAttributeFolder;
			    
			     let thirdFolder = fs.readdirSync(finalUrl+jsonFolder);
			    
			     index = -1;
			     for(var i in thirdFolder) {
				   	if(path.extname(thirdFolder[i]) === ".json") {
				       index = i;

				   	}
				   	
				 }

         let file = finalUrl+"/"+jsonFolder+"/"+thirdFolder[index];

         let rawdata = fs.readFileSync(file,'utf-8');

         let str = rawdata.replace(/\n/g, ",");
         str = str.slice(0,-1);
         let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
         fileToJson = JSON.parse(fileToJson);
             if (dimension == "precision") {
             	console.log(fileToJson[i]);
                 for (var i in fileToJson) {
                     fileToJson[i].Precision = fileToJson[i].Precision.toFixed(2);
                 }
             }
             if (dimension == "completeness_frequency") {
                 for (var i in fileToJson) {
                     fileToJson[i].CompletenessFrequencyValue = fileToJson[i].CompletenessFrequencyValue.toFixed(2);
                 }
             }
             if (dimension == "completeness_missing") {
                 for (var i in fileToJson) {
                     fileToJson[i].CompletenessMissingValue = fileToJson[i].CompletenessMissingValue.toFixed(2);
                 }
             }
             if (dimension == "accuracy") {
                 for (var i in fileToJson) {
                     fileToJson[i].AccuracyDynamic = (fileToJson[i].AccuracyDynamic * 100).toFixed(2);
                     fileToJson[i].AccuracyStatic = (fileToJson[i].AccuracyStatic * 100).toFixed(2);
                 }
             }
             if (dimension == "timeliness") {
                 for (var i in fileToJson) {
                     fileToJson[i].TimelinessMean = (fileToJson[i].TimelinessMean).toFixed(2);
                     fileToJson[i].TimelinessMax = (fileToJson[i].TimelinessMax).toFixed(2);
                     fileToJson[i].TimelinessMin = (fileToJson[i].TimelinessMin).toFixed(2);
                 }
             }
             if (dimension == "distinctness") {
                 for (var i in fileToJson) {
                     fileToJson[i].Distinctness = (fileToJson[i].Distinctness).toFixed(2);
                 }
             }
             if (dimension == "consistency") {
                 for (var i in fileToJson) {
                     fileToJson[i].ConsistencyValue = (fileToJson[i].ConsistencyValue).toFixed(2);
                 }
             }
             if (dimension == "completeness_population") {
                 for (var i in fileToJson) {
                     fileToJson[i].CompletenessPopulationValue = (fileToJson[i].CompletenessPopulationValue).toFixed(2);
                 }
             }

         res.send(fileToJson);



	  } 

	 else{
	 		
			res.send("");
		}


});

//to get volume values folders names
app.get('/volume', function(req,res){
		var url_parts = url.parse(req.url,true);
	 	let firstFolder = url_parts.query.firstFolder;
     	let dimension = url_parts.query.dimension;
    	
		let files = fs.readdirSync(firstFolder);
		var index = -1;

		 for(var i in files) {
		 	if(files[i].includes(dimension+"_values")){
		 		index = i;
		 		}
		 	
		 }
		 let volumeValuesFolder = files[i];
		 let finalVolumeUrl = firstFolder + volumeValuesFolder;
		 let attributesFolder = fs.readdirSync(finalVolumeUrl);

		

		if(index!=-1){
			res.send(attributesFolder);
		}
		else{
			res.send("file not present!!");
		}

});


app.get('/custom', function(req,res){
	
	var valuesFolders =[];
	var finalResult = [];
	var lengthArr = [];
	

	 var url_parts = url.parse(req.url,true);
     let firstFolder = url_parts.query.firstFolder;
     let customValue = url_parts.query.customValue;
     let dimensionName = url_parts.query.dimensionName;
     customValue=customValue.slice(0,-1);
     let attribute = url_parts.query.attribute;

		let files = fs.readdirSync(firstFolder);
		
		for(var i in files) {
		   	if(files[i].includes("_values")) {
		      valuesFolders.push(files[i]);
		   	}
		   	
		}
	if(dimensionName!="consistency"){	

		for(var i in valuesFolders){
			var finalFolder="";
			var current = firstFolder+"/"+valuesFolders[i];
				var currentArr = [];

				let currentFolder = fs.readdirSync(current);
				var min = 300;
		

			if(!(valuesFolders[i].includes("consistency"))){

				for(var j in currentFolder) {

						
							
					   		if(currentFolder[j].includes(attribute) & currentFolder[j].length <min) {
					    	 finalFolder = currentFolder[j];
					    	 min = currentFolder[j].length;
					   		}  	

				}
				
				if(min!=300){
					let thirdFolder = fs.readdirSync(current+"/"+finalFolder);
					     index = -1;
					     for(var k in thirdFolder) {
						   	if(path.extname(thirdFolder[k]) === ".json") {
						       index = k;

						   	}
						   	
						 }

					let jsonFile = current+"/"+finalFolder+"/"+thirdFolder[index];

					let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
					 let str = rawdata.replace(/\n/g, ",");
						 str = str.slice(0,-1);
						 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
						 fileToJson = JSON.parse(fileToJson);
						
						 for(var q in fileToJson){
						 	if(fileToJson[q].Value == customValue | fileToJson[q].AntecedentValue == customValue ){
						 	 finalResult.push(fileToJson[q]);
						 	}
						 }
				}
			}//if it doesn't include consistency ends here	
		   ////////////

		 	if(valuesFolders[i].includes("consistency")){
		 		
		 			for(var j in currentFolder) {	   		
					   finalFolder = currentFolder[j];
						let thirdFolder = fs.readdirSync(current+"/"+finalFolder);
					    index = -1;
					     for(var k in thirdFolder) {
						   	if(path.extname(thirdFolder[k]) === ".json") {
						       index = k;

						   	}
						   	
						 }

					let jsonFile = current+"/"+finalFolder+"/"+thirdFolder[index];
					let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
					let str = rawdata.replace(/\n/g, ",");
					str = str.slice(0,-1);
					let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
					fileToJson = JSON.parse(fileToJson);
						
					for(var q in fileToJson){
			   		 	if(fileToJson[q].AntecedentValue == customValue){
					 	 finalResult.push(fileToJson[q]);
						 	}
					 }
				}


		 	}

		}//big for ENDS HERE	

  }	//if dimension is not consistency ends here

  else{
  	for(var i in valuesFolders){
  		
			var current = firstFolder+"/"+valuesFolders[i];
			var currentArr = [];
			let currentFolder = fs.readdirSync(current);
			
			for(var j in currentFolder){
				let thirdFolder = fs.readdirSync(current+"/"+currentFolder[j]);
				index = -1;
					     for(var k in thirdFolder) {
						   	if(path.extname(thirdFolder[k]) === ".json") {
						       index = k;

						   	}
						   	
						 }

				 let jsonFile = current+"/"+currentFolder[j]+"/"+thirdFolder[index];
				 let rawdata = fs.readFileSync(jsonFile,'utf-8'); 
				 let str = rawdata.replace(/\n/g, ",");
				 str = str.slice(0,-1);
				 let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
				 fileToJson = JSON.parse(fileToJson);
						
				for(var q in fileToJson){
			   		 if(fileToJson[q].AntecedentValue == customValue || fileToJson[q].Value == customValue){
					 finalResult.push(fileToJson[q]);
					}
				}
			}

  	}


  }//if dimension is dimension ends here

	console.log(finalResult);

	res.send(finalResult);	

});//custom ends here

//used in detailObject to get the array of values
app.post('/set',function(req,res){
	var url_parts = url.parse(req.url,true);
    let Folder = url_parts.query.firstFolder;
    let attributeOfAggregation = url_parts.query.attributeOfAggregation;

	var data = req.body;
	//data = data[0].substring(0);
	//data = data.split(",");
    //console.log(data);
	valuesFolders = [];
	finalResult = [];
	testArr = [];
	let files = fs.readdirSync(Folder);
	for(var i in files) {
		   	if(files[i].includes("_values")) {
		      valuesFolders.push(files[i]);
		   	}
		   	
	}

	for(var i in valuesFolders){
			var current = Folder+"/"+valuesFolders[i];
			let currentFolder = fs.readdirSync(current);
			for(var j in currentFolder){
                if(currentFolder[j].includes(attributeOfAggregation)) {
                	//console.log(currentFolder[j]);
                    index = -1;
                        let thirdFolder = fs.readdirSync(current + "/" + currentFolder[j]);
                        for (var k in thirdFolder) {
                            if (path.extname(thirdFolder[k]) === ".json") {
                                index = k;

                            }

                        }

                        let jsonFile = current + "/" + currentFolder[j] + "/" + thirdFolder[index];
                        let rawdata = fs.readFileSync(jsonFile, 'utf-8');
                        let str = rawdata.replace(/\n/g, ",");
                        str = str.slice(0, -1);
                        let fileToJson = '[' + str.replace(/}{/g, '},{') + ']';
                        fileToJson = JSON.parse(fileToJson);

                    for (var x in data) {
                        for (var q in fileToJson) {


                                if (fileToJson[q].AntecedentValue == data[x] || fileToJson[q].Value == data[x]) {
                                    //console.log(fileToJson[q]);
                                    finalResult.push(fileToJson[q]);
                                }
                            }
                        }

                }


			}

  	}
  	res.send(finalResult);

	
});

//used in detailedGranularity to get all attriubte granularity
app.get('/getAllAttributes',function(req,res){
	var url_parts = url.parse(req.url,true);
    let Folder = url_parts.query.firstFolder;
    let attributeOfAggregation = url_parts.query.attributeOfAggregation;
	let dimensionName = url_parts.query.dimensionName;
						

	if (dimensionName == "consistency"){
		var temp = attributeOfAggregation.indexOf('_');
		attributeOfAggregation = attributeOfAggregation.substring(0,temp);
		if(attributeOfAggregation.includes(",")){
			attributeOfAggregation = attributeOfAggregation.replace(",","_");
		}

		
	}
	var arr = [];	
	var finalResult = [];

     let folders = fs.readdirSync(Folder);
	 var index = -1;
	 for(var i in folders) {
	 	if(folders[i].includes("attributes")){
	 		 arr.push(folders[i]);
	 		}
	 	
	 }
	 for(var i in arr){

	 		let folder = Folder + "/" + arr[i];
			 		let jsonFolder = fs.readdirSync(folder);
			 		var index = -1;
			 		for(var j in jsonFolder){
			 			if(path.extname(jsonFolder[j]) === ".json") {
					       index = j;
					   	}
			 		}
			 		let file = folder+"/"+jsonFolder[index];
					let rawdata = fs.readFileSync(file,'utf-8');
					let str = rawdata.replace(/\n/g, ",");
					str = str.slice(0,-1);
					let fileToJson = '['+ str.replace(/}{/g, '},{') + ']';
					fileToJson = JSON.parse(fileToJson);
					
					for(var i in fileToJson){
						if(fileToJson[i].Attribute == attributeOfAggregation || fileToJson[i].RuleAntecedent == attributeOfAggregation || fileToJson[i].RuleAntecedent == attributeOfAggregation.replace("_",",") ){
							
							finalResult.push(fileToJson[i]);
						}
					}
	 	
					
	  }


	  

  	res.send(finalResult);

	
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(8080);
