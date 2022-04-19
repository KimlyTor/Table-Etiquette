$(document).ready(function(){
    var c1 = "Correct: " + data;
    var c0 = "Incorrect: " + (5-parseInt(data)).toString();
    var sum = "Total Score: " + data;
    $("#content").append(c1, '<br>', c0, '<br>', sum);
     
    var quiz_btn = $("<button>").attr("id", "quiz-btn").text("Quiz Again");
    quiz_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/quiz/0`;
    });

    var tbl_set_btn = $("<button>").attr("id", "tbl-set-btn").text("Table Setting");
    tbl_set_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/table_setting/1`;
    });

    var dne_btn = $("<button>").attr("id", "dne-btn").text("Done");
    dne_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/`;
    });

    $("#reaction").append(quiz_btn, tbl_set_btn, dne_btn)
});