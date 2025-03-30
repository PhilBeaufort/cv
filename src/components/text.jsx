import React from 'react';

function Text({ titre, items }) {
    return (
        <div className='break-inside-avoid'>
            <h2 className="text-xl font-semibold mt-6 text-secondary mb-1">{titre}</h2>
            {items.map((text, index) => (
                <p key={index} className="text-sm mb-1">{text}</p>
            ))}
        </div>
    );
}
  
export default Text;