import React, { useState, useEffect } from 'react';
import { Label, Select, TextInput, Textarea } from 'flowbite-react';

interface ResponseData {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setResponse: (response: any) => void;
    setDifficulty: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Difficulty({
    isLoading,
    setIsLoading,
    setResponse,
    setDifficulty,
}: ResponseData) {
    const [difficulty, setLocalDifficulty] = useState("Easy");
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDifficulty = event.target.value;
        setLocalDifficulty(newDifficulty);
        setDifficulty(newDifficulty);
    };

    return (
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-center mt-4 text-lg font-bold">
            <h2>Ready to practice matrix reduction?</h2>
            </div>
            <div className="flex justify-center mt-4">
            <p>Try to set a new speed record!</p>
            </div>
            <div className="flex justify-center mt-4">
            <p>Select a difficulty below:</p>
            </div>
            <div className="flex justify-center mt-4">
            <form>
                <div>
                    <input 
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={difficulty === "easy"}
                        onChange={handleDifficultyChange}
                    />
                    <label className="hover:cursor-pointer" htmlFor="easy" style={{ color: 'green' }}> Easy</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={difficulty === "medium"}
                        onChange={handleDifficultyChange}
                    />
                    <label className="hover:cursor-pointer" htmlFor="medium" style={{ color: 'orange' }}> Medium</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={difficulty === "hard"}
                        onChange={handleDifficultyChange}
                    />
                    <label className="hover:cursor-pointer" htmlFor="hard" style={{ color: 'red' }}> Hard</label>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="bg-gray-900 rounded-lg shadow-md text-xl py-2 px-4" type="submit">Begin</button>
                </div>
            </form>
            </div>
        </div>
    );
}