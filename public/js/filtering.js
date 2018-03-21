$( document ).ready(function(){
    var source = localStorage.getItem('source');
    var attributes;
    var filterArr = [2,2,2,2,2,2,2];
    $.ajax({
        type:'get',
        url: "/getAttributes?firstFolder=public/dataSources/"+source+"/DQAssessment_results",
        async:false

    }).done(function ( info ) {
        info = JSON.stringify(info);
        info = JSON.parse(info);
        attributes = info;
    });


    var update = document.getElementById("dropdown-menu");
    for(var i in attributes){
    	update.innerHTML +="<li class='"+attributes[i]+"'>"+attributes[i]+"</li>";

    }
    var selectedAtr;
    $("li").click(function(){
      selectedAtr=($(this).attr("class"));
      var update = document.getElementById("buttonDropdown");
      update.innerHTML = ($(this).attr("class"));
    });

   var complFreq = $("input.complFreq").slider({
    id: 'sliderCmp',
    min: 0,
    max: 1,
    step: 0.01,
    value: [0.75,1],
    rangeHighlights: [{ "start": 0, "end": 0.3, "class": "category1" },
                      { "start": 0.75, "end": 1, "class": "category2" }
                     ]}); 

    var volume = $("input.volume").slider({
    id: 'sliderVol',
    min: 0,
    max: 1,
    step: 0.0001,
    value: [0.029,1],
    rangeHighlights: [{ "start": 0, "end": 0.02, "class": "category1" },
                      { "start": 0.029, "end": 1, "class": "category2" }
                     ]}); 

     var consistency = $("input.consistency").slider({
    id: 'sliderCon',
    min: 0,
    max: 1,
    step: 0.0001,
    value: [0.7,1],
    rangeHighlights: [{ "start": 0, "end": 0.2, "class": "category1" },
                      { "start": 0.7, "end": 1, "class": "category2" }
                     ]}); 

      var complMiss = $("input.complMiss").slider({
    id: 'sliderMiss',
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    rangeHighlights: [{ "start": 0, "end": 0, "class": "category1" },
                      { "start": 1, "end": 1, "class": "category2" }
                     ]}); 


   
   $("#filter").click(function(){
       //var rangeValue = mySlider.slider('getValue');

      if($(".ckb-completeness_frequency").is(':checked')){
        var rangeValue = complFreq.slider('getValue');
        filterArr[1] = rangeValue[0];
        filterArr[2] = rangeValue[1];
      }
      if($(".ckb-volume").is(':checked')){
        var rangeValue = volume.slider('getValue');
        filterArr[3] = rangeValue[0];
        filterArr[4] = rangeValue[1];

      }
      if($(".ckb-completenessMissing").is(':checked')){
        var rangeValue = complMiss.slider('getValue');
        filterArr[0] = rangeValue;
      }
      if($(".ckb-consisntency").is(':checked')){
        var rangeValue = consistency.slider('getValue');
        filterArr[5] = rangeValue[0];
        filterArr[6] = rangeValue[1];
      }

        localStorage.setItem('filterArr',filterArr);  
        localStorage.setItem('selectedAtr',selectedAtr);
        localStorage.setItem('source',source);




   });



}); 