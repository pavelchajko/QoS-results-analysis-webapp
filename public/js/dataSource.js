
$( document ).ready(function(){
    var jsonFile;
    var arr = [];
    $.ajax({
        type:'get',
        url: "/getSources?firstFolder=public/dataSources",
        async:false

    }).done(function ( info ) {
        info = JSON.stringify(info);
        info = JSON.parse(info);
        jsonFile = info;
        //jsonFile = (JSON.stringify(jsonFile));

        for(var i in jsonFile){
            arr.push(jsonFile[i]);
        }
    });


    var thisUL = document.getElementById('dropMenu');
    for(var i = 0; i < arr.length; i++) {
        var link = document.createElement('a');
        link.setAttribute('href', 'homepage.html');
        link.appendChild(document.createTextNode(arr[i]));
        var thisLI = document.createElement('li');
        thisLI.appendChild(link);
        thisUL.appendChild(thisLI);
    }


    $("a").click(function(){
        var source = $(this).html();
        localStorage.setItem('source',source);
    });

});


