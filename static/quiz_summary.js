$(document).ready(function(){
    var c1 = "Correct: " + data;
    var c0 = "Incorrect: " + (17-parseInt(data)).toString();
    var sum = "Total Score: " + data + "/17";
    $("#content").append(c1, '<br>', c0, '<br>', sum);

    var dne_btn = $("<button>").attr("id", "dne-btn").attr("class", "btn btn-primary").text("You're Done! Back to Homepage");
    dne_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/`;
    });

    $("#reaction").append(dne_btn)
});
