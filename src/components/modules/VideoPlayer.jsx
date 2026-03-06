import { Play, Pause, Volume2, Maximize } from 'lucide-react'
import { useState } from 'react'

const VideoPlayer = ({ poster, src }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    // Placeholder functionality for the UI demo
    const togglePlay = () => setIsPlaying(!isPlaying)

    return (
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group shadow-2xl border border-white/5">
            {/* Placeholder Image / Poster */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                {poster && <img src={poster} alt="Video thumbnail" className="w-full h-full object-cover opacity-50" />}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Play Button (Center) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white shadow-glow-cyan transform transition-all duration-300 hover:scale-110 pl-1"
                    >
                        <Play size={40} fill="currentColor" />
                    </button>
                </div>
            )}

            {/* Controls Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden">
                    <div className="h-full w-1/3 bg-cyan rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                        <button onClick={togglePlay} className="hover:text-cyan transition-colors">
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        </button>
                        <div className="flex items-center gap-2 group/vol">
                            <Volume2 size={24} />
                            <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                <div className="w-24 h-1 bg-white/20 rounded-full ml-2">
                                    <div className="w-1/2 h-full bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                        <span className="text-sm font-medium">04:12 / 12:45</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium hover:text-cyan transition-colors">1.0x</button>
                        <button className="hover:text-cyan transition-colors">
                            <Maximize size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
