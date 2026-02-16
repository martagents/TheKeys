'use client'

export default function OrnateCorners() {
  return (
    <>
      {/* Top Left Corner */}
      <svg
        className="absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0 Q 20 20, 40 15 T 60 0 M 0 0 Q 20 20, 15 40 T 0 60"
          stroke="url(#gold-gradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="#D4AF37" opacity="0.6" />
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Right Corner */}
      <svg
        className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'scaleX(-1)' }}
      >
        <path
          d="M0 0 Q 20 20, 40 15 T 60 0 M 0 0 Q 20 20, 15 40 T 0 60"
          stroke="url(#gold-gradient2)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="#D4AF37" opacity="0.6" />
        <defs>
          <linearGradient id="gold-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom Left Corner */}
      <svg
        className="absolute bottom-4 left-4 w-16 h-16 md:w-20 md:h-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'scaleY(-1)' }}
      >
        <path
          d="M0 0 Q 20 20, 40 15 T 60 0 M 0 0 Q 20 20, 15 40 T 0 60"
          stroke="url(#gold-gradient3)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="#D4AF37" opacity="0.6" />
        <defs>
          <linearGradient id="gold-gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom Right Corner */}
      <svg
        className="absolute bottom-4 right-4 w-16 h-16 md:w-20 md:h-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'scale(-1, -1)' }}
      >
        <path
          d="M0 0 Q 20 20, 40 15 T 60 0 M 0 0 Q 20 20, 15 40 T 0 60"
          stroke="url(#gold-gradient4)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="#D4AF37" opacity="0.6" />
        <defs>
          <linearGradient id="gold-gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}
