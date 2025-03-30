import React from 'react';
import DateRange from './dateRange';

/**
 * "formations": [
        {
            "ecole": "",
            "location": "",
            "items":[
                {
                    "info": "",
                    "date_debut": "",
                    "date_fin": "décembre 2024"
                },
                {
                    "info": "Certificat en génie logiciel",
                    "date_debut": "",
                    "date_fin": "2020"
                }
            ]
        }
    ]
 */

function Formations({ titre, formations }) {
    return (
        <div className='break-inside-avoid'>
            <h2 className="text-xl font-semibold mt-6 text-secondary mb-1 break-words">{titre}</h2>
            <div className="space-y-2">
            {formations.map((f, index) => (
                <div key={index} className="bg-base-200 p-2 rounded-lg shadow-md border border-base-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-primary">{f.ecole}</h3>
                        <p className="text-sm text-base-content w-1/5 flex items-center">
                            <img
                                src="https://www.svgrepo.com/show/532540/location-pin-alt-1.svg"
                                alt="Location Pin"
                                className="w-5 h-5 mr-1 fill-current" // Adjust size and fill color
                            />
                            {f.location}
                        </p>
                    </div>

                    {f.items && (
                    <div className="mt-4 space-y-4">
                        {f.items.map((item, idx) => (

                        <div key={idx} className="border-t-2 border-base-300 pt-1">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-secondary">{item.info}</h4>
                                <div className='w-1/5'>
                                   <DateRange startDate={item.date_debut} endDate={item.date_fin}/> 
                                </div>
                            </div>

                            {/* Description si existante */}
                            {item.description && (
                            <ul className="list-disc pl-5 mt-2 text-sm text-base-content">
                                {item.description.map((desc, idxx) => (
                                <li key={idxx}>{desc}</li>
                                ))}
                            </ul>)}
                        </div>

                        ))}
                    </div>)}
                </div> 
            ))}
            </div>
        </div>
    );
}
  
export default Formations;