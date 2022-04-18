from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

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
@app.route('/')
def welcome():
    return render_template('home.html')


@app.route('/basic_rules')
def basic_rules():
    return render_template('basic_rules.html')


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
