import { Service } from '../types';

export const services: Service[] = [
    { 
      title: "Graphic Design", 
      details: ["Logo & Branding Identity", "Social Media Graphics", "Print & Marketing Materials", "Web & Ad Banners"],
      longDescription: "Graphic Design is the art of visual communication. I create compelling designs that effectively convey your brand's message, from memorable logos and cohesive branding packages to engaging social media content and professional print materials. My goal is to craft visuals that not only look great but also resonate with your target audience and achieve your business objectives.",
      imageUrl: "https://i.imgur.com/8L3A39c.jpg",
      pricing: {
        planName: "Basic Package",
        price: "Starting at $250",
        features: ["Initial Concept & Revisions", "High-Resolution Files", "Full Ownership", "Style Guide"]
      }
    },
    { 
      title: "Video Editing", 
      details: ["Short Form (Reels, TikTok, Shorts)", "Long Form Content (YouTube)", "Documentaries & Infomercials", "Corporate & Event Videos"],
      longDescription: "Through professional video editing, I transform raw footage into captivating stories. Whether it's fast-paced short-form content for social media or in-depth long-form videos, I focus on narrative structure, pacing, color grading, and sound design to create a polished final product that engages viewers and holds their attention from start to finish.",
      imageUrl: "https://i.imgur.com/sN20T7D.jpg",
      pricing: {
        planName: "Per Project",
        price: "Starting at $300",
        features: ["Up to 10-min final video", "Color Grading & Sound Design", "Royalty-Free Music", "2 Revision Rounds"]
      }
    },
    { 
      title: "UI/UX Design", 
      details: ["Mobile App Interfaces (iOS & Android)", "Website & Web App Design", "Software UI/UX Enhancement", "Interactive Prototypes"],
      longDescription: "I specialize in creating user-centric UI/UX designs that are both intuitive and visually appealing. My process involves in-depth user research, wireframing, and creating high-fidelity interactive prototypes. I aim to design digital experiences that are seamless, accessible, and enjoyable for the end-user, ultimately leading to higher engagement and conversion rates.",
      imageUrl: "https://i.imgur.com/Fz8J4zF.jpg",
      pricing: {
        planName: "Per Screen",
        price: "Starting at $150",
        features: ["User Flow & Wireframing", "High-Fidelity Mockups", "Interactive Prototype", "Design System Components"]
      }
    },
    { 
      title: "Social Media Ad Design Package", 
      details: ["Static & Video Ad Creatives", "A/B Testing Variations", "Full Campaign Asset Packages", "Platform-Specific Optimization"],
      longDescription: "This comprehensive package provides everything you need for a successful social media advertising campaign. I design a variety of high-impact ad creatives, including static images and videos, tailored to specific platforms. I also provide variations for A/B testing to help you optimize performance and maximize your return on ad spend.",
      imageUrl: "https://i.imgur.com/wVqjX7Q.jpg",
      pricing: {
        planName: "Monthly Retainer",
        price: "Starting at $500/mo",
        features: ["10 Ad Creatives (Static/Video)", "A/B Test Variations", "Ad Copy Suggestions", "Monthly Performance Review"]
      }
    },
    { 
      title: "Packaging Design", 
      details: ["Product Packaging Concepts", "Label & Box Design", "3D Mockup Creation", "Print-Ready Files"],
      longDescription: "Packaging is the first physical interaction a customer has with your product. I design packaging that not only protects your product but also tells your brand's story and stands out on the shelf. From initial concepts and 3D mockups to final print-ready files, I ensure your packaging is attractive, functional, and production-friendly.",
      imageUrl: "https://i.imgur.com/Y3A2CqG.jpg",
      pricing: {
        planName: "Per Product",
        price: "Starting at $400",
        features: ["2 Initial Concepts", "3D Mockup Visualization", "Dieline & Print-Ready Files", "Sourcing Support"]
      }
    },
    {
      title: "Web Design & Development",
      details: ["Custom WordPress Development", "Figma to Live Website Conversion", "E-commerce & Store Setup", "Responsive Web Design"],
      longDescription: "I bring designs to life by developing fully functional and responsive websites, primarily using WordPress. My service bridges the gap between design and development, converting Figma mockups into pixel-perfect, user-friendly websites. Whether you need a simple portfolio or a complete e-commerce solution, I build sites that are robust, easy to manage, and optimized for all devices.",
      imageUrl: "https://i.imgur.com/nJSAErh.jpg",
      pricing: {
        planName: "Full Site",
        price: "Starting at $1500",
        features: ["Up to 5 Pages", "Custom WordPress Theme", "Mobile Responsive Design", "Basic SEO Setup"]
      }
    }
  ];