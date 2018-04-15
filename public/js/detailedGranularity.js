var jsonFile;
var arrayOfValues = JSON.parse(localStorage["arrayOfValues"]);
var attributeOfAggregation = localStorage.getItem('attributeOfAggregation');
var dimensionName = localStorage.getItem('dimensionName');
var source = localStorage.getItem('source');
//console.log(dimensionName+source+attributeOfAggregation);
$( document ).ready(function(){
  var update = document.getElementById("attributeOfAggregation");
  update.innerHTML+=attributeOfAggregation;
	 //size = size[0].substring(0);
    //size = size[0];
	 //size = size.split(",");
	 var size = arrayOfValues.length;
	var detailedObject = new detailObject(arrayOfValues,attributeOfAggregation,source);
    var jsonObject = detailedObject.getDetailed();
      
    var GlobalAccuracyDynamic=0.0,GlobalAccuracyStatic=0.0,GlobalCompletenessFrequency=0.0,
    GlobalCompletenessMissing=0.0,GlobalConsistency=0.0,GlobalPrecision=0.0,GlobalVolume=0.0; GlobalTimeliness=0.0;
     for(var i in jsonObject){

    	if(jsonObject[i].hasOwnProperty('AccuracyDynamic')){
    		GlobalAccuracyDynamic= GlobalAccuracyDynamic+jsonObject[i].AccuracyDynamic;
    	}
    	if(jsonObject[i].hasOwnProperty('AccuracyStatic')){
    		GlobalAccuracyStatic= GlobalAccuracyStatic+jsonObject[i].AccuracyStatic;
    	}
    	if(jsonObject[i].hasOwnProperty('CompletenessFrequencyValue')){
    		GlobalCompletenessFrequency= GlobalCompletenessFrequency+jsonObject[i].CompletenessFrequencyValue;
    	}
    	if(jsonObject[i].hasOwnProperty('CompletenessMissingValue')){
    		GlobalCompletenessMissing= GlobalCompletenessMissing+jsonObject[i].CompletenessMissingValue;
    	}
    	if(jsonObject[i].hasOwnProperty('ConsistencyValue')){
    		GlobalConsistency= GlobalConsistency+jsonObject[i].ConsistencyValue;
    	}
    	if(jsonObject[i].hasOwnProperty('Precision')){
    		GlobalPrecision= GlobalPrecision+jsonObject[i].Precision;
    	}
    	if(jsonObject[i].hasOwnProperty('VolumeValue')){
    		GlobalVolume= GlobalVolume+jsonObject[i].VolumeValue;
    	}
      if(jsonObject[i].hasOwnProperty('TimelinessMean')){
        GlobalTimeliness= GlobalTimeliness+jsonObject[i].TimelinessMean;
      }
    }
   

   var update = document.getElementById("accuracy-body");
   update.innerHTML += "<p>Accuracy Static: "+(GlobalAccuracyStatic/size).toFixed(2)+"</p>";
   update.innerHTML += "<p>Accuracy Dynamic: "+(GlobalAccuracyDynamic/size).toFixed(2)+"</p>";

   var update = document.getElementById("completenessFrequency-body");
   update.innerHTML += "<p>Value: "+(GlobalCompletenessFrequency/size).toFixed(2)+"</p>";

   var update = document.getElementById("completenessMissing-body");
   update.innerHTML += "<p>Value: "+(GlobalCompletenessMissing/size).toFixed(2)+"</p>";

   var update = document.getElementById("consistency-body");
   update.innerHTML += "<p>Value: "+(GlobalConsistency/size/2).toFixed(2)+"</p>";

   var update = document.getElementById("precision-body");
   update.innerHTML += "<p>Value: "+(GlobalPrecision/size).toFixed(2)+"</p>";

   var update = document.getElementById("volume-body");
   update.innerHTML += "<p>Value: "+(GlobalVolume/size).toFixed(2)+"</p>";

    var update = document.getElementById("timeliness-body");
   update.innerHTML += "<p>Value: "+(GlobalTimeliness/size).toFixed(2)+"</p>";


   $.ajax({
            type:'get',
            url: "/getAllAttributes?firstFolder=public/dataSources/"+source+"/DQAssessment_results&attributeOfAggregation="+attributeOfAggregation+"&dimensionName="+dimensionName,
            async:false
            
            }).done(function ( info ) {
                  info = JSON.stringify(info);
                  info = JSON.parse(info);
                  jsonFile = info;
              });


  var accuracy = [],compFreq = [], compMiss = [], consistency = [], precision = [], timeliness = [], compPop = [], dist = []; 
  for(var i in jsonFile){
    if(jsonFile[i].hasOwnProperty("AccuracyDynamic")){
        accuracy.push(jsonFile[i]);
    }

    if(jsonFile[i].hasOwnProperty("CompletenessFrequencyValue")){
        compFreq.push(jsonFile[i]);
    }

    if(jsonFile[i].hasOwnProperty("CompletenessMissingValue")){
        compMiss.push(jsonFile[i]);
    }

    if(jsonFile[i].hasOwnProperty("ConsistencyValue")){
        consistency.push(jsonFile[i]);
    }

    if(jsonFile[i].hasOwnProperty("Precision")){
        precision.push(jsonFile[i]);
    }
    if(jsonFile[i].hasOwnProperty("TimelinessMean")){
        timeliness.push(jsonFile[i]);
    }
      if(jsonFile[i].hasOwnProperty("DistinctCount")){
        dist.push(jsonFile[i]);
    }
     if(jsonFile[i].hasOwnProperty("CompletenessPopulationValue")){
        compPop.push(jsonFile[i]);
    }

  

  }

 

  if(accuracy!=""){
    var update = document.getElementById("accuracy-body1");

     update.innerHTML += "<p>Accuracy Static: "+accuracy[0].AccuracyStatic.toFixed(2)+"</p>";
     update.innerHTML += "<p>Accuracy Dynamic: "+accuracy[0].AccuracyDynamic.toFixed(2)+"</p>";
   }
   if(compFreq!=""){
    var update = document.getElementById("completenessFrequency-body1");
    update.innerHTML += "<p>Value: "+compFreq[0].CompletenessFrequencyValue.toFixed(2)+"</p>";
   }
   if(compMiss!=""){
    var update = document.getElementById("completenessMissing-body1");
    update.innerHTML += "<p>Value: "+compMiss[0].CompletenessMissingValue.toFixed(2)+"</p>";
   }
   //make a change of consistency so it takes into account if more are present
   if(consistency!=""){
    var update = document.getElementById("consistency-body1");
    update.innerHTML += "<p>Value:"+consistency[0].ConsistencyValue.toFixed(2)+"RuleAnt:"+consistency[0].RuleAntecedent+"</br>RuleCon:"+consistency[0].RuleConsequent;
      if(consistency.length>1){
       update.innerHTML +="</br>"+"Value:"+consistency[1].ConsistencyValue.toFixed(2)+"RuleAnt:"+consistency[1].RuleAntecedent+"RuleConsq:"+consistency[1].RuleConsequent+"</p>";

      }
      if(consistency.length>2){
       update.innerHTML +="</br>"+"Value:"+consistency[2].ConsistencyValue.toFixed(2)+"RuleAnt:"+consistency[2].RuleAntecedent+"RuleConsq:"+consistency[2].RuleConsequent+"</p>";

      }
      if(consistency.length>3){
       update.innerHTML +="</br>"+"Value:"+consistency[3].ConsistencyValue.toFixed(2)+"RuleAnt:"+consistency[3].RuleAntecedent+"RuleConsq:"+consistency[3].RuleConsequent+"</p>";

      }
   }
   if(precision!=""){
    var update = document.getElementById("precision-body1");
    update.innerHTML += "<p>Value: "+precision[0].Precision.toFixed(2)+"</p>";
   }
   if(timeliness!=""){
    var update = document.getElementById("timeliness-body1");
    update.innerHTML += "<p>Mean: "+timeliness[0].TimelinessMean.toFixed(2)+"</br>Min:"+timeliness[0].TimelinessMin+"</br>Max:"+timeliness[0].TimelinessMax.toFixed(2)+"</p>";
   }
   if(dist!=""){
    var update = document.getElementById("dist-body1");
    update.innerHTML += "<p>DistincCount: "+dist[0].DistinctCount+"</br>Distinctness:"+dist[0].Distinctness+"</p>";
   }
   if(compPop!=""){
    var update = document.getElementById("compPop-body1");
    update.innerHTML += "<p>DistincCount: "+compPop[0].DistinctCount+"</br>Compl.Pop:"+compPop[0].CompletenessPopulationValue.toFixed(2)+"</p>";
   }
   
 
});