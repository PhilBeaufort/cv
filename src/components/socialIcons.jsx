import React from 'react';

const SocialIcons = ({ links }) => {
    const icons = [];

    ("email" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/502648/email.svg",
        link: `mailto:${links.email}`,
        hoverColor: "bg-white hover:bg-yellow-500",
        imageClass: "w-10 h-10"
      }) : null;
    ("linkedin" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/447416/linkedin.svg",
        link: links.linkedin,
        hoverColor: "rounded-lg bg-white hover:bg-blue-500",
        imageClass: "w-10 h-10"
    }) : null;
    ("github" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/453942/github.svg",
        link: links.github,
        hoverColor: "rounded-lg bg-white hover:bg-purple-500",
        imageClass: "w-12 h-12"
    }) : null;
    ("pages" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/478199/web-page-material.svg",
        link: links.pages,
        hoverColor: "rounded-lg bg-white hover:bg-gray-400",
        imageClass: "rounded-lg w-9 h-9"
    }) : null;
  
    return (
      <div className="flex space-x-1">
        {icons.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-13 h-13 flex items-center justify-center border-4 bg-gray-800 rounded-lg transition-all duration-300 ${item.hoverColor}`}
          >
            <img src={item.src} alt="icon" className={item.imageClass} />
          </a>
        ))}
      </div>
    );
  };
  
  export default SocialIcons;