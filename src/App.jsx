import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import getYouTubeID from 'get-youtube-id'
import { ToastContainer, toast } from 'react-toastify'

const App = () => {
  const urlModel = [
    { width: 120, height: 90, url: 'https://img.youtube.com/vi', fileName: 'default.jpg' },
    { width: 320, height: 180, url: 'https://img.youtube.com/vi', fileName: 'mqdefault.jpg' },
    { width: 480, height: 360, url: 'https://img.youtube.com/vi', fileName: 'hqdefault.jpg' },
    { width: 640, height: 480, url: 'https://img.youtube.com/vi', fileName: 'sddefault.jpg' },
    { width: 1280, height: 720, url: 'https://img.youtube.com/vi', fileName: 'maxresdefault.jpg' }
  ]

  const [url, setUrl] = useState('')
  const [thumbnails, setThumbnails] = useState([])

  const fetchThumbnail = async (e) => {
    e.preventDefault()
    const videoId = getYouTubeID(url)
    if (videoId) {
      const model = urlModel.map((item) => ({
        ...item,
        url: `${item.url}/${videoId}/${item.fileName}`
      }))
      setThumbnails(model)
    } else {
      toast.error('Please enter a valid YouTube URL')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black py-10 px-4 text-white">
      {/* Header */}
      <div className="text-center animate__animated animate__fadeInDown">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
          YouTube Thumbnail Downloader
        </h1>
        <p className="mt-3 text-gray-300 text-base md:text-lg">
          🚀 Get high-quality thumbnails instantly from any YouTube video!
        </p>

        {/* Search Form */}
        <form
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8"
          onSubmit={fetchThumbnail}
        >
          <input
            type="url"
            className="border border-gray-700 bg-white/10 backdrop-blur-md shadow-md focus:ring-2 focus:ring-pink-500 rounded-xl px-4 py-3 w-full md:w-96 text-gray-200 placeholder-gray-400 outline-none"
            required
            placeholder="🔗 Paste YouTube URL here..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg text-white px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-transform duration-200"
          >
            <i className="ri-search-line"></i>
            Search
          </button>
        </form>
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 w-full md:w-11/12 mx-auto animate__animated animate__fadeInUp">
          {thumbnails.map((item, index) => (
            <div
              className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-lg hover:shadow-pink-500/40 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
              key={index}
            >
              <img
                src={item.url}
                className="w-full h-[200px] sm:h-[250px] object-cover rounded-t-2xl"
                alt={`Thumbnail ${item.width}x${item.height}`}
              />
              <div className="p-5 flex flex-col sm:flex-row items-center justify-between bg-black/40 backdrop-blur-md">
                <h1 className="text-lg font-semibold text-pink-300">
                  {item.width}x{item.height}
                </h1>
                <a href={item.url} target="_blank" download rel="noreferrer">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl mt-3 sm:mt-0 hover:opacity-90 active:scale-95 transition-transform duration-200">
                    <i className="ri-download-line"></i>
                    Download
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default App
