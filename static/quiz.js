
function VerifyAnswer(id, n, answer_index){
    // verify answer
    var none_checked = true;
    // var correct_img = $("<img class='flag-img>").attr("src", '/statics/imgs/btn_correct.png').attr('alt', "correct");
    // var wrong_img = $("<img class='flag-img>").attr("src", '/statics/imgs/btn_wrong.png').attr('alt', "correct");
    var ans = $(`#${answer_index}`);

    if (ans.prop("checked")){
        none_checked = false;
        console.log($(`#div-${answer_index}`));
        $(`#div-${answer_index}`).append("<span class='highlight-green'> is the right answer!</span>");
    }
    else{
        $(`#div-${answer_index}`).append("<span class='highlight-red'> is the right answer!</span>");

        for (let c = 0; c < n; c++) {
            var input = $(`#${id}-${c}`);
            if(input.prop("checked")){
                none_checked = false;
                $(`#div-${id}-${c}`).append("<span class='highlight-red'> is not the right answer!</span>")
            }
        }
    }

    return none_checked;
}

$(document).ready(function(){
    console.log(data);
    var id = data['question_id']
    var question = data['question']
    var list_img = data['img'];
    var list_choices = data['choices'];
    var answer = data['answer'];
    var answer_index= null;

    // write question
    var q_text = $("<h5>").html(`Question ${id}: ${question}`);
    $("#question").append(q_text);

    // list images
    if(list_img.length){
        var n = list_img.length;
        var col_wid = parseInt(12/n).toString()
        for (const i of list_img) {
            var img = $("<img>").attr("src", `${i}`).attr('alt', data['question']);
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
    var submit_btn = $("<button>").attr("id", "submit-btn").text("Submit Answer");
    submit_btn.click(function(e){
        var none_checked = VerifyAnswer(id, list_choices.length, answer_index);
        if(!none_checked){
            submit_btn.prop("disabled", true);
            next_btn.prop("disabled", false);
        }
    });

    var next_btn = $("<button>").attr("id", "next_btn").text("Next");
    next_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/quiz/${data['next_question']}`;
    });
    next_btn.prop("disabled", true);
    $("#reaction").append(submit_btn, next_btn);
});