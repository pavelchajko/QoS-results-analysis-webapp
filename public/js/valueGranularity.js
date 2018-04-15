//get the dimension, aggregation attribute and instanciate a new valueClass object
var jsonFile ="";
//var ranges = [];
var groupsHolders =[];
var rangeName ="";
var range ="";
var attributeOfAggregation ="";
var dimensionName="";
var source = "";
var customValue= "";
var arrLow =[];var arrMed=[];var arrHigh=[];
localStorage.removeItem('arrayOfValues');
$( document ).ready(function(){
	attributeOfAggregation = localStorage.getItem('attributeOfAggregation');
    dimensionName = localStorage.getItem('dimension');
    source = localStorage.getItem('source');

    //NEW OBJECT OF TYPE Value
	var valueObject = new value(dimensionName,attributeOfAggregation,source);
	jsonFile = valueObject.getJsonFIle();
	

	jsonFile = JSON.parse(jsonFile);


	 var di = document.getElementById("dimensionName");
	 di.innerHTML += dimensionName;

	 var glo = document.getElementById("aggregationAttribute");
     glo.innerHTML += attributeOfAggregation;

    if(dimensionName=="accuracy"){
        rangeName = "AccuracyValue";
        groupsHolders =[0.01,0.1];
        var temp = jsonFile[0];
        var count =-1;
        for(var i in temp){
            count=count+1;
            if(i =="AccuracyDynamic"){
                range = count;
            }
        }
        var low=0,med=0,high=0;
        arrLow =[],arrMed=[],arrHigh=[];
        for(var i in jsonFile){
            if(jsonFile[i].AccuracyDynamic<groupsHolders[0]){
                low+=1;
                arrLow.push(jsonFile[i].Value);
            }
            if(jsonFile[i].AccuracyDynamic>=groupsHolders[0] && jsonFile[i].AccuracyDynamic<groupsHolders[1]){
                med+=1;
                arrMed.push(jsonFile[i].Value);
            }
            else if(jsonFile[i].AccuracyDynamic>groupsHolders[1]){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
            }

        }
    }
    if(dimensionName=="timeliness"){
        rangeName = "Timeliness";
        groupsHolders =[0.4,0.6];

        var temp = jsonFile[0];
        var count =-1;
        for(var i in temp){
            count=count+1;
            if(i =="TimelinessMean"){
                range = count;
            }
        }
        var low=0,med=0,high=0;
        arrLow =[],arrMed=[],arrHigh=[];
        for(var i in jsonFile){
            if(jsonFile[i].TimelinessMean<groupsHolders[0]){
                low+=1;
                arrLow.push(jsonFile[i].Value);
            }
            if(jsonFile[i].TimelinessMean>=groupsHolders[0] && jsonFile[i].TimelinessMean<groupsHolders[1]){
                med+=1;
                arrMed.push(jsonFile[i].Value);
            }
            else if(jsonFile[i].TimelinessMean>groupsHolders[1]){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
            }

        }
    }
    if(dimensionName=="precision"){
        rangeName = "Precision";
        groupsHolders =[0.4,0.6];

        var temp = jsonFile[0];
        var count =-1;
        for(var i in temp){
            count=count+1;
            if(i =="Precision"){
                range = count;
            }
        }
        var low=0,med=0,high=0;
        arrLow =[],arrMed=[],arrHigh=[];
        for(var i in jsonFile){
            if(jsonFile[i].Precision<0.40){
                low+=1;
                arrLow.push(jsonFile[i].Value);
            }
            if(jsonFile[i].Precision>=0.40 && jsonFile[i].Precision<0.60){
                med+=1;
                arrMed.push(jsonFile[i].Value);
            }
            else if(jsonFile[i].Precision>0.60){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
            }

        }
    }
    if(dimensionName=="completeness_frequency"){
        rangeName = "CompletenessFrequencyValue";
         groupsHolders =[0.35,0.80];

            var temp = jsonFile[0];
            var count =-1;
            for(var i in temp){
              count=count+1;
              if(i =="CompletenessFrequencyValue"){
                range = count;
              }
            }
           var low=0,med=0,high=0;
           arrLow =[],arrMed=[],arrHigh=[];
           for(var i in jsonFile){
              if(jsonFile[i].CompletenessFrequencyValue<0.35){
                low+=1;
                arrLow.push(jsonFile[i].Value);
              }
              if(jsonFile[i].CompletenessFrequencyValue>=0.35 && jsonFile[i].CompletenessFrequencyValue<0.80){
                med+=1;
                arrMed.push(jsonFile[i].Value);
              }
              else if(jsonFile[i].CompletenessFrequencyValue>0.80){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
              }

           }
      }
    if(dimensionName=="completeness_missing"){
        rangeName = "CompletenessMissingValue";
         groupsHolders =[0,1];

         var temp = jsonFile[0];
            var count =-1;
            for(var i in temp){
              count=count+1;
              if(i =="CompletenessMissingValue"){
                range = count;
              }
            }
           var low=0,med=0,high=0;
           arrLow =[],arrMed=[],arrHigh=[];
           for(var i in jsonFile){
              if(jsonFile[i].CompletenessMissingValue==0){
                low+=1;
                arrLow.push(jsonFile[i].Value);
              }
              if(jsonFile[i].CompletenessMissingValue>0 && jsonFile[i].CompletenessMissingValue<1){
                  med+=1;
                  arrMed.push(jsonFile[i].Value);
              }
              else if(jsonFile[i].CompletenessMissingValue==1){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
              }

           }
      }
    if(dimensionName=="volume"){
        rangeName = "VolumeValue";
         groupsHolders =[0.0005,0.01];

         var temp = jsonFile[0];
            var count =-1;
            for(var i in temp){
              count=count+1;
              if(i =="VolumeValue"){
                range = count;
              }
            }
           var low=0,med=0,high=0;
           arrLow =[],arrMed=[],arrHigh=[];
           for(var i in jsonFile){
              if(jsonFile[i].VolumeValue<groupsHolders[0]){
                low+=1;
                arrLow.push(jsonFile[i].Value);
              }
              if(jsonFile[i].VolumeValue>=groupsHolders[0] && jsonFile[i].VolumeValue<groupsHolders[1]){
                med+=1;
                arrMed.push(jsonFile[i].Value);
              }
              else if(jsonFile[i].VolumeValue>groupsHolders[1]){
                high+=1;
                arrHigh.push(jsonFile[i].Value);
              }

           }
      }
    if(dimensionName=="consistency"){
         groupsHolders =[0.3,0.85];
         rangeName = "ConsistencyValue";

         var temp = jsonFile[0];
            var count =-1;
            for(var i in temp){
              count=count+1;
              if(i =="ConsistencyValue"){
                range = count;
              }
            }
           var low=0,med=0,high=0;
           arrLow =[],arrMed=[],arrHigh=[];
           for(var i in jsonFile){
              if(jsonFile[i].ConsistencyValue<groupsHolders[0]){
                low+=1;
                arrLow.push(jsonFile[i].AntecedentValue);
              }
              if(jsonFile[i].ConsistencyValue>=groupsHolders[0] && jsonFile[i].ConsistencyValue<groupsHolders[1]){
                med+=1;
                arrMed.push(jsonFile[i].AntecedentValue);
              }
              else if(jsonFile[i].ConsistencyValue>=groupsHolders[1]){
                high+=1;
                arrHigh.push(jsonFile[i].AntecedentValue);
              }

           }
      }

  var setLow = document.getElementById("low");
  setLow.innerHTML +="<"+groupsHolders[0];
  var setMed = document.getElementById("med");
  setMed.innerHTML +="value > "+groupsHolders[0] + "value <"+groupsHolders[1];
  var setHigh = document.getElementById("high");
  setHigh.innerHTML +=">"+groupsHolders[1];
  

   //creating a chart from the json file
   var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: ""
      },
      axisY: {
        title: "Count"
      },
      data: [{        
        type: "column",  
        click:onClick,
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "",
        dataPoints: [      
          { y: low, label: "Low" },
          { y: med,  label: "Medium" },
          { y: high,  label: "High" }

        ]
         
      }]
  });
  
 chart.render();
 var clickedSet;
  function onClick(e){
            clickedSet = e.dataPoint.x;
            //alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
           
            var detailedObject;
              switch(e.dataPoint.x) {

                  case 0:
                      localStorage["arrayOfValues"] = JSON.stringify(arrLow);
                      localStorage.setItem('dimensionName',dimensionName);
                      localStorage.setItem('attributeOfAggregation',attributeOfAggregation);
                      window.location.replace("detailedGranularity.html");
                      break;
                  case 1:
                  localStorage["arrayOfValues"] = JSON.stringify(arrMed);
                  localStorage.setItem('attributeOfAggregation',attributeOfAggregation);
                  localStorage.setItem('dimensionName',dimensionName);
                  window.location.replace("detailedGranularity.html");
                      break;
                  case 2:
                      localStorage["arrayOfValues"] = JSON.stringify(arrHigh);
                    localStorage.setItem('attributeOfAggregation',attributeOfAggregation);
                    localStorage.setItem('dimensionName',dimensionName);
                    window.location.replace("detailedGranularity.html");
                      break;    
              }

   }

 
  	 // CREATE THE TABLE
        
        var col = []; 
        for (var i = 0; i < jsonFile.length; i++) {
            for (var key in jsonFile[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.getElementById("table");

        //table.innerHTML+="id="example" class="display" cellspacing="0" width="100%""
      
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var thead = document.getElementById("thead")

        var tr = document.getElementById("firstTR");
        //thead.appendChild(tr);
        //var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            //ranges.push(col[i]);
            tr.appendChild(th);
        }

        var tbody = document.getElementById("tbody");
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < jsonFile.length; i++) {

            tr = tbody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if(j==0){
                    tabCell.innerHTML ="<a href=customGranularity.html class='"+jsonFile[i][col[j]]+"'>"+jsonFile[i][col[j]]+"</a>";
                }
                else{
                  tabCell.innerHTML = jsonFile[i][col[j]];
                }
            }
        }

      // FINALLY ADD THE NEWLY CREATED TABLE 
      var tt= $('#example').DataTable();
   
        // Custom filtering function which will search data in column four between two values
       var rangeSelector = document.getElementById("rangeSelector");
       //for(var i in ranges){
        //rangeSelector.innerHTML += "<span><a href=# class='"+i+"'>"+ranges[i]+"</a></span>"+ " | "; 
        rangeSelector.innerHTML += rangeName; 

       //}

        
            
            


             $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = parseFloat( $('#min').val(), 5000000 );
                    var max = parseFloat( $('#max').val(), 5000000 );
                    var age = parseFloat( data[range] ) || 0; 
             
                    if ( ( isNaN( min ) && isNaN( max ) ) ||
                         ( isNaN( min ) && age <= max ) ||
                         ( min <= age   && isNaN( max ) ) ||
                         ( min <= age   && age <= max ) )
                    {
                        return true;
                    }
                    return false;
                }
            );
         
      
       // Event listener to the two range filtering inputs to redraw on input
        $('#min, #max').keyup( function() {
       
         tt.draw();
         } );

    $("td a").click(function(){
        customValue = $(this).attr("class");
        localStorage.setItem('customValue',customValue);
        localStorage.setItem('attributeOfAggregation',attributeOfAggregation);
        localStorage.setItem('dimensionName',dimensionName);
    })


    $('#example').on( 'draw.dt', function () {
        $("td a").click(function(){
            customValue = $(this).attr("class");
            localStorage.setItem('customValue',customValue);
            localStorage.setItem('attributeOfAggregation',attributeOfAggregation);
            localStorage.setItem('dimensionName',dimensionName);
        })
    } );

      

});

