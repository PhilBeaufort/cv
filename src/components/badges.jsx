import React from 'react';

function Badges({ titre, items }) {
    return (
        <div>
            <h2 class="text-xl font-semibold mt-3 text-secondary mb-1">{titre}</h2>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span key={index} className="badge badge-accent">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
  
export default Badges;