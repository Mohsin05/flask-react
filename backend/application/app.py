from __future__ import print_function  # Py 2.6+; In Py 3k not needed
from flask import request, render_template, jsonify, url_for, redirect, g
from flask_cors import CORS
from .models import User
from index import app
import json

with open('dataSource/data.json') as data:
    data = json.load(data)

@app.route("/questionnaire", methods = ['GET', 'POST'])
def questionnaire():
    if request.method == 'GET':
        return jsonify(data['questionnaire_0']['level_0'])
    elif request.method == 'POST':
        incomingData = request.json
        response = prepareResponse(incomingData)
        return jsonify(response)

def prepareResponse(incomingData):
    answer = incomingData['answer']
    level =  "level_" + str(incomingData['level'])
    history = incomingData['history']
    if level == 'level_3':
        print(*history,sep='->')
        return data['questionnaire_0'][level][history[1]][answer]
    else:
       return data['questionnaire_0'][level][answer]