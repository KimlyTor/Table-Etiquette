$(document).ready(function(){
    console.log(data);
    // append title
    var title = $("<h4>").html(`Rule ${data['rule_id']}: ${data['title']}`);
    $("#title").append(title);

    var list_img = data['img'];
    var len_img = list_img.length;
    var list_text = data['text'];
    var len_text = list_text.length;

    if(data['rule_id'] == "6"){
        // insert content
        var ol = $("<ol>")
        for(txt in list_text){
            ol.append($("<li>").html(list_text[txt]));
        }
        var img = $("<img class='resize-img'>").attr("src", `/static/imgs/${list_img[0]}`).attr('alt', data['title']);
        $("#content").append(ol, img)

        // insert buttons
        var tbl_set_btn = $("<button>").attr("id", "tbl-set-btn").text("Next: Learn about Table Setting!");
        tbl_set_btn.click(function(e){
            window.location.href = `http://127.0.0.1:5000/table_setting/1`;
        });

        var dne_btn = $("<button>").attr("id", "dne-btn").text("Back to Home Page");
        dne_btn.click(function(e){
            window.location.href = `http://127.0.0.1:5000/`;
        });

        $("#reaction").append(tbl_set_btn, dne_btn)
    }
    else{
        if ((len_img == 1) && (len_text == 0)){
            // Style A for basic rules
            var img = $("<img class='resize-img'>").attr("src", `/static/imgs/${list_img[0]}`).attr('alt', data['title']);
            $("#content").append(img);
        }
        else if(len_img == len_text){
            // Style B for basic rules
            var n = len_img;
            var col_wid = parseInt(12/n).toString()
            for (let i = 0; i < n; i++) {
                const img = $("<img>").attr("src", `/static/imgs/${list_img[i]}`).attr('alt', data['title']);
                const txt = $("<p>").html(list_text[i]);
                var panel = $(`<div class='col-md-${col_wid}'>`).append(img, txt);
                $("#content").append(panel);
            }
        }
        else if((len_img == 1) && (len_text > 0)){
            // Style C for basic rules
    
            // left panel
            var img = $("<img>").attr("src", `/static/imgs/${list_img[0]}`).attr('alt', data['title']);
            var panel_l = $("<div class='col-md-6'>").append(img);
            $("#content").append(panel_l)
    
            // right panel
            var ul = $("<ul>")
            for(txt in list_text){
                ul.append($("<li>").html(list_text[txt]));
            }
            var panel_r = $("<div class='col-md-6'>").append(ul);
            $("#content").append(panel_r)
        }
        
                
        // Append Buttons

        if (data['prev_rule'] != null){
            var back_btn = $("<button>").attr("id", "back-btn").text("Back");
            back_btn.click(function(e){
                window.location.href = `http://127.0.0.1:5000/basic_rules/${data['prev_rule']}`;
            });    
            $("#reaction").append(back_btn)
        }

        if (data['next_rule'] != null){
            var next_btn = $("<button>").attr("id", "next-btn").text("Next");
            next_btn.click(function(e){
                window.location.href = `http://127.0.0.1:5000/basic_rules/${data['next_rule']}`;
            });
            $("#reaction").append(next_btn)
        }
    }
});