import React, { useState, useEffect } from "react";
export default function Matrix({ matrix = [], time }: { matrix: number[][]; time: number }) {
    const [stopwatch, setTimer] = useState(time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="mb-4 text-lg font-bold">Time: {stopwatch}s</div>
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
