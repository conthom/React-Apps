import React, { useState, useEffect } from "react";
export default function Matrix({ matrix = [], time = 0 }: { matrix: number[][]; time: number }) {
    const [stopwatch, setTimer] = useState(time || 0); // Fallback to 0 if time is undefined
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">    
            <div className="mb-4 text-lg font-bold">Time: {stopwatch}s</div>
            <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-md p-6">
            <table className="w-full border-collapse border border-gray-500 text-gray-200 table-fixed">
                <tbody>
                {matrix.map((row, i) => (
                    <tr
                    className={`hover:bg-gray-400 cursor-pointer ${selectedRow === i ? "bg-gray-600" : ""}`}
                    key={i}
                    onClick={() => setSelectedRow(i)}
                    >
                    {row.map((value, j) => (
                        <td
                        key={`${i}-${j}`}
                        className="border border-gray-500 px-4 py-2 text-center text-xl" style={{height: '50px' }}>
                        {value}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <h2> Row selected: {selectedRow !== null ? selectedRow + 1 : "None"} </h2>
            <br></br>
            <button
            className="hover:bg-gray-400 bg-gray-900 rounded-lg shadow-md py-2 px-4"
            type="button"
            onClick={() => window.location.href = '/'}
            >
            Go Back
            </button>
        </div>
    );
}
