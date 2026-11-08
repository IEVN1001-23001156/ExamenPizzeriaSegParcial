# src/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from blueprints.pedidos.routes import pedidos_blueprint

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

app.register_blueprint(pedidos_blueprint)

@app.route('/')
def index():
    return jsonify({"mensaje": "Pizzeria funcionando"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)