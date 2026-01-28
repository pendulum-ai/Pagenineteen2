import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = ({ isVisible }) => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();

    // Determine theme based on route
    const isDarkTheme = location.pathname === '/';
    const theme = isDarkTheme ? 'dark' : 'light';

    return (
        <motion.footer 
            className="site-footer" 
            data-theme={theme}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
                hidden: { 
                    opacity: 0, 
                    y: 30, 
                    filter: "blur(12px)" 
                },
                visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
                }
            }}
        >
            <div className="footer-container">
                <div className="footer-left">
                     <span className="brand-name">Page Nineteen</span>
                     <span className="copyright">© {currentYear}</span>
                </div>

                <div className="footer-right">
                    <div className="link-group">
                        <span className="group-label">Connect</span>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                        <a href="mailto:hello@pagenineteen.ai" className="footer-link">Email</a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
