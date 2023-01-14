import React from 'react'
import { motion } from 'framer-motion'

const LazyLoading = () => {
  return (
    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <motion.div style={{height: "100px", width: "100px", borderRadius: "10px"}} animate = {{rotate: "180deg", backgroundColor: ["#439a97", "#EB455F"], transition: {
            repeat: Infinity,
            duration: 0.5
        }}}>

        </motion.div>
    </div>
  )
}

export default LazyLoading