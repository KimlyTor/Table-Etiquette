
function EndTimer(){
    $.ajax({
        type: "POST",
        url: "end_timer",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({}),
        success: function(result){
            var t = result['data'].toFixed(2).toString()
            console.log(result['data']);
            var time = $("<div class='col-sm-12'>").html(`Total Time: <strong>${t} seconds</strong>`);
            $("#content").append(time);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

$(document).ready(function(){
    EndTimer();
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
