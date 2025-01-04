import React, { useState, useEffect } from 'react';

async function fetchMatrix() {
    // Simulating a call to the Python backend.
    // Replace with your actual API endpoint and fetch logic.
    const response = await fetch('/api/get-matrix'); // Example endpoint
    const data = await response.json();
    return data; // Assumes data is a 2D array, e.g., [[1, 2], [3, 4]]
}

export default function Matrix() {
    const [matrix, setMatrix] = useState<number[][]>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]);
    const rows = matrix.length;
    const cols = rows > 0 ? matrix[0].length : 0;

    useEffect(() => {
        async function loadMatrix() {
            const data = await fetchMatrix();
            setMatrix(data);
        }
        loadMatrix();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-md p-6">
                <table className="w-full border-collapse border border-gray-500 text-gray-200">
                    <tbody>
                        {matrix.map((row, i) => (
                            <tr className="hover:bg-gray-400 cursor-pointer" key={i}>
                                {row.map((value, j) => (
                                    <td
                                        key={`${i}-${j}`}
                                        className="border border-gray-500 px-4 py-2 text-center"
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
