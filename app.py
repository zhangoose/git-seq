from bs4 import BeautifulSoup
from flask import Flask, render_template, request, redirect
import requests
import cgi


app = Flask(__name__)

@app.route("/<username>")
def play(username):
    r = requests.get('https://www.github.com/' + username)
    data = r.text
    soup = BeautifulSoup(data)

    # instantiating an empty array of arrays for all the contributions
    to_play = [[] for i in range(54)] 
    curr_index = 0

    # for each `y=` attribute on each <rect>, an index mapping
    y_trans = {0:0, 13:1, 26:2, 39:3, 52:4, 65:5, 78:6}

    svg = soup.find('svg', class_='js-calendar-graph-svg')
    svg = str(svg).replace('\n', '')

    # looping through each <rect>
    for rect in soup.findAll('rect', class_='day'):
        # increment pagination index when starting over
        if rect.get('y') == '0':
            curr_index += 1
        if rect.get('fill') != '#eeeeee':
            to_play[curr_index].append(y_trans[int(rect.get('y'))])

    return render_template(
        "play.html", username = username, to_play = to_play, svg = svg)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/", methods=['POST'])
def form():
    username = request.form['username']
    return redirect("/{}".format(username))


if __name__ == "__main__":
    app.run()
