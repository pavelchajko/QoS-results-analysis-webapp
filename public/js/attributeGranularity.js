//get the dimension id and instanciate a new attribute object
var jsonFile ="";
var dimension = localStorage.getItem('dimension');
var globalValue = localStorage.getItem('globalValue');
var dimensionName = localStorage.getItem('dimensionName');
var source = localStorage.getItem('source');
$( document ).ready(function(){
    //NEW OBJECT OF TYPE ATTRIBUTE so we can get the path
	var attributeObject = new attribute(dimension,source);
	jsonFile = attributeObject.getJsonFIle();
	//getAggregationAttributes function definition
			 function getAggregationAttributes(jsonFile){
			 	var update = document.getElementById('aggregationAttributes');
			 	update.innerHTML+="Aggregation attributes:";
			 	

				if(dimension == "population") {
                    for (i = 0; i < jsonFile.length; i++) {
                        if (i != jsonFile.length - 1) {
                            var classa = "'" + jsonFile[i].Attribute + "'";
                            update.innerHTML += " <a title='No value granularity over this dimension.' href='#' class=" + classa + ">" + jsonFile[i].Attribute + "</a>" + ",";
                        }
                        else {
                            var classa = "'" + jsonFile[i].Attribute + "'";
                            update.innerHTML += " <a title='No value granularity over this dimension.' href='#' class=" + classa + ">" + jsonFile[i].Attribute + "</a>" + "";
                        }
                    }
                }
                else{
                    for(i=0;i<jsonFile.length;i++){
                        if(i!=jsonFile.length-1){
                            var classa = "'"+jsonFile[i].Attribute+"'";
                            update.innerHTML += " <a title='go to Value Granularity' href='valueGranularity.html' class="+classa+">"+jsonFile[i].Attribute + "</a>"+ ",";
                        }
                        else{
                            var classa = "'"+jsonFile[i].Attribute+"'";
                            update.innerHTML += " <a title='go to Value Granularity' href='valueGranularity.html' class="+classa+">"+jsonFile[i].Attribute + "</a>"+ "";
                        }
                    }
				}
             }
	//getRules function definion
			 function getRules(jsonFile){
			 	var update = document.getElementById('aggregationAttributes');
			 	update.innerHTML+="Rules:";
			 	
				for(i=0;i<jsonFile.length;i++){
					
					
				
					if(i!=jsonFile.length-1){
					 var classa = jsonFile[i].RuleAntecedent+"_"+jsonFile[i].RuleConsequent;
			    	  update.innerHTML += " <a title='go to Value Granularity' href='valueGranularity.html' class='"+classa+"'>"+jsonFile[i].RuleAntecedent +"_"+jsonFile[i].RuleConsequent+ "</a>"+ ",";
			    	}
			    	else{
			    	var classa = jsonFile[i].RuleAntecedent+"_"+jsonFile[i].RuleConsequent;
			    	 update.innerHTML += " <a title='go to Value Granularity' href='valueGranularity.html' class='"+classa+"'>"+jsonFile[i].RuleAntecedent+"_"+jsonFile[i].RuleConsequent+ "</a>"+ "";
			    	}
				}	
			 }

	 //get volume values function definition
			  function getVolumeValues(dimension){
			 	
			  	var url = "/volume?firstFolder=public/dataSources/"+source+"/DQAssessment_results/&dimension="+dimension;
			   	var xmlHttp = new XMLHttpRequest();
			    xmlHttp.open( "GET", url, false ); // false for synchronous request
			    xmlHttp.send();
			    return xmlHttp.responseText;
		   		
			 }

	//update attributeGranularity.html
	//check if the file exits..because if <1 it means the server responded with ""
		if(jsonFile.length>1){
		jsonFile = JSON.parse(jsonFile);
			if(dimension!="consistency"){
				getAggregationAttributes(jsonFile);
			}
			else if(dimension=="consistency"){
				getRules(jsonFile);
			}
		}
		else{
			var AA = document.getElementById('aggregationAttributes');
			AA.innerHTML += "No attribute granularity results over this dimension. You can still explore value level over:";
			AA.innerHTML += "<ul>";
			if(dimension=="volume"){
				var x =getVolumeValues(dimension);
				x=JSON.parse(x);
				
				for(var i in x){
					if(i!=x.length-1){

						AA.innerHTML += "<li><a title='go to Value Granularity' href='valueGranularity.html' class='"+x[i]+"'>"+x[i]+"</a></li> ";
					}
					else{
						AA.innerHTML += "<li><a title='go to Value Granularity' href='valueGranularity.html' class='"+x[i]+"'>"+x[i]+"</a></li>";
					}
				}
			}


			AA.innerHTML +="</ul>";

		}
	 

	 var di = document.getElementById("dimensionName");
	 di.innerHTML += dimensionName;

	 var glo = document.getElementById("globalGranularity");
  	 glo.innerHTML += globalValue;

  	 // EXTRACT VALUE FOR HTML HEADER.
        var col = [];
        for (var i = 0; i < jsonFile.length; i++) {
            for (var key in jsonFile[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
		if(dimension=="distinctness") {
			var maxDistinctness = 1;
			var position = -1;
			for (var j = 0; j < jsonFile.length; j++) {
				if (jsonFile[j].DistinctCount > maxDistinctness) {
					maxDistinctness = jsonFile[j].DistinctCount;
					position = j;
				}
			}
		}
        for (var i = 0; i < jsonFile.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonFile[i][col[j]];
                if(dimension=="completeness_frequency") {

						if (jsonFile[i].CompletenessFrequencyValue<0.7){
                            tabCell.style = "background:red";
						}
                        if (jsonFile[i].CompletenessFrequencyValue>0.7){
                            tabCell.style = "background:green";
						}
                }

                if(dimension=="completeness_missing") {

                        if (jsonFile[i].CompletenessMissingValue<0.85){
                            tabCell.style = "background:red";
                        }
                        if (jsonFile[i].CompletenessMissingValue>0.85){
                            tabCell.style = "background:green";
                        }
                }
                if(dimension=="population") {

                    if (jsonFile[i].CompletenessPopulationValue<1.0){
                        tabCell.style = "background:red";
                    }
                    else{
                        tabCell.style = "background:green";
                    }
                }

                if(dimension=="precision") {

                    if (jsonFile[i].Precision<0.6){
                        tabCell.style = "background:red";
                    }
                    if (jsonFile[i].Precision>0.6){
                        tabCell.style = "background:green";
                    }
                }

                if(dimension=="timeliness") {

                    if (jsonFile[i].TimelinessMean<0.3){
                        tabCell.style = "background:red";
                    }
                    if (jsonFile[i].TimelinessMean>0.3){
                        tabCell.style = "background:green";
                    }
                }
                if(dimension=="distinctness" && i==position) {

                   tabCell.style = "background:green";
                   var update = document.getElementById("attributeDescription");
                   update.innerHTML = "Attribute level of granularity shows all attributes selected in the quality analysis. Highlighted the attribute with highest Distinct Count.";
                }

            }
        }

        // FINALLY RENDER THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        //prepare for exploring valueGranularity
        $("a").click(function(){
	    var attributeOfAggregation = $(this).attr("class");
		localStorage.setItem('attributeOfAggregation',attributeOfAggregation)
		localStorage.setItem('dimension',dimension);
		localStorage.setItem('source',source);
        });
});


