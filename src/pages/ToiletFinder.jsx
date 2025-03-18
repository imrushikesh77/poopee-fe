import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaCompass, FaMapMarkerAlt, FaPlus, FaQuestion } from "react-icons/fa"
import ToiletCard from "../components/ToiletCard"
import EmptyState from "../components/EmptyState"
import { getToilets } from "../utils/api"

function ToiletFinder() {
  const navigate = useNavigate()
  const [toilets, setToilets] = useState([])
  const [loading, setLoading] = useState(false)
  const [radius, setRadius] = useState(1)
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [error, setError] = useState("")
  const [searchAttempted, setSearchAttempted] = useState(false)

  const funnyQuotes = [
    "Be the first one to help others release pressure!",
    "Vosco Gamma invented India!",
    "You can be a hero by finding toilets around you!",
    "No toilets found? That's a crappy situation!",
    "Help others avoid the pee-dicament you're in!",
    "Be the number one at finding number two spots!",
  ]

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (err) => {
          setError("Unable to get your location. Please enable location services.")
        },
      )
    } else {
      setError("Geolocation is not supported by your browser.")
    }
  }, [])

  const findToilets = async () => {
    if (!location.latitude || !location.longitude) {
      setError("Location not available. Please enable location services.")
      return
    }

    setLoading(true)
    setError("")
    setSearchAttempted(true)

    try {
      const data = await getToilets(location.latitude, location.longitude, radius)
      setToilets(data.toilets)
    } catch (err) {
      setError("Failed to fetch toilets. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search radius (km)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-full p-3 rounded-xl border border-gray-200 dark:text-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
              <button
                onClick={findToilets}
                disabled={loading}
                className="px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
              >
                <FaCompass />
                {loading ? "Searching..." : "Find"}
              </button>
            </div>
          </div>

          {location.latitude && location.longitude && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="flex-shrink-0" />
              <span>
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </span>
            </div>
          )}
        </div>
      </div>

      {searchAttempted && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toilets.length > 0 ? (
            toilets.map((toilet) => <ToiletCard key={toilet._id} toilet={toilet} />)
          ) : (
            <EmptyState />
          )}
        </div>
      )}

      <div className="fixed bottom-6 right-6 space-y-3">
        {/* How to Use Button */}
        <button
          onClick={() => navigate("/how-to-use")}
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 transition-colors"
          aria-label="How to Use"
        >
          <FaQuestion />
        </button>

        {/* Add Toilet Button */}
        <button
          onClick={() => navigate("/add-toilet")}
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition-colors"
          aria-label="Add Toilet"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ToiletFinder;