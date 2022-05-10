function StartTimer(){
    $.ajax({
        type: "POST",
        url: "start_timer",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({}),
        success: function(result){
            console.log(result['data'])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}


function SaveRecord(record){
    $.ajax({
        type: "POST",
        url: "save_record",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(record),
        success: function(result){
            console.log("Ajax success! score from the server " + result['data'])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

function VerifyAnswer(id, n, answer_index, score){
    // verify answer
    var none_checked = true;
    var ans = $(`#${answer_index}`);

    if (ans.prop("checked")){ // Answer is correct
        none_checked = false;
        console.log($(`#div-${answer_index}`));
        $(`#div-${answer_index}`).append("<span class='highlight-green'>    Correct!</span>");
        SaveRecord({"id": id, "score": score, "full_score": score});
    }
    else{ // Answer is wrong
        for (let c = 0; c < n; c++) {
            var input = $(`#${id}-${c}`);
            if(input.prop("checked")){
                none_checked = false;
                $(`#div-${answer_index}`).append("<span class='highlight-green'>    Correct!</span>");
                $(`#div-${id}-${c}`).append("<span class='highlight-red'>   Wrong.</span>")
            }
        }
        SaveRecord({"id": id, "score": 0, "full_score": score});
    }

    return none_checked;
}

$(document).ready(function(){
    console.log(data);
    var quiz_data = data['quiz_data'];
    var id = quiz_data['question_id'];
    var question = quiz_data['question'];
    var list_img = quiz_data['img'];
    var list_choices = quiz_data['choices'];
    var answer = quiz_data['answer'];
    var score = quiz_data['score'];
    var next_question = quiz_data['next_question']

    var user_score = data['user_score'];
    var curr_score = user_score['score'];
    var total_score = user_score['total_score'];

    var answer_index= null;


    if(id == 0){
        StartTimer()
        $("#body-container").addClass("quiz_first_page");
        var q_text = $("<h2>").html(`${question}`);
        $("#question").append(q_text);
         
        var ul = $('<ul class="quiz_first">');
        for (const i of list_choices) {
            var li = $('<li align="left">').text(i);
            ul.append(li)
        }
        $("#content").append(ul);

        var start_btn = $("<button>").attr("id", "start_btn").attr("class", "btn btn-primary").text("Start Quiz");
        start_btn.click(function(e){
            window.location.href = `http://127.0.0.1:5000/quiz/${next_question}`;
        });
        $("#reaction").append(submit_btn, start_btn);
        return;
    }

    // Fix header
    var question_number  = $("<div class='col-md-6'>").append($("<span class='quiz-info'>").html(`Question: ${id}/5`));
    var current_score  = $("<div class='col-md-6'>").append($("<span class='quiz-info'>").html(`Curent Score: ${curr_score}/${total_score}`));
    var q_text = $("<div class='col-md-12'>").append($("<h5>").html(`${question}`));
    $("#question").append(question_number, current_score, q_text);

    // list images
    if(list_img.length){
        var n = list_img.length;
        var col_wid = parseInt(12/n).toString()
        for (const i of list_img) {
            var img = $("<img>").attr("src", `${i}`).attr('alt', question);
            var panel = $(`<div class='col-md-${col_wid}'>`).append(img);
            $("#content").append(panel);
        }
    }

    // list choices
    var form = $("<form>");
    if(list_choices.length){
        for (const c in list_choices) {
            var idx = `${id}-${c}`
            if (list_choices[c] == answer){
                answer_index = idx;
            }

            var panel = $(`<div class='form-check' id='div-${idx}'>`)
            var input = $(`<input class='form-check-input' type='radio' id='${idx}' name='choice' value='${list_choices[c]}'>`);  //question id and choice index
            var label = $(`<label class='form-check-label' for=${idx}>`).text(list_choices[c]);
            panel.append(input, label);
            form.append(panel);
        }
    }
    $("#choices").append(form)


    // list actions
    var warning_block = $("<span class='highlight-red' id='warning_block'>")
    var submit_btn = $("<button>").attr("id", "submit-btn").attr("class", "btn btn-primary").text("Submit Answer");
    submit_btn.click(function(e){
        $(`#warning_block`).empty();
        var none_checked = VerifyAnswer(id, list_choices.length, answer_index, score);
        if(!none_checked){
            submit_btn.prop("disabled", true);
            next_btn.prop("disabled", false);
        }
        else{
            $(`#warning_block`).html("No answer selected! Select and submit again!")
        }
    });

    var next_btn = $("<button>").attr("id", "next_btn").attr("class", "btn btn-primary").text("Next");
    next_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/quiz/${next_question}`;
    });
    next_btn.prop("disabled", true);
    var col1= $("<div class='col-md-6 justify-content-around text-center'>").append(warning_block)
    var col2 = $("<div class='col-md-6 justify-content-around text-center mb-5'>").append(submit_btn, next_btn)
    
    $("#reaction").append(col1, col2);
});
