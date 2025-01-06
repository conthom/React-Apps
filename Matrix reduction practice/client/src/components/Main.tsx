import React, { useState, useEffect } from "react";
import Matrix from "./Matrix";
import Difficulty from "./Difficulty";

export default function Main() {
    const [isLoading, setIsLoading] = useState(false);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [response, setResponse] = useState<{ matrix: number[][]; time: number } | null>(null);

    const fetchMatrix = async (difficulty: string) => {
        try {
            const res = await fetch(`/api/get-matrix?difficulty=${difficulty}`);
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Error fetching matrix:", error);
            setResponse({
                matrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], // Default 3x3 matrix
                time: 0, // Example fallback time
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (difficulty) {
            setIsLoading(true);
            fetchMatrix(difficulty);
        }
    }, [difficulty]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            {!response ? (
                <Difficulty setDifficulty={setDifficulty} setIsLoading={setIsLoading} setResponse={setResponse} isLoading={isLoading}/>
            ) : (
                Array.isArray(response.matrix) && response.matrix.length > 0 && (
                    <div>
                        <Matrix matrix={response.matrix} time={response.time} />
                        {/* Add any additional components below, if necessary */}
                    </div>
                )
            )}
        </div>
    );
}
