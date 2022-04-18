

$(document).ready(function(){

    // replace image with text for slide 1
    if(id==1){
        $("img").replaceWith("<p>"+table_setting["text"]+"</p>");
    }

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

})