from flask import Flask, jsonify
from flask_cors import CORS
from web_errors import WebError
from user_api.user_api import user_api
from user_api.medicine_api import medicine_api


app = Flask(__name__)
CORS(app)

app.url_map.strict_slashes = False
app.register_blueprint(user_api)
app.register_blueprint(medicine_api)

@app.route("/")
def hello_world():
    return jsonify({"message": "Welcome to the Medlocator backend.", "status": "OK"})

    
@app.errorhandler(WebError)
def handle_web_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.errorhandler(404)
def page_not_found(_err):
    response = jsonify({"message": "Endpoint not found."})
    response.status_code = 404
    return response


@app.errorhandler(405)
def method_not_found(_err):
    response = jsonify({"message": "Method not found."})
    response.status_code = 405
    return response


@app.errorhandler(500)
def internal_server_error(_err):
    response = jsonify({"message": "Internal Server Error"})
    response.status_code = 500
    return response

if __name__ == '__main__':
    app.run(debug=True)