
var jsonFile ="";
var source = "";
var filterArr = [];
var selectedAtr;
$( document ).ready(function(){
    source = localStorage.getItem('source');
	filterArr = localStorage.getItem('filterArr');
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
         var arr = [];
         



         
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


         
         if(compMissing !="[]"){    
            compMissing = JSON.parse(compMissing);
            var col = [];
            for (var i = 0; i < compMissing.length; i++) {
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

         
         if(compFreq !="[]"){    
           compFreq = JSON.parse(compFreq);
            var col = [];
            for (var i = 0; i < compFreq.length; i++) {
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

         
         if(consistency !="[]"){    
           consistency = JSON.parse(consistency);
            var col = [];
            for (var i = 0; i < consistency.length; i++) {
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


});


