$( document ).ready(function(){
    var source = localStorage.getItem('source');
    var attributes;
    var filterArr = [2,2,2,2,2,2,2,2,2,2,2];
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
                      { "start": 0.75, "end": 1, "class": "category2" },
                        { "start": 0.3, "end": 0.75, "class": "category3" }
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
                      { "start": 0.7, "end": 1, "class": "category2" },
                        { "start": 0.2, "end": 0.7, "class": "category3" }

    ]});
    var timeliness = $("input.timeliness").slider({
        id: 'sliderTimeliness',
        min: 0,
        max: 1,
        step: 0.0001,
        value: [0.6,1],
        rangeHighlights: [{ "start": 0, "end": 0.2, "class": "category1" },
            { "start": 0.6, "end": 1, "class": "category2" },
            { "start": 0.2, "end": 0.6, "class": "category3" }
        ]});

    var precision = $("input.precision").slider({
        id: 'sliderPrecision',
        min: 0,
        max: 1,
        step: 0.0001,
        value: [0.6,1],
        rangeHighlights: [{ "start": 0, "end": 0.2, "class": "category1" },
            { "start": 0.6, "end": 1, "class": "category2" },
            { "start": 0.2, "end": 0.6, "class": "category3" }
        ]});

    var complMiss = $("input.complMiss").slider({
    id: 'sliderMiss',
    min: 0,
    max: 1,
    step: 0.0001,
    value: 1,
    rangeHighlights: [{ "start": 0, "end": 0.95, "class": "category1" },
                      { "start": 0.95, "end":1, "class": "category2" }
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
       if($(".ckb-timeliness").is(':checked')){
           var rangeValue = timeliness.slider('getValue');
           filterArr[7] = rangeValue[0];
           filterArr[8] = rangeValue[1];
       }
       if($(".ckb-precision").is(':checked')){
           var rangeValue = precision.slider('getValue');
           filterArr[9] = rangeValue[0];
           filterArr[10] = rangeValue[1];
       }
       localStorage["filterArr"] = JSON.stringify(filterArr);
        //localStorage.setItem('filterArr',filterArr);
        localStorage.setItem('selectedAtr',selectedAtr);
        localStorage.setItem('source',source);




   });



}); 