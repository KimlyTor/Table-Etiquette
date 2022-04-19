$(document).ready(function(){
    // replace image with text for slide 1
    if(id==1){
        $("img").replaceWith("<p class='text-center'>"+table_setting["text"]+"</p>");
    }

    if(id==3){
        $("#buttons_at_bottom").replaceWith(
            '<div class="row justify-content-around my-5" id="buttons_at_bottom">'+
                '<div class="col-sm-auto">'+
                    '<button id="back-btn">Back</button>'+
                '</div>'+
                '<div class="col-sm-auto">'+
                    '<button id="done-btn">Done</button>'+
                '</div>'+
                '<div class="col-sm-auto">'+
                    '<button id="quiz-btn">Quiz</button>'+
                '</div>'+
            '</div>'
        )

        $('#done-btn').click(function(){
            window.location.replace("http://127.0.0.1:5000/");
            
        })

        $('#quiz-btn').click(function(){
            window.location.replace("http://127.0.0.1:5000/quiz");
            
        })


    }

    $('.napkin').click(function(){
        this.focus();
    })
    

    //redirect to next page when click next
    $('#next-btn').click(function(){
        if(table_setting["next_lesson"]!="end"){
            window.location.replace("http://127.0.0.1:5000/table_setting/" + table_setting["next_lesson"]);
        }
    })

    //redirect to the previous page when click back
    $('#back-btn').click(function(){
        if(id>1){
            window.location.replace("http://127.0.0.1:5000/table_setting/" + String(id-1));
        }

        if(id==1){
            window.location.replace("http://127.0.0.1:5000/");
        }
    })

   
    $('img').mapster({
        fillColor: '13A0E8',
        fillOpacity: 0.1,
        stroke: true,
        strokeColor: '138CE8',
        strokeWidth: 1,
        strokeOpacity: 5,
        showToolTip: true,
        areas: [{
            key:"fork-1",
            toolTip: "Hello World!"
        }],
    });

})