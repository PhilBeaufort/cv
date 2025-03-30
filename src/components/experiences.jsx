import React from 'react';
import DateRange from './dateRange';

/**
 * "experiences": [
        {
            "entreprise": "École de technologie supérieure (ÉTS)",
            "image": "https://media.licdn.com/dms/image/v2/C4D0BAQH41MxloiQfaA/company-logo_100_100/company-logo_100_100/0/1631342438752?e=1748476800&v=beta&t=acITJUGEJ7OPcSfX-bKGpwgi6e3BeatuxY7TjK1YHOg",
            "location": "Montréal, QC",
            "postes": [
                {
                    "poste": "Analyste informatique",
                    "type": "Indépendant",
                    "date_debut": "01-2025",
                    "date_fin": "Présent",
                    "description": [
                        "S'assurer de l'intégration des nouveaux processus d'affaire à la plateforme Chatbot de l'ÉTS"
                    ]
                },
            ]
        },
    ] 
 */

function Formations({ titre, experiences }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mt-2 text-secondary mb-1">{titre}</h2>
            <div className="space-y-2">
                {experiences.map((e, index) => (
                <div key={index} className="bg-base-200 p-3 rounded-lg shadow-md border border-base-300">
                    <div className="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <img src={e.image} alt={e.entreprise} class="w-12 h-12 rounded-md" />
                            <h3 className="text-lg font-semibold text-primary">{e.entreprise}</h3>
                        </div>
                        <p className="text-sm text-base-content w-1/5 flex items-center">
                            <img
                                src="https://www.svgrepo.com/show/532540/location-pin-alt-1.svg"
                                alt="Location Pin"
                                className="w-5 h-5 mr-1 fill-current" // Adjust size and fill color
                            />
                            {e.location}
                        </p>
                    </div>

                    {e.postes && (
                    <div class="mt-2 space-y-2">

                        {e.postes.map((p, idx) => (
                        <div key={idx} className="border-t-2 border-base-300 pt-4">
                            <div class="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <h4 class="font-bold text-secondary">{p.poste}</h4>
                                    <p class="text-sm">({p.type})</p>
                                </div>
                                <div className='w-1/5'>
                                   <DateRange startDate={p.date_debut} endDate={p.date_fin}/> 
                                </div>
                                
                            </div>

                            {/* Description si existante */}
                            {p.description && (
                            <ul className="list-disc pl-5 mt-1 text-sm text-base-content">
                                {p.description.map((desc, idxx) => (
                                <li key={idxx}>{desc}</li>
                                ))}
                            </ul>)}

                        </div>))}
                    </div>)}
                </div>))}
            </div>
        </div>
    );
}
  
export default Formations;