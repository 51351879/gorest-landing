export default function Footer() {
  return (
    // py-16: 上下内边距 | px-8: 左右内边距（可调整）
    <footer className="py-16 px-8">
      {/* max-w-none: 取消最大宽度限制，让框更宽 | 改成 max-w-7xl 可限制宽度 */}
      <div className="max-w-none mx-auto px-8">
        {/* px-12 py-10: 框内边距 | items-start: 内容靠上对齐 */}
        <div className="glass-morphic px-20 py-10 flex items-start justify-between">
          {/* 左侧区域：logo + copyright | self-stretch: 高度拉伸与右侧对齐 | justify-center: 内容垂直居中 */}
          <div className="flex flex-col gap-2 items-start self-stretch justify-center">
            {/* h-11: logo高度(44px) | object-left: 图片内容靠左 | 可改成 h-10(40px), h-12(48px) 等 */}
            <img src="/gorest-logo.png" alt="Gorest" className="h-9 w-auto object-contain object-left" />
            {/* text-base: 字号16px | 可改成 text-sm(14px), text-lg(18px) */}
            <p className="text-[#878787] text-base">
              © 2025 Gorest Inc. All rights reserved.
            </p>
          </div>

          {/* 右侧区域 | gap-16: 两列间距 | 可改成 gap-12, gap-20 等 */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              {/* text-base: 标题字号 | font-medium: 字重 */}
              <h4 className="text-white text-base font-medium mb-1">Pages</h4>
              {/* text-sm: 链接字号(14px) | 可改成 text-base(16px) */}
              <a href="#home" className="text-[#878787] text-sm hover:text-white transition-colors">
                Home
              </a>
              <a href="#about" className="text-[#878787] text-sm hover:text-white transition-colors">
                About
              </a>
              <a href="#canvas" className="text-[#878787] text-sm hover:text-white transition-colors">
                Canvas
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white text-base font-medium mb-1">Contact</h4>
              <a href="mailto:contact@gorest.com" className="text-[#878787] text-sm hover:text-white transition-colors">
                Email
              </a>
              <a href="https://github.com" className="text-[#878787] text-sm hover:text-white transition-colors">
                Github
              </a>
              <a href="https://twitter.com" className="text-[#878787] text-sm hover:text-white transition-colors">
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}