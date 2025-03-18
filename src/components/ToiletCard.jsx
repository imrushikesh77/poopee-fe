import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaThumbsUp, FaThumbsDown, FaDirections } from "react-icons/fa";
import { likeToilet, dislikeToilet } from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function ToiletCard({ toilet }) {
  const [likes, setLikes] = useState(toilet.likes || 0);
  const [dislikes, setDislikes] = useState(toilet.dislikes || 0);
  const [userAction, setUserAction] = useState(null);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (toilet.photos && toilet.photos.length > 1) {
      const interval = setInterval(() => {
        // Always move forward in a circular manner
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % toilet.photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [toilet.photos]);

  const handleLike = async () => {
    if (userAction === "like") return;
    try {
      await likeToilet(toilet._id);
      setLikes(likes + 1);
      if (userAction === "dislike") {
        setDislikes(dislikes - 1);
      }
      setUserAction("like");
    } catch (error) {
      console.error("Failed to like toilet", error);
    }
  };

  const handleDislike = async () => {
    if (userAction === "dislike") return;
    try {
      await dislikeToilet(toilet._id);
      setDislikes(dislikes + 1);
      if (userAction === "like") {
        setLikes(likes - 1);
      }
      setUserAction("dislike");
    } catch (error) {
      console.error("Failed to dislike toilet", error);
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Peeing": return "bg-yellow-100 text-yellow-800";
      case "Pooping": return "bg-amber-700 text-white";
      case "Both": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="h-full"
        >
          {toilet.photos?.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo || "/placeholder.jpg"}
                alt={`Toilet ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold dark:text-white">{toilet.landmark}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${getBadgeColor(toilet.usedFor)}`}>
            {toilet.usedFor}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <FaMapMarkerAlt />
          <span>
            {parseFloat(toilet.location?.latitude).toFixed(4)},
            {parseFloat(toilet.location?.longitude).toFixed(4)}
          </span>
        </div>

        {toilet.distance && (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {toilet.distance < 1
              ? `${(toilet.distance * 1000).toFixed(0)} meters away`
              : `${toilet.distance.toFixed(1)} km away`}
          </p>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${userAction === "like" ? "text-blue-500" : "text-gray-500"
                }`}
            >
              <FaThumbsUp />
              <span>{likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 ${userAction === "dislike" ? "text-blue-500" : "text-gray-500"
                }`}
            >
              <FaThumbsDown />
              <span>{dislikes}</span>
            </button>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.location?.latitude},${toilet.location?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
          >
            <FaDirections />
            <span className="text-sm">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ToiletCard;