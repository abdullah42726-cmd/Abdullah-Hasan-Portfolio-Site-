
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// --- SVG LOGO PLACEHOLDERS ---
// You can replace the content of these components with your actual SVG code.
// I've created simple placeholders with the company name.

const GoogleLogo = () => (
  // PASTE GOOGLE SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Google Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Google</text>
  </svg>
  // END GOOGLE SVG CODE
);

const AmazonLogo = () => (
  // PASTE AMAZON SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Amazon Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Amazon</text>
  </svg>
  // END AMAZON SVG CODE
);

const SpotifyLogo = () => (
  // PASTE SPOTIFY SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Spotify Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Spotify</text>
  </svg>
  // END SPOTIFY SVG CODE
);

const ShopifyLogo = () => (
  // PASTE SHOPIFY SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Shopify Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Shopify</text>
  </svg>
  // END SHOPIFY SVG CODE
);

const NetflixLogo = () => (
  // PASTE NETFLIX SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Netflix Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Netflix</text>
  </svg>
  // END NETFLIX SVG CODE
);

const AirtableLogo = () => (
  // PASTE AIRTABLE SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Airtable Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Airtable</text>
  </svg>
  // END AIRTABLE SVG CODE
);

const NotionLogo = () => (
  // PASTE NOTION SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Notion Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Notion</text>
  </svg>
  // END NOTION SVG CODE
);

const FigmaLogo = () => (
  // PASTE SVG CODE HERE
  <svg width="100" height="34" viewBox="0 0 100 34" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Figma Logo Placeholder">
    <rect x="0.5" y="0.5" width="99" height="33" rx="3.5" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.5"/>
    <text x="50" y="21" fontFamily="Inter, sans-serif" fontSize="12" fill="currentColor" textAnchor="middle">Figma</text>
  </svg>
  // END SVG CODE
);
// --- END SVG LOGO PLACEHOLDERS ---


const Logo: React.FC<{ name: string; component: React.ReactNode }> = ({ name, component }) => (
    <div title={name} className="flex justify-center items-center p-4 text-gray-400 dark:text-gray-500 grayscale hover:grayscale-0 dark:hover:grayscale-0 hover:scale-110 transition-all duration-300 cursor-pointer">
        {component}
    </div>
);

const LogoCloud: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation();
    const logos = [
        { name: 'Google', component: <GoogleLogo /> },
        { name: 'Amazon', component: <AmazonLogo /> },
        { name: 'Spotify', component: <SpotifyLogo /> },
        { name: 'Shopify', component: <ShopifyLogo /> },
        { name: 'Netflix', component: <NetflixLogo /> },
        { name: 'Airtable', component: <AirtableLogo /> },
        { name: 'Notion', component: <NotionLogo /> },
        { name: 'Figma', component: <FigmaLogo /> }
    ];

    return (
        <section ref={ref} className="py-20 text-center">
            <h2 className={`text-xl font-semibold text-gray-600 dark:text-gray-300 mb-8 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>Trusted by The Best</h2>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
                {logos.map(logo => <Logo key={logo.name} name={logo.name} component={logo.component} />)}
            </div>
        </section>
    );
};

export default LogoCloud;