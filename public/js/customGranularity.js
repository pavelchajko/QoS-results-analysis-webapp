$( document ).ready(function(){
	var customValue = localStorage.getItem('customValue');
	var attributeOfAggregation = localStorage.getItem('attributeOfAggregation');
	var dimensionName = localStorage.getItem('dimensionName');
    var source = localStorage.getItem('source');



    //NEW OBJECT OF TYPE Value so we can get the path
	var customObject = new custom(customValue,attributeOfAggregation,dimensionName,source);
	jsonFile = customObject.getJsonFIle();
	jsonFile = JSON.parse(jsonFile);
	for(var i in jsonFile){
		var object =jsonFile[i];
		
		//console.log(object);
		for(var j in object){
			//console.log(j,object[j]);
			var update = document.getElementById("showData");


            if (j!="Value"){
                /*if (j=="Precision"){
                	object[j]=object[j].toFixed(2);
                    console.log(object[j].toFixed(2));
                    //update.innerHTML+="<span>"+j+":"+"<b>"+object[j].slice(0, 4)+"</b>"+"</span></br>";
                }*/
                if(object[j]<1){
                	object[j] = object[j].toFixed(2);
				}
                update.innerHTML+="<span>"+j+":"+"<b>"+object[j]+"</b>"+"</span></br>";
            }

		}
	}


	
    var update = document.getElementById("aggregationAttribute");
    
    update.innerHTML +="Attribute:"+ attributeOfAggregation;

    var update = document.getElementById("customValue");
    update.innerHTML += customValue;


});