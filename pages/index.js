import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();

  const createGame = () => {
    const newGameId = uuidv4().slice(0, 6);
    router.push(`/game/${newGameId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Kanye or Hitler?</h1>
      <button onClick={createGame} className="bg-green-500 p-2 rounded">Create Game</button>
    </div>
  );
}
