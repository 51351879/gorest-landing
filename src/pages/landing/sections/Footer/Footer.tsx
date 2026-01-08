export default function Footer() {
  return (
    <footer className="py-16 px-16">
      <div className="max-w-7xl mx-auto">
        <div className="glass-morphic px-12 py-14 flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <img src="/gorest-logo.png" alt="Gorest" className="h-11 w-auto" />
            <p className="text-[#878787] text-xl">
              © 2025 Gorest Inc. All rights reserved.
            </p>
          </div>

          <div className="flex gap-24">
            <div className="flex flex-col gap-3">
              <h4 className="text-white text-xl font-medium mb-1">Pages</h4>
              <a href="#home" className="text-[#878787] text-xl hover:text-white transition-colors">
                Home
              </a>
              <a href="#about" className="text-[#878787] text-xl hover:text-white transition-colors">
                About
              </a>
              <a href="#canvas" className="text-[#878787] text-xl hover:text-white transition-colors">
                Canvas
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-white text-xl font-medium mb-1">Contact</h4>
              <a href="mailto:contact@gorest.com" className="text-[#878787] text-xl hover:text-white transition-colors">
                Email
              </a>
              <a href="https://github.com" className="text-[#878787] text-xl hover:text-white transition-colors">
                Github
              </a>
              <a href="https://twitter.com" className="text-[#878787] text-xl hover:text-white transition-colors">
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}