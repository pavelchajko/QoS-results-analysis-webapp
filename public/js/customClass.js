
function custom(customValue,attributeOfAggregation,dimensionName,source){

    //this.dimension=dimensionName;
    this.aggregationAttributes=[];
    this.url = "/custom?firstFolder=public/dataSources/"+source+"/DQAssessment_results/&customValue="+customValue+"/&attribute="+attributeOfAggregation+"&dimensionName="+dimensionName;
  
  //Methods
   this.getPath = function(){
	 return this.url;
   }

   this.getJsonFIle = function(){
   	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", this.url, false ); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
   }
}


