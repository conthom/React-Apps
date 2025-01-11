import React, { useState, useEffect } from "react";
import fraction from "fraction.js";
export default function Matrix({ matrix = []}: { matrix: number[][]}) {
    const [stopwatch, setTimer] = useState(0);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedRow2, setSelectedRow2] = useState<number | null>(null);
    const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
    const [multiplier, setMultiplier] = useState<string>("1");
    const [rowMultiplier, setRowMultiplier] = useState<string>("");
    const [currentMatrix, setCurrentMatrix] = useState<number[][]>(matrix);
    const [reducedMatrix, setReducedMatrix] = useState<number[][]>([]);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval
    }, []);

 
    const parseMultiplier = (value: string): number => {
        if (value.includes('/')) {
            const [numerator, denominator] = value.split('/').map(Number);
            return numerator / denominator;
        }
        return parseFloat(value);
    };
    const operateRows = (matrix: number[][], row1: number, row2: number, operation: string, multiplier: number): number[][] => {
        if (multiplier === 0 || isNaN(multiplier)) {
            multiplier = 1;
        }
        const newMatrix = matrix.map((row) => [...row]); // Create a copy of the matrix
        for (let i = 0; i < newMatrix[row1].length; i++) {
            if (operation === "+") {
                newMatrix[row1][i] += multiplier * newMatrix[row2][i];
            } else if (operation === "-") {
                newMatrix[row1][i] -= multiplier * newMatrix[row2][i];
            }
        }
        return newMatrix;
    };

    const multiplyRow = (matrix: number[][], row1: number, multiplier: number): number[][] => {
        const newMatrix = matrix.map((row) => [...row]); // Create a copy of the matrix
        for (let i = 0; i < newMatrix[row1].length; i++) {
            newMatrix[row1][i] = newMatrix[row1][i] * multiplier;
        }
        return newMatrix;
    };

    const applyOperation = () => {
        if (selectedRow !== null && selectedRow2 !== null && selectedOperation) {
            const newMatrix = operateRows(currentMatrix, selectedRow, selectedRow2, selectedOperation, parseMultiplier(multiplier));
            setCurrentMatrix(newMatrix);
        }
    };
    const isReduced = async (): Promise<boolean> => {
        if (reducedMatrix.length === 0) {
            try {
                // Flatten the matrix and determine its shape
                const shape = [matrix.length, matrix[0].length];
                const flatData = matrix.flat(); // Flatten the matrix
    
                // Construct the JSON payload
                const payload = {
                    matrix: {
                        shape: shape,
                        order: 0, // Assuming row-major order
                        data: flatData
                    }
                };
    
                // Send the matrix with shape and data
                const response = await fetch(`http://localhost:5000/check_rref`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                console.log("Matrix sent to check_rref:", JSON.stringify(payload));
    
                // if (!response.ok) {
                //     throw new Error('Failed to fetch reduced matrix');
                // }
    
                const data = await response.json();
    
                console.log("Reduced matrix response:", data);
    
                if (!data.rref || data.rref.length === 0) {
                    console.warn("Matrix is empty or undefined:", data);
                }
    
                setReducedMatrix(data.rref);
            } catch (err) {
                console.error('Error fetching reduced matrix:', err);
            }
        }
    
        // Compare the currentMatrix and reducedMatrix
        const reduced = JSON.stringify(currentMatrix) === JSON.stringify(reducedMatrix);
        console.log("Matrix reduced?:", reduced);
        return reduced;
    };

    useEffect(() => {
        applyOperation();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">    
            <div className="mb-4 text-lg font-bold">Time: {stopwatch}s</div>
            <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-md p-6">
            <table className="w-full border-collapse border border-gray-500 text-gray-200 table-fixed">
                <tbody>
                {currentMatrix.map((row, i) => (
                    <tr
                    className={`hover:bg-gray-400 cursor-pointer ${selectedRow === i ? "bg-gray-500" : ""} ${selectedRow2 === i ? "bg-gray-600" : ""}`}
                    key={i}
                    onClick={() => {
                        if (selectedRow === i) {
                            if (selectedRow2 !== null){
                                setSelectedRow(selectedRow2);
                                setSelectedRow2(null);
                            }
                            else{
                                setSelectedRow(null);
                            }
                        } else if (selectedRow2 === i) {
                            setSelectedRow2(null);
                        } else if (selectedRow === null) {
                            setSelectedRow(i);
                        } else if (selectedRow2 === null) {
                            setSelectedRow2(i);
                        } else {
                            setSelectedRow(selectedRow2);
                            setSelectedRow2(i);
                        }
                    }}
                    >
                    {row.map((value, j) => (
                        <td
                        key={`${i}-${j}`}
                        className="border border-gray-500 px-4 py-2 text-center text-xl" style={{height: '50px' }}>
                        {new fraction(value).toFraction()}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
                <div className="flex items-center justify-center mb-4 bg-gray-900 rounded-lg">
                    <div className="mr-4 text-lg">Multiply Row {selectedRow !== null && selectedRow2 === null ? (selectedRow + 1) : "?"} by:</div>
                    <input
                        type="text"
                        className="text-center p-2 rounded bg-gray-800 text-white w-14"
                        placeholder="Num"
                        value={rowMultiplier}
                        onChange={(e) => setRowMultiplier(e.target.value)}
                    />
                    <button
                        className="bg-blue-900 rounded-lg shadow-md text-xl py-2 px-4 hover:bg-blue-500 ml-4"
                        type="button"
                        onClick={() => {
                            if (selectedRow !== null) {
                                const newMatrix = multiplyRow(currentMatrix, selectedRow, parseMultiplier(rowMultiplier));
                                setCurrentMatrix(newMatrix);
                                setSelectedRow(null);
                                setRowMultiplier("");
                                console.log("Row multiplied");
                                isReduced();
                            }
                        }}
                    >
                        Apply
                    </button>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <div className="mr-4 text-lg">Row {selectedRow !== null ? (selectedRow + 1) : "?"}</div>
                    <div className="flex space-x-2">
                        <button
                            className={`font-bold py-2 px-4 rounded ${selectedOperation === "+" ? "bg-green-800" : "bg-green-500 hover:bg-green-800"}`}
                            onClick={() => setSelectedOperation("+")}
                        >
                            +
                        </button>
                        <button
                            className={`font-bold py-2 px-4 rounded ${selectedOperation === "-" ? "bg-red-800" : "bg-red-500 hover:bg-red-800"}`}
                            onClick={() => setSelectedOperation("-")}
                        >
                            −
                        </button>
                    </div>
                    <div className="ml-4 text-lg">Row {selectedRow2 !== null ?(selectedRow2 + 1) : "?"} x</div>
                    <input
                        type="text"
                        className="text-center ml-2 p-2 rounded bg-gray-800 text-white w-14"
                        placeholder="1"
                        value={multiplier}
                        onChange={(e) => setMultiplier(e.target.value)}
                    />
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-900 rounded-lg shadow-md text-xl py-2 px-4 hover:bg-blue-500 mr-4"
                    type="button"
                    onClick={() => {
                        if (selectedRow !== null && selectedRow2 !== null) {
                            const newMatrix = [...currentMatrix];
                            [newMatrix[selectedRow], newMatrix[selectedRow2]] = [newMatrix[selectedRow2], newMatrix[selectedRow]];
                            setCurrentMatrix(newMatrix);
                            setSelectedRow(null);
                            setSelectedRow2(null);
                            console.log("Rows swapped");
                            isReduced();
                        }
                    }}
                >
                    Swap Rows
                </button>
                <button
                    className="bg-gray-900 rounded-lg shadow-md text-xl py-2 px-4 hover:bg-gray-500"
                    type="button"
                    onClick={() => {
                        applyOperation();
                        setSelectedRow(null);
                        setSelectedRow2(null);
                        setMultiplier("1");
                        console.log("Matrix operation applied");
                        isReduced();
                    }}
                >
                    Apply
                </button>
            </div>
            </div>
            <br></br>
            <h2> Row selected: <b>({selectedRow !== null ? selectedRow + 1 : "None"})</b> and <b>({selectedRow2 !== null ? selectedRow2 + 1 : "None"})</b> </h2>
            <br></br>
            <div className="flex justify-center mt-4">
            <button
            className="hover:bg-gray-500 bg-gray-800 rounded-lg shadow-md py-2 px-4"
            type="button"
            onClick={() => window.location.href = '/'}
            >
            Go Back
            </button>
            <button
                className="hover:bg-gray-500 bg-gray-800 rounded-lg shadow-md py-2 px-4 ml-4"
                type="button"
                onClick={() => setCurrentMatrix(matrix)}
            >
                Reset Matrix
            </button>
            </div>  
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Instructions:</h3>
                <ul className="list-disc list-inside">
                    <li>Click on two rows to select them or just one row to multiply it.</li>
                    <li>Choose an operation (+ or -) and set a multiplier. (Can be fraction / decimal)</li>
                    <li>Click "Apply" to perform the operation on the selected row(s).</li>
                    <li>The first row selected will always be the subject of the row operation.</li>
                </ul>
            </div>
        </div>
    );
}
