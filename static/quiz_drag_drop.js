function VerifyAnswer(){

}


$(document).ready(function(){
    console.log(data);
    let id = data['question_id']
    let question = data['question']
    let list_img = data['img'];
    let list_choices = data['choices'];
    let answer = data['answer'];
    let answer_index= null;

    
   

     // write question
     let q_text = $("<h3>").html(`${id}: ${question}`);
     $("#question").append(q_text);

    // list image and drag_drop_area
    if(list_img.length){
        let n = list_img.length;
        let col_wid = parseInt(12/n).toString()
        for (const i of list_img) {
            let img = $("<img>").attr("src", `${i}`).addClass("img-fluid w-100").attr({'alt':data['question']});
            let panel = $(`<div class='col-md-6 px-0 bg-warning'>`).append(img);
            let drag_drop_area = $(`<div class='col-md-5 mx-4'>`).append(
                '<div class="row">' + 
                    '<div class="col-sm-3 text-center border" id="labels"><strong>Labels</strong></div>'+
                    '<div class="col-sm-9 text-center border" id="names"><strong>Names</strong></div>'
                +'</div>' 
            )
            $("#content").append(panel,drag_drop_area);
        }
    }

    // list labels
    if(Object.keys(answer).length){
        $.each(answer, function(key, val){
            $("#labels").append(
                    '<div class="row">' + 
                        '<div class="col-sm-12 border">'+key+'</div>'+
                    '</div>' 
                )
            $("#names").append(
                '<div class="row" id="utensils-names">' + 
                    '<div class="col-sm-12 border">'+"n/a"+'</div>'+
                    '</div>' 
                )   
        })
    }

    //list choices 
    if(list_choices.length){
       for(const i in list_choices){
           let namesBox = $(
                '<div class="col-sm-auto name-boxes text-center draggable">'+list_choices[i]+'</div>'
            )
            $("#choices").append(namesBox)
       }
    }
    
    //make the name-boxes appear at random locations
    $('.name-boxes').each(function(index){
        $(this).css({
            left : Math.random() * ($(this).outerWidth()),
            top : Math.random() * ($(this).outerHeight()),
        });
        
    });

    $('.draggable').draggable();

       
       
    

    let submit_btn = $("<button>").attr("id", "submit-btn").attr("class", "btn btn-primary").text("Submit Answer");
    // submit_btn.click(function(e){
    //      none_checked = VerifyAnswer(id, list_choices.length, answer_index);
    //     if(!none_checked){
    //         submit_btn.prop("disabled", true);
    //         next_btn.prop("disabled", false);
    //     }
    // });
    let next_btn = $("<button>").attr("id", "next_btn").attr("class", "btn btn-primary").text("Next");
    next_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/quiz/${data['next_question']}`;
    });
    next_btn.prop("disabled", false);
    $("#reaction-drag-drop").append(submit_btn, next_btn);
})