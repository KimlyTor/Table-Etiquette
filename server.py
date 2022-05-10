from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from datetime import datetime
app = Flask(__name__)


# DATA
bsc_rul_time = {"start": None, "end": None, "elapsed": None}
quiz_time = {"start": None, "end": None, "elapsed": None}

bsc_rul_data = {
    "1": {
        "rule_id": "1",
        "title": "Don’t Put Stuff on the Table",
        "img": ["8.jpeg"],
        "text": ["Keep your <strong>elbows off the table</strong>. Putting elbows on the table is considered rude.",
                 "Don’t put your <strong>bags, sun glasses, phones</strong>, and <strong>other personal belonging</strong> on the table"],
        "next_rule": "2",
        "prev_rule": None,
    },
    "2": {
        "rule_id": "2",
        "title": "Start at the Outside and Work Your Way In",
        "img": ["2-2.png"],
        "text": [],
        "next_rule": "3",
        "prev_rule": "1"
    },
    "3": {
        "rule_id": "3",
        "title": "Put Napkin on Your Lap",
        "img": ["4.png", "5.png"],
        "text": ["1.  Fold your napkin in half and place it <strong>on your lap</strong>. Keep it there <strong>while you’re eating.</strong>",
                 "2.  Leave the napkin <strong>on the chair</strong> if you would like <strong>leave the table</strong> for a moment"],
        "next_rule": "4",
        "prev_rule": "2"
    },
    "4": {
        "rule_id": "4",
        "title": "Wait for Everyone to be Served",
        "img": ["6.png"],
        "text": [],
        "next_rule": "5",
        "prev_rule": "3"
    },
    "5": {
        "rule_id": "5",
        "title": "When Finished, Leave Your Fork and Knife Vertically Like This!",
        "img": ["7.jpeg"],
        "text": [],
        "next_rule": "6",
        "prev_rule": "4"
    },
    "6": {
        "rule_id": "6",
        "title": "Basic Rules Review!",
        "img": ["1.png"],
        "text": ["Don’t Put Stuff on the Table",
                 "Start at the Outside and Work Your Way In",
                 "Put Napkin on Your Lap",
                 "Wait for Everyone to be Served",
                 "When Finished, Leave Your Fork and Knife Vertically"],
        "next_rule": None,
        "prev_rule": "5"
    }
}

table_settings = {
    "1": {
        "title": "Table Setting",
        "text": 'The golden rule, <span id="golden-rule">"Start at the Outside and Work Your Way In"<span>',
        "image": "#",
        "next_lesson": "2"
    },
    "2": {
        "title": "Hover on Each Item to See Its Name",
        "text": "n/a",
        "image": "/static/imgs/table_setting_1.png",
        "next_lesson": "3"
    },
    "3": {
        "title": "Table Setting Review",
        "text": "n/a",
        "image": "/static/imgs/table_setting_2.png",
        "next_lesson": "end"
    }
}

quiz_data = {
    "0": {
        "question_id": "0",
        "img": [],
        "question": "Test Your Knowledge. <br> How much do you know?",
        "choices": ["5 multiple choice questions, 2 points each.", "12 drags and drops, 1 point each."],
        "answer": None,
        "next_question": "1",
        "score": 2,
    },
    "1": {
        "question_id": "1",
        "img": ["/static/imgs/quiz1_img.png"],
        "question": "Where do you put the napkin when you leave the table for bathroom break?",
        "choices": ["Bring it with you", "On the plate", "On your lap", "On the chair"],
        "answer": "On the chair",
        "next_question": "2",
        "score": 2,
    },
    "2": {
        "question_id": "2",
        "img": ["/static/imgs/quiz2_img.png"],
        "question": "What's the golden rule of the table setting?",
        "choices": ["Pick any for or spoon available",  "Big utensils first, small utensils second", "Start at the outside and work your way in", "There is no rule"],
        "answer": "Start at the outside and work your way in",
        "next_question": "3",
        "score": 2,
    },
    "3": {
        "question_id": "3",
        "img": ["/static/imgs/quiz3_img.png"],
        "question": "You are served fried calamari as an appetizer, which utensil do you use?",
        "choices": ["A", "B", "C", "D", "E", "None of the above"],
        "answer":  "A",
        "next_question": "4",
        "score": 2,
    },
    "4": {
        "question_id": "4",
        "img": ["/static/imgs/quiz4_img.png", ],
        "question": "You and your friends are in a restaurant having dinner torgether and your're really hungry. All of your food have been served except the order for Abby who is seating next to you. What is the polite way to behave in this situation?",
        "choices": ["Start eating first",  "Ask Abby if it's okay to start eating first", "Wait for Abby's dish to be served"],
        "answer": "Wait for Abby's dish to be served",
        "next_question": "5",
        "score": 2,
    },
    "5": {
        "question_id": "5",
        "img": ["/static/imgs/quiz5_img1.png", "/static/imgs/quiz5_img2.png", "/static/imgs/quiz5_img3.png"],
        "question": "Which fork is which? Choose the correct labels.",
        "choices": ["A", "B", "C"],
        "answer": "B",
        "next_question": "drag_and_drop",
        "score": 2,
    },
    "drag_and_drop":{
        "question_id": "Drag and Drop",
        "img": ["/static/imgs/drag_and_drop_quiz.png"],
        "question": "Match the names to the correct labels.<br> If you make a mistake, you can refresh the page to reset the items!",
        "choices": ["Napkin", "Salad Fork", "Dinner Fork", "Soup spoon", "Dinner spoon", "Salad Plate", "Dinner Plate", "Bread plate and butter knife", "Dessert spoon and fork", "Wine glass", "Water glass", "Dinner knife"],
        "answer": {
            "A":"Dinner plate", 
            "B":"Dinner fork", 
            "C":"Salad fork", 
            "D":"Napkin",
            "E":"Dinner Knife",
            "F":"Soup spoon",
            "G":"Wine glass",
            "H":"Salad plate",
            "I":"Bread plate and butter knife",
            "J":"Dessert spoon and fork",
            "K":"Dinner spoon",
            "L":"Water glass",
         },
        "next_question": "summary",
        "score": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }
}

user_score_raw = {}

def calc_score():
    print(user_score_raw)
    score = 0
    correct = 0
    incorrect = 0
    total_score = 0
    for k, t in user_score_raw.items():
        print(k, t)
        score += t[0]
        total_score += t[1]
        if (t[0]):
            correct += 1
        else:
            incorrect += 1
    user_score_stat = {
            "correct": correct, 
            "incorrect": incorrect,
            "score": score,
            "total_score": total_score
        }
    return user_score_stat


@app.route('/')
def welcome():
    return render_template('home.html')


@app.route('/basic_rules/<id>')
def basic_rules(id):
    return render_template('basic_rules.html', data=bsc_rul_data[str(id)])


@app.route('/basic_rules/start_timer', methods=['GET', 'POST'])
def start_timer():
    if bsc_rul_time["start"] is None:
        bsc_rul_time["start"] = datetime.now().timestamp()
    print(bsc_rul_time["start"])
    return jsonify(data=bsc_rul_time["start"])


@app.route('/basic_rules/end_timer', methods=['GET', 'POST'])
def end_timer():
    if bsc_rul_time["end"] is None:
        bsc_rul_time["end"] = datetime.now().timestamp()
    print(bsc_rul_time["end"])

    if(bsc_rul_time["end"]is not None and bsc_rul_time["start"] is not None):
        bsc_rul_time["elapsed"] = bsc_rul_time["end"] - bsc_rul_time["start"]
    
    # Restart timer
    bsc_rul_time["end"] = None
    bsc_rul_time["start"] = None
    return jsonify(data=bsc_rul_time["elapsed"] )


@app.route('/quiz/start_timer', methods=['GET', 'POST'])
def quiz_start_timer():
    if quiz_time["start"] is None:
        quiz_time["start"] = datetime.now().timestamp()
    print(quiz_time["start"])
    return jsonify(data=quiz_time["start"])


@app.route('/quiz/end_timer', methods=['GET', 'POST'])
def quiz_end_timer():
    if quiz_time["end"] is None:
        quiz_time["end"] = datetime.now().timestamp()

    if(quiz_time["end"]is not None and quiz_time["start"] is not None):
        quiz_time["elapsed"] = quiz_time["end"] - quiz_time["start"]
    
    print(quiz_time["elapsed"])
    # Restart timer
    quiz_time["end"] = None
    quiz_time["start"] = None
    return jsonify(data=quiz_time["elapsed"] )


@app.route('/table_setting/<table_setting_id>')
def table_setting(table_setting_id):
    table_setting = table_settings[str(table_setting_id)]
    id = table_setting_id
    return render_template('table_setting.html', table_setting=table_setting, id=id)


@app.route('/quiz/save_record', methods=['GET', 'POST'])
def save_record():
    record = request.get_json()
    # add id and score to user_score
    user_score_raw[record['id']] = (int(record['score']), int(record['full_score']))
    score = calc_score()
    return jsonify(data=score['score'])


@app.route('/quiz/<id>')
def quiz(id):
    if int(id) == 0:
        user_score_raw.clear()
    user_score_stat = calc_score()
    return render_template('quiz.html', data={"quiz_data": quiz_data[str(id)], "user_score": user_score_stat})


@app.route('/quiz/drag_and_drop')
def quiz_drag_drop():
    user_score_stat = calc_score()
    return render_template('quiz_drag_drop.html', data={"quiz_data": quiz_data["drag_and_drop"], "user_score": user_score_stat})


@app.route('/quiz/summary')
def quiz_summary():
    # calculate statistics
    data = calc_score()
    user_score_raw.clear()
    return render_template('quiz_summary.html', data=data)


if __name__ == '__main__':
    app.run(debug=True)
