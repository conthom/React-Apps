import React, { useState } from "react";
import Matrix from "./Matrix";
import Difficulty from "./Difficulty";

export default function Main() {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<{ matrix: number[][]} | null>(null);
    return (
        <div className="flex justify-center items-center min-h-screen">
            {!response ? (
                <Difficulty 
                    setIsLoading={setIsLoading} 
                    setResponse={setResponse} 
                    isLoading={isLoading} 
                />
            ) : (
                Array.isArray(response.matrix) && response.matrix.length > 0 && (
                    <div>
                        <Matrix matrix={response.matrix} />
                    </div>
                )
            )}
        </div>
    );
}
