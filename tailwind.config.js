/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        zushi: {
          blue: '#007AFF', // Ocean Blue
          light: '#E0F2FE', // Light Sky
          sand: '#F3F4F6', // Sand/Gray
          accent: '#F59E0B', // Sunset
        }
      }
    },
  },
  plugins: [],
}
