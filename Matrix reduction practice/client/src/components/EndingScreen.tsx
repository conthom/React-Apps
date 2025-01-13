import { useEffect } from 'react';

const EndingScreen = ({ timer, onRestart }: { timer: number; onRestart: () => void }) => {
    useEffect(() => {
        // Stop the timer when the EndingScreen is displayed
        return () => clearInterval(timer);
    }, [timer]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
            <div className="flex justify-center bg-gray-900 text-white rounded-lg shadow-md p-6 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">Matrix Reduced!</h2>
                <p className="text-lg text-center mb-4">Time: {timer}s</p>
                <p className="text-lg text-center mb-6">Congratulations on reducing the matrix!</p>
                <div className="flex justify-center bg-gray-900 rounded-lg shadow-md p-6 max-w-md w-full">
                    <button
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4"
                        onClick={onRestart}
                    >
                        Restart
                    </button>
                    <button
                        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.location.href = '/'}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EndingScreen;
