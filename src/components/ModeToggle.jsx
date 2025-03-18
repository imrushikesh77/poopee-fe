"use client"

import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { FaSun, FaMoon } from "react-icons/fa"

function ModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ModeToggle

