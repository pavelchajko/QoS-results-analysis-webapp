 
function detailObject(arrOfValues,attributeOfAggregation,source){
    console.log(source);
    this.url = "/set?firstFolder=public/dataSources/"+source+"/DQAssessment_results&attributeOfAggregation="+attributeOfAggregation;

    this.array = JSON.stringify([arrOfValues]);
    
  //Methods

   this.getDetailed = function(){
     var result;
   	 $.ajax({
            type:'POST',
            data: this.array,
            contentType: 'application/json',
            url: this.url, 
            async:false
            
            }).done(function ( info ) {
                  info = JSON.stringify(info);
                  info = JSON.parse(info);
                  result = info;
              });
   
    return result;
   }


}

 
