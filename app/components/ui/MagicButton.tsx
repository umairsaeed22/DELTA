import React from 'react'

const MagicButton = () => {
  return (
    <a className="relative inline-flex mt-10 mb-10 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none" href="#quotation">
  {/* Animated Border */}
  <span className="absolute inset-[-1000%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CE604A_0%,#FFF_50%,#FFF_100%)]" />
  
  {/* Button Content */}
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#FA126C] to-[#FF9F4B] px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    <span>Get Started &nbsp; →</span>
  </span>
</a>

  )
}

export default MagicButton;
