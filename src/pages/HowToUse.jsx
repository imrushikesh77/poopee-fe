import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaHandsWash, FaWater, FaToilet } from "react-icons/fa";

function HowToUse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
        >
          <FaArrowLeft />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              🚽 Public Toilet Guide for India
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your ultimate guide to navigating public toilets in India with confidence!
            </p>
          </div>

          {/* Survival Guide Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FaToilet className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Survival Guide
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-blue-600">Rule #1:</span> Always carry toilet paper or tissues!
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-blue-600">Rule #2:</span> Sanitizer is your emergency BFF!
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-blue-600">Rule #3:</span> Keep ₹5 coins handy for paid toilets.
              </p>
            </div>
          </div>

          {/* Toilet Types Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FaCheck className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Toilet Types Demystified
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "🚽",
                  title: "Western Toilets",
                  description: "Found in malls & restaurants. Use seat covers and remember to flush!",
                },
                {
                  icon: "🪠",
                  title: "Squat Toilets",
                  description: "Face the pipe, squat carefully. Use lota (water mug) for cleaning.",
                },
                {
                  icon: "🏪",
                  title: "Sulabh Shauchalaya",
                  description: "₹2-5 charge, relatively clean. Still bring your own tissues!",
                },
              ].map((type, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl mb-3">{type.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Exit Protocol Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <FaHandsWash className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Clean Exit Protocol
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-green-200 dark:border-green-800">
              {[
                "Use foot to flush (railway stations)",
                "Pour water in Indian toilets",
                "Sanitize hands thoroughly",
                "Use tissue on door handles",
                "Rate on Poopee app",
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <FaWater className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Emergency Options
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              🚨 McDonald's • Café Coffee Day • Shopping Malls • Metro Stations • Petrol Pumps • Hotels (ask politely)
            </p>
          </div>

          {/* Quote Section */}
          <div className="text-center italic text-gray-600 dark:text-gray-400 mt-10">
            "A clean toilet is civilization's mirror. Keep India shining! 🌟"<br />
            - Swachh Bharat Mission
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;