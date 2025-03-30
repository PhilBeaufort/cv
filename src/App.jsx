//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import linkedin from '/linkedin.svg'
import data from "./data.json";
import Text from './components/text';
import Badges from './components/badges';
import Formations from './components/formations';
import Experiences from './components/experiences';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div class="max-w-4xl mx-auto bg-base-100 p-3 rounded-lg shadow-lg print:bg-transparent print:shadow-none">
        {/* Header */}
        <div class="flex justify-between items-center mb-2">
          {/* Left side (Name, Address, Title)*/}
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-primary">{data.nom}</h1>
            <h3 class="text-x font-bold text-secondary">{data.titre}</h3>
            <p class="text-sm">{data.adresse}</p>
          </div>

          {/* Right side (Email, LinkedIn, Phone, Languages) */}
          <div class="text-right">
            <p class="text-sm">{data.email}</p>
            <div class="flex justify-end"> 
              <a href={data.linkedin} role="button">
                <span class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-black">
                  <img class="w-12 h-12" src={linkedin} alt="LinkedIn Logo" />
                </span>
            </a>
            </div>
            

            <div class="flex justify-end"> 
              <button class="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475661/linkedin-color.svg" loading="lazy" alt="google logo"/>
                    <a href={data.linkedin} class="text-secondary">Linkedin</a>
              </button>
            </div>
            <p class="text-sm">{data.tel}</p>
            <p class="text-sm">{data.languages.join(", ")}</p>
          </div>
        </div>

        {/* Présentation */}
        <Text titre="À propos" items={data.presentation} />

        {/* Formations */}
        <Formations titre="Formations" formations={data.formations} />
        
        {/* Compétences */}
        <Badges titre="Compétences" items={data.competences} />

        {/* Language */}
        <Badges titre="Languages code" items={data.language_code} />

        {/* Expériences */}
        <Experiences titre="Expériences" experiences={data.experiences} />

        {/* Autres expériences */}
      </div>
    </>
  )
}

export default App
