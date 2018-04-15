
var jsonFile ="";
var source = "";
var filterArr = [];
var selectedAtr;
$( document ).ready(function(){
    source = localStorage.getItem('source');
	//filterArr = localStorage.getItem('filterArr');
    filterArr = JSON.parse(localStorage["filterArr"]);
    selectedAtr = localStorage.getItem('selectedAtr');
   
  

 
	 $.ajax({
            type:'get',
            url: "/getResults?firstFolder=public/dataSources/"+source+"/DQAssessment_results&selectedAtr="+selectedAtr+"&filterArr="+filterArr,
            async:false
            
            }).done(function ( info ) {
                  info = JSON.stringify(info);
                  info = JSON.parse(info);
                  jsonFile = info;
              });
         var compMissing = jsonFile.compMissArr;
         var compFreq = jsonFile.compFreqArr;
         var Volume = jsonFile.volArr;
         var consistency = jsonFile.consArr;
         var timelinessArr = jsonFile.timelinessArr;
         var precisionArr = jsonFile.precisionArr;

         //var c = intersect_safe(a,b);
         var comp = [];
         var tempComp = JSON.parse(compMissing);
         for(var i in tempComp){
             comp.push(tempComp[i].Value);
         }
    var freq = [];
    var tempFreq = JSON.parse(compFreq);
    for(var i in tempFreq){
        freq.push(tempFreq[i].Value);
    }
    var vol = [];
    var tempVol = JSON.parse(Volume);
    for(var i in tempVol){
        vol.push(tempVol[i].Value);
    }
    var con = [];
    var tempCon = JSON.parse(consistency);
    for(var i in tempCon){
        con.push(tempCon[i].Value);
    }
    var time = [];
    var tempTime = JSON.parse(timelinessArr);
    for(var i in tempTime){
        time.push(tempTime[i].Value);
    }
    var prec = [];
    var tempPrec = JSON.parse(precisionArr);
    for(var i in tempPrec){
        prec.push(tempPrec[i].Value);
    }

         var arr = [comp,freq,vol,con,time,prec];
    var arr2 = [];
    for(var i in arr){
        if (arr[i].length>0){
            arr2.push(arr[i]);
        }
    }

   console.log(arr2);
    var tempArr=[];
    var finalArr=[];

        if(arr2.length==2){
            finalArr=intersect_safe(arr2[0],arr2[1]);
        }
        if(arr2.length==3){
        tempArr=intersect_safe(arr2[0],arr2[1]);
        finalArr=intersect_safe(tempArr,arr2[2]);
        }
        if(arr2.length==4){
        tempArr=intersect_safe(arr2[0],arr2[1]);
        tempArr=intersect_safe(tempArr,arr2[2]);
        finalArr=intersect_safe(tempArr,arr2[3]);
        }
        if(arr2.length==5){
            tempArr=intersect_safe(arr2[0],arr2[1]);
            tempArr=intersect_safe(tempArr,arr2[2]);
            tempArr=intersect_safe(tempArr,arr2[3]);
            finalArr=intersect_safe(tempArr,arr2[4]);
        }
        if(arr2.length==6){
            tempArr=intersect_safe(arr2[0],arr2[1]);
            tempArr=intersect_safe(tempArr,arr2[2]);
            tempArr=intersect_safe(tempArr,arr2[3]);
            tempArr=intersect_safe(tempArr,arr2[4]);
            finalArr=intersect_safe(tempArr,arr2[5]);
        }

    console.log(finalArr);

    function intersect_safe(a, b)
    {
        var ai=0, bi=0;
        var result = new Array();

        while( ai < a.length && bi < b.length )
        {
            if      (a[ai] < b[bi] ){ ai++; }
            else if (a[ai] > b[bi] ){ bi++; }
            else /* they're equal */
            {
                result.push(a[ai]);
                ai++;
                bi++;
            }
        }

        return result;
    }

         //VOLUME//
        if(Volume !="[]"){    
           Volume = JSON.parse(Volume);
            var col = [];
            for (var i = 0; i < Volume.length; i++) {
                for (var key in Volume[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
              var update = document.getElementById("volumeTitle");
              update.innerHTML = "Volume";
              var table = document.getElementById("volumeTable");
           
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
            var thead = document.createElement("thead")
            var tr = document.createElement("tr");
            thead.appendChild(tr);
            table.appendChild(thead);

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);

            for (var i = 0; i < Volume.length; i++) {

                tr = tbody.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = Volume[i][col[j]];
                }
            }

            // FINALLY SHOW THE TABLE
            var tt = $('#volumeTable').DataTable();
         }


         //COMP MISSING //
         if(compMissing !="[]"){    
            compMissing = JSON.parse(compMissing);
            var col = [];
            for (var i = 0; i < compMissing.length; i++) {
                compMissing[i].CompletenessMissingValue = (compMissing[i].CompletenessMissingValue).toFixed(2);

                for (var key in compMissing[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
              var update = document.getElementById("completenessMissingTitle");
              update.innerHTML = "Completeness Missing";
              var table = document.getElementById("completenessMissingTable");
           
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
            var thead = document.createElement("thead")
            var tr = document.createElement("tr");
            thead.appendChild(tr);
            table.appendChild(thead);

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);

            for (var i = 0; i < compMissing.length; i++) {

                tr = tbody.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = compMissing[i][col[j]];
                }
            }

            // FINALLY SHOW THE TABLE
            var tt = $('#completenessMissingTable').DataTable();
         }     

         //COMP FREQUENCY //
         if(compFreq !="[]"){    
           compFreq = JSON.parse(compFreq);
            var col = [];
            for (var i = 0; i < compFreq.length; i++) {
                compFreq[i].CompletenessFrequencyValue = (compFreq[i].CompletenessFrequencyValue).toFixed(2);
                for (var key in compFreq[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
              var update = document.getElementById("completenessFrequencyTitle");
              update.innerHTML = "Completeness Frequency";
              var table = document.getElementById("completenessFrequencyTable");
           
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
            var thead = document.createElement("thead")
            var tr = document.createElement("tr");
            thead.appendChild(tr);
            table.appendChild(thead);

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);

            for (var i = 0; i < compFreq.length; i++) {

                tr = tbody.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = compFreq[i][col[j]];
                }
            }

            // FINALLY SHOW THE TABLE
            var tt = $('#completenessFrequencyTable').DataTable();
         }
         //CONSISTENCY//
         if(consistency !="[]"){
        consistency = JSON.parse(consistency);
        var col = [];
        for (var i = 0; i < consistency.length; i++) {
            consistency[i].ConsistencyValue = (consistency[i].ConsistencyValue).toFixed(2);

            for (var key in consistency[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.

        var table = document.getElementById("consistencyTable");
        var update = document.getElementById("consistencyTitle");
        update.innerHTML = "Consisntency";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var thead = document.createElement("thead")
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        table.appendChild(thead);

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        for (var i = 0; i < consistency.length; i++) {

            tr = tbody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = consistency[i][col[j]];
            }
        }

        // FINALLY SHOW THE TABLE
        var tt = $('#consistencyTable').DataTable();
    }

         //TIMELINESS
         if(timelinessArr !="[]"){
        timelinessArr = JSON.parse(timelinessArr);
        var col = [];
        for (var i = 0; i < timelinessArr.length; i++) {
            timelinessArr[i].TimelinessMean = (timelinessArr[i].TimelinessMean).toFixed(2);
            timelinessArr[i].TimelinessMax = (timelinessArr[i].TimelinessMax).toFixed(2);
            timelinessArr[i].TimelinessMin = (timelinessArr[i].TimelinessMin).toFixed(2);

            for (var key in timelinessArr[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.

        var table = document.getElementById("timelinessTable");
        var update = document.getElementById("timelinessTable");
        //update.innerHTML = "Timeliness";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var thead = document.createElement("thead")
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        table.appendChild(thead);

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        for (var i = 0; i < timelinessArr.length; i++) {

            tr = tbody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = timelinessArr[i][col[j]];
            }
        }

        // FINALLY SHOW THE TABLE
        var tt = $('#timelinessTable').DataTable();
    }

         //PRECISION////
         if(precisionArr !="[]"){
        precisionArr = JSON.parse(precisionArr);
        var col = [];
        for (var i = 0; i < precisionArr.length; i++) {
            precisionArr[i].Precision = (precisionArr[i].Precision).toFixed(2);
            for (var key in precisionArr[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.

        var table = document.getElementById("precisionTable");
        var update = document.getElementById("precisionTable");
        //update.innerHTML = "Precision";

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var thead = document.createElement("thead")
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        table.appendChild(thead);

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        for (var i = 0; i < precisionArr.length; i++) {

            tr = tbody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = precisionArr[i][col[j]];
            }
        }

        // FINALLY SHOW THE TABLE
        var tt = $('#precisionTable').DataTable();
    }

 /*   var count = 0;
    for(var i in precisionArr){
            for(var j in timelinessArr){
                if(precisionArr[i].Value==timelinessArr[j].Value){
                    count++;
                }
            }
    }*/
});


