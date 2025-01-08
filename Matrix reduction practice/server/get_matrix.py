from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
app = Flask(__name__)
CORS(app, origins='*')
# CORS(app,'http://localhost:5000')
@app.route('/get_matrix', methods=['GET'])
def get_matrix():
    difficulty = request.args.get('difficulty')
    # Define matrix sizes based on difficulty
    sizes = {
        'easy': (2, 2),
        'medium': (3, 3),
        'hard': (4, 4)
    }
    rows, cols = sizes.get(difficulty, (2, 2))
    
    # Generate random matrix
    matrix = np.random.randint(1, 10, size=(rows, cols)).tolist()
    
    return jsonify({
        'matrix': matrix,
        # 'time_limit': 30 if difficulty == 'easy' else 60 if difficulty == 'medium' else 90
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0')