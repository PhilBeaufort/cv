import React from 'react';

function Text({ titre, items }) {
    return (
        <div>
            <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">{titre}</h2>
            {items.map((text, index) => (
                <p key={index} className="text-sm">{text}</p>
            ))}
        </div>
    );
}
  
export default Text;