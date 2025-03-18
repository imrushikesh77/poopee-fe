import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaCamera, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa"
import { addToilet } from "../utils/api"
// import toiletAnimation from "../assets/toilet-animation.gif"

function AddToilet() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [formData, setFormData] = useState({
    landmark: "",
    usedFor: "",
  })
  const [photos, setPhotos] = useState([])
  const [photoPreview, setPhotoPreview] = useState([])
  const fileInputRef = useRef(null)

  // Get user's location when component mounts
  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, usedFor: e.target.value }))
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, ...files])

      // Create preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setPhotoPreview((prevPreviews) => [...prevPreviews, ...newPreviews])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!formData.landmark) {
      setError("Please provide a landmark")
      setLoading(false)
      return
    }

    if (!formData.usedFor) {
      setError("Please select what this toilet is used for")
      setLoading(false)
      return
    }

    if (photos.length < 2) {
      setError("Please upload at least 2 photos")
      setLoading(false)
      return
    }

    if (!location.latitude || !location.longitude) {
      setError("Location not available. Please enable location services.")
      setLoading(false)
      return
    }

    try {
      // Create form data to send
      const toiletFormData = new FormData()
      toiletFormData.append("landmark", formData.landmark)
      toiletFormData.append("usedFor", formData.usedFor)
      toiletFormData.append("latitude", location.latitude)
      toiletFormData.append("longitude", location.longitude)

      // Append photos
      photos.forEach((photo) => {
        toiletFormData.append("photos", photo)
      })

      await addToilet(toiletFormData)
      setSuccess(true)

      // Reset form
      setFormData({
        landmark: "",
        usedFor: "",
      })
      setPhotos([])
      setPhotoPreview([])

      // Redirect after success
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (err) {
      setError("Failed to add toilet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Add New Toilet</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Landmark</label>
              <input
                name="landmark"
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Near Coffee Shop"
                value={formData.landmark}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Purpose
              </label>
              <div className="relative">
                <select
                  value={formData.usedFor}
                  onChange={handleSelectChange}
                  className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                >
                  <option value="" className="text-gray-400 dark:text-gray-500">
                    Select toilet type
                  </option>
                  <option value="Peeing" className="text-gray-900 dark:text-gray-100">
                    💦 Peeing
                  </option>
                  <option value="Pooping" className="text-gray-900 dark:text-gray-100">
                    💩 Pooping
                  </option>
                  <option value="Both" className="text-gray-900 dark:text-gray-100">
                    💦+💩 Both
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Photos</label>
              <div className="grid grid-cols-2 gap-4">
                {photoPreview.map((preview, index) => (
                  <div key={index} className="aspect-square relative rounded-xl overflow-hidden">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {photoPreview.length < 4 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-colors"
                  >
                    <FaCamera className="text-2xl mb-2" />
                    <span className="text-sm">Add Photo</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoChange}
              />
              <p className="text-sm text-gray-500 mt-2">
                {photos.length < 2
                  ? `Upload at least ${2 - photos.length} more photo${photos.length === 1 ? "" : "s"}`
                  : `${photos.length} photos selected`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Location</label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <span className="text-sm">
                  {location.latitude?.toFixed(6)}, {location.longitude?.toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Toilet added successfully! Redirecting...</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl font-medium transition-colors"
          >
            {loading ? "Adding..." : "Add Toilet"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddToilet;