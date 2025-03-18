// API functions for interacting with the backend

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"

// Function to get toilets based on location and radius
export async function getToilets(latitude, longitude, radius) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/toilet?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch toilets")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching toilets:", error)
    throw error
  }
}

// Function to add a new toilet
export async function addToilet(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/toilet`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header when sending FormData
    })

    if (!response.ok) {
      throw new Error("Failed to add toilet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding toilet:", error)
    throw error
  }
}

// Function to like a toilet
export async function likeToilet(toiletId) {
  try {
    const response = await fetch(`${API_BASE_URL}/toilet/${toiletId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to like toilet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error liking toilet:", error)
    throw error
  }
}

// Function to dislike a toilet
export async function dislikeToilet(toiletId) {
  try {
    const response = await fetch(`${API_BASE_URL}/toilet/${toiletId}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to dislike toilet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error disliking toilet:", error)
    throw error
  }
}

