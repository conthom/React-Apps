from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import sympy as sp
app = Flask(__name__)
CORS(app, origins='*')
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
@app.route('/get_matrix', methods=['GET'])
def get_matrix():
    difficulty = request.args.get('difficulty')
    # Define matrix sizes based on difficulty
    if difficulty == 'medium':
        if np.random.rand() > 0.5:
            sizes = {'medium': (3, 4)}
        else:
            sizes = {'medium': (4, 3)}
    elif difficulty == 'hard':
        if np.random.rand() > 0.5:
            sizes = {'hard': (4, 5)}
        else:
            sizes = {'hard': (5, 4)}
    else:
        sizes = {'easy': (2, 2)}
    rows, cols = sizes.get(difficulty, (2, 2))
    
    # Generate random matrix
    matrix = np.random.randint(0, 10, size=(rows, cols)).tolist()
    
    return jsonify({
        'matrix': matrix,
    })
@app.route('/check_rref', methods=['POST'])
def check_rref():
    try:
        if not request.is_json:
            return jsonify({'error': 'Content type must be application/json'}), 400
        
        # Parse incoming JSON data
        data = request.get_json()
        print(f"Received data: {data}")

        if not data or 'matrix' not in data:
            return jsonify({'error': 'Matrix data is required'}), 400

        matrix_data = data['matrix']
        shape = matrix_data.get('shape')
        flat_data = matrix_data.get('data')

        if not shape or not flat_data:
            return jsonify({'error': 'Shape and data are required'}), 400

        # Validate shape and data length
        expected_size = shape[0] * shape[1]
        if len(flat_data) != expected_size:
            error_message = f"Data length ({len(flat_data)}) does not match shape {shape}."
            print(error_message)
            return jsonify({'error': error_message}), 400

        # Convert the flat list to a NumPy array
        try:
            matrix = np.array(flat_data).reshape(shape)
        except Exception as e:
            error_message = f"Error reshaping flat data: {str(e)}"
            print(error_message)
            return jsonify({'error': error_message}), 400

        print(f"Reconstructed matrix:\n{matrix}")

        # Convert to SymPy matrix for RREF calculation
        sympy_matrix = sp.Matrix(matrix)
        rref_matrix, _ = sympy_matrix.rref()

        # Convert the RREF matrix back to a list for JSON serialization
        rref_matrix_list = rref_matrix.tolist()

        # Ensure elements in the list are regular Python types (e.g., int or float)
        rref_matrix_serializable = [[float(val) if isinstance(val, sp.Basic) else val for val in row] for row in rref_matrix_list]

        return jsonify({
            'rref': rref_matrix_serializable,
        })
    except Exception as e:
        print(f"Error: {str(e)}")  # Detailed error logging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
