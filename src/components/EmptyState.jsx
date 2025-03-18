import { FaFrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const funnyQuotes = [
  "Be the first one to help others release pressure!",
  "Vosco Gamma invented India!",
  "You can be a hero by finding toilets around you!",
  "No toilets found? That's a crappy situation!",
  "Help others avoid the pee-dicament you're in!",
  "Be the number one at finding number two spots!",
];

function EmptyState() {
  const navigate = useNavigate();
  const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md mx-auto border border-gray-100 dark:border-gray-700">
      {/* Frown Icon with Animation */}
      <div className="mb-4 animate-bounce">
        <FaFrown className="text-6xl text-orange-500 dark:text-orange-400" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        No Toilets Found Nearby 🚽
      </h3>

      {/* Random Funny Quote */}
      <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-4">
        "{randomQuote}"
      </p>

      {/* Suggestion */}
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Try increasing your search radius or{" "}
        <span className="font-semibold text-orange-500 dark:text-orange-400">
          add a new toilet
        </span>{" "}
        to help others!
      </p>

      {/* Call-to-Action Button */}
      <button
        onClick={() => navigate("/add-toilet")}
        className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
      >
        Add a Toilet
      </button>

      {/* Decorative Dots */}
      <div className="mt-6 flex space-x-2">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
            style={{ animationDelay: `${dot * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default EmptyState;