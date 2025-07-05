'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Page = () => {
  const [showContent, setShowContent] = useState(false)

  // Final content shows after all drawing animations
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  // Constants for proportions
  const cardWidth = 320
  const cardHeight = 260
  const buttonWidth = 240
  const buttonHeight = 40
  const cardTop = `calc(50% - ${cardHeight / 2}px)`
  const cardLeft = `calc(50% - ${cardWidth / 2}px)`
  const button1Top = `calc(50% - 20px)`
  const button2Top = `calc(50% + 40px)`
  const buttonLeft = `calc(50% - ${buttonWidth / 2}px)`

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center relative overflow-hidden">

      {/* DRAWING STAGE */}
      <AnimatePresence>
        {!showContent && (
          <>
            {/* Outer Rectangle (Card) */}
            {/* Top Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: cardWidth }}
              transition={{ duration: 0.4 }}
              className="absolute h-0.5 bg-white"
              style={{ top: cardTop, left: '50%', transform: 'translateX(-50%)' }}
            />

            {/* Right Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: cardHeight }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute w-0.5 bg-white"
              style={{ top: cardTop, left: `calc(50% + ${cardWidth / 2}px)` }}
            />

            {/* Bottom Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: cardWidth }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute h-0.5 bg-white"
              style={{ top: `calc(50% + ${cardHeight / 2}px)`, left: '50%', transform: 'translateX(-50%)' }}
            />

            {/* Left Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: cardHeight }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="absolute w-0.5 bg-white"
              style={{ top: cardTop, left: `calc(50% - ${cardWidth / 2}px)` }}
            />

            {/* Button 1 Box */}
            {['top', 'right', 'bottom', 'left'].map((side, i) => {
              const delay = 1.6 + i * 0.2
              const styles = {
                top: { top: button1Top, left: '50%', transform: 'translateX(-50%)', width: buttonWidth, height: '2px' },
                right: { top: button1Top, left: `calc(50% + ${buttonWidth / 2}px)`, width: '2px', height: buttonHeight },
                bottom: { top: `calc(${button1Top} + ${buttonHeight}px)`, left: '50%', transform: 'translateX(-50%)', width: buttonWidth, height: '2px' },
                left: { top: button1Top, left: `calc(50% - ${buttonWidth / 2}px)`, width: '2px', height: buttonHeight },
              }

              return (
                <motion.div
                  key={`b1-${side}`}
                  initial={side === 'top' || side === 'bottom' ? { width: 0 } : { height: 0 }}
                  animate={side === 'top' || side === 'bottom' ? { width: buttonWidth } : { height: buttonHeight }}
                  transition={{ duration: 0.3, delay }}
                  className="absolute bg-blue-700"
                  style={styles[side]}
                />
              )
            })}

            {/* Button 2 Box */}
            {['top', 'right', 'bottom', 'left'].map((side, i) => {
              const delay = 2.4 + i * 0.2
              const styles = {
                top: { top: button2Top, left: '50%', transform: 'translateX(-50%)', width: buttonWidth, height: '2px' },
                right: { top: button2Top, left: `calc(50% + ${buttonWidth / 2}px)`, width: '2px', height: buttonHeight },
                bottom: { top: `calc(${button2Top} + ${buttonHeight}px)`, left: '50%', transform: 'translateX(-50%)', width: buttonWidth, height: '2px' },
                left: { top: button2Top, left: `calc(50% - ${buttonWidth / 2}px)`, width: '2px', height: buttonHeight },
              }

              return (
                <motion.div
                  key={`b2-${side}`}
                  initial={side === 'top' || side === 'bottom' ? { width: 0 } : { height: 0 }}
                  animate={side === 'top' || side === 'bottom' ? { width: buttonWidth } : { height: buttonHeight }}
                  transition={{ duration: 0.3, delay }}
                  className="absolute bg-gray-600"
                  style={styles[side]}
                />
              )
            })}
          </>
        )}
      </AnimatePresence>

      {/* FINAL CONTENT */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#2a2a2a]/80 border-2 border-white backdrop-blur-md p-10  shadow-2xl w-[320px] h-[260px] text-white  z-10 flex flex-col justify-between text-center"
          >
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome</h1>
              <p className="text-sm text-gray-400 mb-4">Start a session or join a room</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {}}
                className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 text-white py-2 px-4 rounded-md transition transform hover:scale-105"
              >
                🚀 Create Room
              </button>
              <button
                onClick={() => {}}
                className="bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 text-white py-2 px-4 rounded-md transition transform hover:scale-105"
              >
                🔑 Join Room
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page
