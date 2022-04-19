from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# ROUTES
bsc_rul_data = {
    "1": {
        "rule_id": "1",
        "title": "Don’t Put Stuffs on the Table",
        "img": ["1.png"],
        "text": ["Keep your elbows off the table. Putting elbows on the table is considered rude.",
                 "Don’t put your bags, sun glasses, phones, and other personal belonging on the table"],
        "style": "a",
        "next_rule": "2"
    },
    "2": {
        "rule_id": "2",
        "title": "Start at the Outside and Work Your Way In",
        "img": ["2-2.png"],
        "text": [],
        "next_rule": "3"
    },
    "3": {
        "rule_id": "3",
        "title": "Put Napkin on Your Lap",
        "img": ["4.png", "5.png"],
        "text": ["Fold your napkin in half and place it on your lap. Keep it there while you’re eating",
                 "Leave the napkin on the chair if you would like leave the table for a moment"],
        "next_rule": "4"
    },
    "4": {
        "rule_id": "4",
        "title": "Wait for Everyone to be Served",
        "img": ["6.png"],
        "text": [],
        "next_rule": "5"
    },
    "5": {
        "rule_id": "5",
        "title": "When Finished, Leave Your Fork and Knife Like This!",
        "img": ["7.png"],
        "text": [],
        "next_rule": "6"
    },
    "6": {
        "rule_id": "6",
        "title": "Basic Rules Review!",
        "img": ["1.png"],
        "text": ["Don’t Put Stuffs on the Table",
                 "Start at the Outside and Work Your Way In",
                 "Put Napkin on Your Lap",
                 "Wait for Everyone to be Served",
                 "When Finished, Leave Your Fork and Knife Diagonally"],
        "next_rule": None
    }
}


table_settings = {
    "1": {
        "title": "Table Setting",
        "text": 'The golden rule, "Start at the Outside and Work Your Way In"',
        "image": "#",
        "next_lesson": "2"
    },
    "2": {
        "title": "Click on Each Item to See Its Name",
        "text": "n/a",
        "image": "/static/img/table_setting_1.png",
        "next_lesson": "3"
    },
    "3": {
        "title": "Table Setting Review",
        "text": "n/a",
        "image": "/static/img/table_setting_2.png",
        "next_lesson": "end"
    }
}

quiz_data = {
    "1": {
        "image": "/static/img/quiz1_img",
        "question": "Where do you put the napkin when you leave the table for bathroom break?",
        "choice1": "Bring it with you",
        "choice2": "On the plate",
        "choice3": "On your lap",
        "choice4": "On the chair"
    },
    "2": {
        "image": "/static/img/quiz2_img",
        "question": "What's the golden rule of the table setting?",
        "choice1": "Pick any for or spoon available",
        "choice2": "Big utensils first, small utensils second",
        "choice3": "Start at the outside and work your way in",
        "choice4": "There is no rule"
    },
    "3": {
        "image": "/static/img/quiz3_img",
        "question": "You are served fried calamari as an appetizer, which utensil do you use?",
        "choice1": "A",
        "choice2": "B",
        "chocie3": "C",
        "choice4": "D",
        "choice5": "E",
        "choice6": "None of the above"
    }
    "4": {
        "image": "/static/img/quiz4_img",
        "question": "You and your friends are in a restaurant having dinner torgether and your're really hungry. All of your food have been sered except the order for Abby who is seating next to you. What is the polite way to behave in this situation?",
        "choice1": "Start eating first",
        "choice2": "Ask Abby if it's okay to start eating first",
        "choice3": "Wait for Abby's dish to be served"
    },
    "5": {
        "question": "Which fork is which? Choose the correct labels.",
        "image1": "/static/img/quiz5_img1",
        "image2": "/static/img/quiz5_img2",
        "image3": "/static/img/quiz5_img3",
        "choice1": "A",
        "choice2": "B",
        "choice3": "C"
    }
}

# ROUTES


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
    return render_template('table_setting.html', table_setting=table_setting, id=id)


@app.route('/quiz/<id>')
def quiz(id):

    return render_template('quiz.html', data=quiz_data, id=id)

# AJAX FUNCTIONS


if __name__ == '__main__':
    app.run(debug=True)
