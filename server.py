from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# ROUTES
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> michelle_merge
bsc_rul_data = {
    "1":{
        "rule_id": "1",
        "title": "Don’t Put Stuffs on the Table",
        "img": ["1.png"],
        "text": ["Keep your elbows off the table. Putting elbows on the table is considered rude.",
                 "Don’t put your bags, sun glasses, phones, and other personal belonging on the table"],
        "style": "a",
        "next_rule": "2"
    },
    "2":{
        "rule_id": "2",
        "title": "Start at the Outside and Work Your Way In",
        "img": ["2-2.png"],
        "text": [],
        "next_rule": "3"
    },
    "3":{
        "rule_id": "3",
        "title": "Put Napkin on Your Lap",
        "img": ["4.png", "5.png"],
        "text": ["Fold your napkin in half and place it on your lap. Keep it there while you’re eating", 
                 "Leave the napkin on the chair if you would like leave the table for a moment"],
        "next_rule": "4"
    },
    "4":{
        "rule_id": "4",
        "title": "Wait for Everyone to be Served",
        "img": ["6.png"],
        "text": [],
        "next_rule": "5"
    },
    "5":{
        "rule_id": "5",
        "title": "When Finished, Leave Your Fork and Knife Like This!",
        "img": ["7.png"],
        "text": [],
        "next_rule": "6"
    },
    "6":{
        "rule_id": "6",
        "title": "Basic Rules Review!",
        "img": ["1.png"],
        "text":["Don’t Put Stuffs on the Table",
                "Start at the Outside and Work Your Way In",
                "Put Napkin on Your Lap",
                "Wait for Everyone to be Served",
                "When Finished, Leave Your Fork and Knife Diagonally"],
        "next_rule": None
    }
}


<<<<<<< HEAD
table_settings = {
    "1":{
        "title": "Table Setting",
        "text": 'The golden rule, "Start at the Outside and Work Your Way In"',
        "image": "#",
        "next_lesson": "2"
    },
    "2":{
        "title": "Click on Each Item to See Its Name",
        "text": "n/a",
        "image": "/static/img/table_setting_1.png",
        "next_lesson": "3"
    },
    "3":{
        "title": "Table Setting Review",
        "text": "n/a",
        "image": "/static/img/table_setting_2.png",
        "next_lesson": "end"
    }
}


# ROUTES
=======
>>>>>>> michelle
>>>>>>> michelle_merge
@app.route('/')
def welcome():
    return render_template('home.html')


@app.route('/basic_rules/<id>')
def basic_rules(id):
    return render_template('basic_rules.html', data=bsc_rul_data[str(id)])


@app.route('/table_setting/<table_setting_id>')
def table_setting(table_setting_id):
    table_setting = table_settings[str(table_setting_id)]
    id = table_setting_id
    return render_template('table_setting.html', table_setting = table_setting, id = id)

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')


# AJAX FUNCTIONS


if __name__ == '__main__':
    app.run(debug=True)
