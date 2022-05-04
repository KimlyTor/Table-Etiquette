$(document).ready(function(){
    var c1 = '<div class="col-sm-12"><p>Correct: <b>'+ data+ '</b></p></div>';
    var c0 = '<div class="col-sm-12"><p>Incorrect: ' + (17-parseInt(data)).toString()+'</p></div>';
    var sum = '<div class="col-sm-12"><p>Total Score: ' + "<b>"+ data+"</b> / 17"+'</p></div>';
    $("#content").append(c1, c0, sum);

    var dne_btn = $("<button>").attr("id", "dne-btn").attr("class", "btn btn-primary").text("Back to Homepage");
    dne_btn.click(function(e){
        window.location.href = `http://127.0.0.1:5000/`;
    });

    $("#reaction").append(dne_btn)
});
