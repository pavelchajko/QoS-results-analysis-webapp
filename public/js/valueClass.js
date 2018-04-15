
function value(dimension,attributeOfAggregation,source){

    //this.dimension=dimensionName;
    this.aggregationAttributes=[];
    this.url = "/value?firstFolder=public/dataSources/"+source+"/DQAssessment_results/&dimension="+dimension+"&attribute="+attributeOfAggregation;

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


