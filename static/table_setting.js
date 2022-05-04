
$(document).ready(function(){
    // replace image with text for slide 1
    if(id==1){
        $("h1").attr('id', "table-setting-title");
        $("img").replaceWith("<p class='text-center' id='table-setting-text'>"+table_setting["text"]+"</p>");
    }

    if(id==3){
        $("#content-block").replaceWith(
            '<img  src=' +table_setting["image"] +' alt="table-setting-image" usemap="#Map" width="600">'
        );
        $("#buttons_at_bottom").replaceWith(
            '<div class="row justify-content-around my-5" id="buttons_at_bottom">'+
                '<div class="col-sm-auto">'+
                    '<button class="btn btn-primary" id="back-btn">Back</button>'+
                '</div>'+
                '<div class="col-sm-auto">'+
                    '<button class="btn btn-primary" id="quiz-btn">Next: Quiz!</button>'+
                '</div>'+
            '</div>'
        );

        $('#quiz-btn').click(function(){
            window.location.replace("http://127.0.0.1:5000/quiz/0");     
        });
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
            window.location.replace("http://127.0.0.1:5000/basic_rules/6");
        }
    })

   

    //source https://stackoverflow.com/questions/30383932/imagemapster-not-working
    $('img').mapster({
        singleSelect: false,
        fillColor: '13A0E8',
        fillOpacity: 0.1,
        stroke: true,
        strokeColor: '138CE8',
        strokeWidth: 1,
        strokeOpacity: 5,
        mapKey: 'class',
        showToolTip: true,
        areas:[
            {
                key: "napkin",
                toolTip: "Napkin"
            },
            {
                key: "fork-1",
                toolTip: "Salad Fork"
            },
            {
                key: "fork-2",
                toolTip: "Fish Fork"
            },
            {
                key: "fork-3",
                toolTip: "Dinner Fork"
            },
            {
                key: "fork-4",
                toolTip: "Dessert Fork"
            },
            {
                key: "plate-1",
                toolTip: "Salad Plate"
            },
            {
                key: "plate-2",
                toolTip: "Soup Bowl"
            },
            {
                key: "plate-3",
                toolTip: "Dinner Plate"
            },
            {
                key: "plate-4",
                toolTip: "Bread Plate"
            },
            {
                key: "knife-1",
                toolTip: "Dinner Knife"
            },
            {
                key: "knife-2",
                toolTip: "Salad Knife"
            },
            {
                key: "knife-3",
                toolTip: "Butter Knife"
            },
            {
                key: "spoon-1",
                toolTip: "Dinner Spoon"
            },
            {
                key: "spoon-2",
                toolTip: "Soup Spoon"
            },
            {
                key: "spoon-3",
                toolTip: "Dessert Spoon"
            },

            {
                key: "cup",
                toolTip: "Coffee Cup"
            },
            {
                key: "saucer",
                toolTip: "Coffee Saucer"
            },
            {
                key: "glass-1",
                toolTip: "Red Wine Glass"
            },
            {
                key: "glass-2",
                toolTip: "White Wine Glass"
            },
            {
                key: "glass-3",
                toolTip: "Water Glass"
            },
            {
                key: "card-holder",
                toolTip: "Card Holder"
            },
           
    
        ],
        // onMouseover: function(e) {
        //     $(this).mapster('set',false).mapster('set',true);
        // },
        // onMouseout: function(e) { 
        //      $(this).mapster('set',false);
        // },
    
    });

})
