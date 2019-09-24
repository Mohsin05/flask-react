from flask import Flask
from config import BaseConfig
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(BaseConfig)
CORS(app)
