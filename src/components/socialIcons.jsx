import React from 'react';

const SocialIcons = ({ links }) => {
    console.log(links);
    const icons = [];

    ("email" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/502648/email.svg",
        link: `mailto:${links.email}`,
        hoverColor: "bg-white hover:bg-yellow-500"
      }) : null;
    ("linkedin" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/447416/linkedin.svg",
        link: links.linkedin,
        hoverColor: "rounded-lg bg-white hover:bg-blue-500"
    }) : null;
    ("github" in links) ? icons.push({
        src: "https://www.svgrepo.com/show/353781/github.svg",
        link: links.github,
        hoverColor: "rounded-lg bg-white hover:bg-purple-500"
    }) : null;
    
    console.log(icons);
  
    return (
      <div className="flex space-x-2">
        {icons.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-15 h-15 flex items-center justify-center border-4 bg-gray-800 rounded-lg transition-all duration-300 ${item.hoverColor}`}
          >
            <img src={item.src} alt="icon" className="w-12 h-12" />
          </a>
        ))}
      </div>
    );
  };
  
  export default SocialIcons;