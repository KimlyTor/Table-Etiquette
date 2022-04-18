from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# ROUTES
@app.route('/')
def welcome():
    return render_template('home.html')


@app.route('/basic_rules')
def basic_rules():
    return render_template('basic_rules.html')


@app.route('/table_setting')
def table_setting():
    return render_template('table_setting.html')


@app.route('/quiz')
def quiz():
    return render_template('quiz.html')
# AJAX FUNCTIONS


if __name__ == '__main__':
    app.run(debug=True)
