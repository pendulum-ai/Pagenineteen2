import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

import { THEME_CONFIG } from '../../config/themeConfig';

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
        [THEME_CONFIG.light.background, THEME_CONFIG.dark.background]
    );

    // Interpolate Header Text Color (Black -> White)
    const textColor = useTransform(
        smoothProgress,
        [0, 0.5], // Start changing earlier to ensure contrast
        [THEME_CONFIG.light.text, THEME_CONFIG.dark.text]
    );

    // Update CSS variable for Header
    React.useEffect(() => {
        // Set default on mount
        document.documentElement.style.setProperty('--header-text-color', '#000000');
        return () => {
            // Reset on unmount
            document.documentElement.style.setProperty('--header-text-color', '#000000');
        };
    }, []);

    useMotionValueEvent(textColor, "change", (latest) => {
        document.documentElement.style.setProperty('--header-text-color', latest);
    });

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
