from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def status_api():
    return jsonify({
        "status": "sucesso",
        "mensagem": "API do KitGift rodando com sucesso na Etapa 1!"
    }), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
