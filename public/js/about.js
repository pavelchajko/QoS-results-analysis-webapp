
$( document ).ready(function(){
    var source = localStorage.getItem('source');

    var jsonFile;
    var dimensionsOverAttribute = [];
    //call to server side to get dimensions scores over attributes available
    $.ajax({
        type:'get',
        url: "/getListOfDimensions?firstFolder=public/dataSources/"+source+"/DQAssessment_results",
        async:false

    }).done(function ( info ) {
        info = JSON.stringify(info);
        info = JSON.parse(info);
        var dimensions = info;
        for(var i in dimensions){
            dimensionsOverAttribute.push(dimensions[i]);
        }
    });
    var updateDataSource = document.getElementById('general');
    updateDataSource.innerHTML+=source;
    var updateAttributeDimensions = document.getElementById('dimensionAccordingAttribute');
    for(var i in dimensionsOverAttribute){
        updateAttributeDimensions.innerHTML+="<li>"+dimensionsOverAttribute[i]+"</li>";
    }
    //DIRECT LINK TO VALUE LEVEL GRANULARITY
    var arr = [];
    $.ajax({
        type:'get',
        url: "/getAttributes?firstFolder=public/dataSources/"+source+"/DQAssessment_results",
        async:false

    }).done(function ( info ) {
        info = JSON.stringify(info);
        info = JSON.parse(info);
        var attributes = info;
        for(var i in attributes){
            arr.push(attributes[i]);
        }

    });
    var thisUL = document.getElementById('dimensionOnValue');
    for(var i in arr){
        thisUL.innerHTML +="<li>"+arr[i]+"</li>";

    }


    $("#go").click(function(){
        localStorage.setItem('source',source);
    });

});


