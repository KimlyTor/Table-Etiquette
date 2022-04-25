function VerifyAnswer(){

}

function listChoices(list_choices){
    if(list_choices.length){
        for(const i in list_choices){
            let namesBox = $('<div class="col-sm-auto name-boxes text-center draggable">'+list_choices[i]+'</div>'
             ).attr('id', list_choices[i])
             $("#choices").append(namesBox)
        }
    }

}

function update_drag_drop_key_value(dict){
    // list labels
    if(Object.keys(dict).length){
        $.each(dict, function(key, val){
            $("#anchor").before(
                    $('<div class="row key_value_drop_area droppable">' + 
                        '<div class="col-sm-9 border value">'+val+'</div>'+
                    '</div>').attr('id', key)
            )
        })
    }
}


$(document).ready(function(){
    console.log(data);
    let id = data['question_id']
    let question = data['question']
    let list_img = data['img'];
    let list_choices = data['choices'];
    let answer = data['answer'];
    let answer_index= null;
    let names = {}

    // SET UP

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
                '<div class="row drag_drop_header">' + 
                    '<div class="col-sm-3 text-center pt-3 border" id="labels"><strong>Labels</strong></div>'+
                    '<div class="col-sm-9 text-center pt-3 border" id="names"><strong>Names</strong></div>'+
                '</div>'+
                '<div id="anchor" ></div>'
            )
          
            $("#content").append(panel,drag_drop_area);
        }
    }

    // list labels
    if(Object.keys(answer).length){
        $.each(answer, function(key, val){
            $("#anchor").before(
                    $('<div class="row key_value_drop_area droppable">' + 
                        '<div class="col-sm-3 border text-center key">'+key+'</div>'+
                        '<div class="col-sm-9 border value">'+'</div>'+
                    '</div>').attr('id', key)
                )
            // $(".header").after(
            //     '<div class="row" id="utensils-names">' + 
            //         '<div class="col-sm-9 border">'+'</div>'+
            //         '</div>' 
            //     )   
        })
    }

    //list choices 
   listChoices(list_choices)

    //make the name-boxes(or list choices) appear at random locations
    $('.name-boxes').each(function(index){
        $(this).css({
            left : Math.random() * ($(this).outerWidth()),
            top : Math.random() * ($(this).outerHeight()),
        });
        
    });
    

    let submit_btn = $("<button>").attr("id", "submit-btn").attr("class", "btn btn-primary").text("Submit Answer");
    // submit_btn.click(function(e){
    //     none_checked = VerifyAnswer(id, list_choices.length, answer_index);
    //     if(!none_checked){
    //         submit_btn.prop("disabled", true);
    //         next_btn.prop("disabled", false);
    //     }
    // });
    let next_btn = $("<button>").attr("id", "next_btn").attr("class", "btn btn-primary").text("Next");
    next_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/quiz/${data['next_question']}`;
    });
    next_btn.prop("disabled", true);
    $("#reaction-drag-drop").append(submit_btn, next_btn);


    // // Drag and Drop 

    //make name-boxes draggable
    $('.draggable').draggable();

    //make labels A, B, C,... droppable
    $(".droppable").droppable({
        accept: ".draggable",
        classes:{
            "ui-droppable-active": "ui-state-default",
            "ui-droppable-hover": "ui-state-hover",
            
        },
        drop: function(event, ui){
            let value = ui.draggable.attr('id');
            let key = $(this).attr('id')
            //remove the value from list_choices array
            list_choices = list_choices.filter(item => item!=value);
            //remove the draggable item on UI
            $(ui.draggable).remove()
            //add dropped key value pair to names array
            names[key] = value;
            //make the value appear on the dropped area
            $("#"+key+"> .value").text(value)
            //disable droppable div after a name is dropped 
            $(this).droppable("option", "disabled", true)
            console.log(names);
            console.log(list_choices)
            
        }

    })
       
       
    

})