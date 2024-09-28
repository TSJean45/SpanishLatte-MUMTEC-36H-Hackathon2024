from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/optimization-results', methods=['GET'])
def get_optimization_results():
    with open('C:/Users/szuje/Documents/testing-plugin/optimization_results.json') as results_file:
        data = json.load(results_file)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
