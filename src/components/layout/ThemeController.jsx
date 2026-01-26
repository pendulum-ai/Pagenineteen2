import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ThemeController = ({ targetRef }) => {
    // We target the Goal Section (via ref passed from Home)
    
    // Only track if ref is present
    const { scrollYProgress } = useScroll({
        target: targetRef,
        // Widen the trigger zone for a slower, more gradual transition
        // Starts earlier (0.8) and finishes later (0.2)
        offset: ["start 0.8", "start 0.2"] 
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    // Interpolate Global Background Color
    const backgroundColor = useTransform(
        smoothProgress, 
        [0, 1],
        ["#FFFFFF", "#1A1A1A"]
    );

    return (
        <motion.div 
            style={{ 
                backgroundColor,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ThemeController;
