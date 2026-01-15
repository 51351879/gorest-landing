export default function Navbar() {
  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-morphic flex items-center gap-12 px-8 py-4">
        <img src="/logo-icon.png" alt="Gorest" className="h-8 w-auto" />
        <a 
          href="#home" 
          className="text-white text-xl font-['JetBrains_Mono'] hover:text-[#bbf4a2] transition-colors"
        >
          Home
        </a>
        <a 
          href="#about" 
          className="text-white text-xl font-['JetBrains_Mono'] hover:text-[#bbf4a2] transition-colors"
        >
          About
        </a>
        <a 
          href="#canvas" 
          className="text-white text-xl font-['JetBrains_Mono'] hover:text-[#bbf4a2] transition-colors"
        >
          Canvas
        </a>
      </div>
    </nav>
  )
}