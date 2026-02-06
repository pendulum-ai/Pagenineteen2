import React from 'react';
import './LogoIcon.css';

/**
 * LogoIcon — оранжевый кружок для логотипа
 * 
 * Автоматически масштабируется под высоту текста (1em)
 * Использует системный цвет --color-accent
 * 
 * @param {string} className - Дополнительные CSS-классы
 * @param {object} style - Inline стили для кастомизации
 */
const LogoIcon = ({ className = '', style = {} }) => {
  return (
    <span 
      className={`logo-icon ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon__svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </span>
  );
};

export default LogoIcon;
