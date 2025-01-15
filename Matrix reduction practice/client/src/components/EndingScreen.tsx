import { useEffect } from "react";
import confetti from "canvas-confetti";

const EndingScreen = ({ timer, onRestart }: { timer: number | null; onRestart: () => void }) => {
    useEffect(() => {
        // Trigger confetti animation when the component mounts
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
        });

        // Optionally, run multiple bursts
        const bursts = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { x: Math.random(), y: Math.random() * 0.8 },
            });
        }, 1000);

        return () => clearInterval(bursts); // Clean up the confetti bursts on unmount
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col items-center justify-center">
            <div className="bg-gray-900 text-white rounded-lg shadow-md p-8 w-80">
                <h2 className="text-3xl font-bold mb-4 text-center">Matrix Reduced!</h2>
                <p className="text-lg text-center mb-4">Time: {timer}s</p>
                <p className="text-lg text-center mb-6">Congratulations on reducing the matrix!</p>
                <div className="flex flex-col space-y-4">
                    <button
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        onClick={onRestart}
                    >
                        Restart
                    </button>
                    <button
                        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.location.href = "/"}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EndingScreen;