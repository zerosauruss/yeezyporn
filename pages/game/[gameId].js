import { useState } from "react";
import { useRouter } from "next/router";
import quotes from "../../data/quotes.json";

export default function Game() {
  const router = useRouter();
  const { gameId } = router.query;
  const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const joinGame = () => {
    if (!username) return;
    setJoined(true);
  };

  const handleGuess = (guess) => {
    if (!joined) return;
    const correct = quotes[index].author === guess;
    setScore(score + (correct ? 1 : 0));
    setIndex(Math.floor(Math.random() * quotes.length));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Kanye or Hitler?</h1>
      {!joined ? (
        <div>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 rounded text-black" />
          <button onClick={joinGame} className="bg-blue-500 p-2 rounded ml-2">Join Game</button>
        </div>
      ) : (
        <>
          <p className="text-xl text-center italic max-w-xl mb-4">"{quotes[index].text}"</p>
          <div className="flex gap-4">
            <button className="bg-blue-500 p-2 rounded" onClick={() => handleGuess("Kanye")}>Kanye</button>
            <button className="bg-red-500 p-2 rounded" onClick={() => handleGuess("Hitler")}>Hitler</button>
          </div>
          <p className="mt-4">Score: {score}</p>
        </>
      )}
    </div>
  );
}
