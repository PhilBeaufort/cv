import email from '/email.svg'
import linkedin from '/linkedin.svg'
import data from "./data.json";
import Text from './components/text';
import Badges from './components/badges';
import Formations from './components/formations';
import Experiences from './components/experiences';
import SocialIcons from './components/socialIcons';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="max-w-5xl mx-auto bg-base-100 p-3 rounded-lg shadow-lg print:bg-transparent print:shadow-none">
        {/* Header */}
        <div className="break-inside-avoid flex justify-between items-center mb-2">
          {/* Left side (Name, Address, Title)*/}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-primary">{data.nom}</h1>
            <h3 className="text-x font-bold text-secondary">{data.titre}</h3>
            <p className="text-sm">{data.adresse}</p>
          </div>

          {/* Right side (Email, LinkedIn, Phone, Languages) */}
          <div className="text-right mb-2">
            <div className="mb-2">
              <SocialIcons links={data.links}/>
            </div>

            {data.tel != "" && (
            <p>📞 <span className="important-info">{data.tel}</span></p>)}
            <p className="text-sm">{data.languages.join(", ")}</p>
          </div>
        </div>

        {/* Présentation */}
        <Text titre="À propos" items={data.presentation} />

        {/* Formations */}
        <Formations titre="Formations" formations={data.formations} />

        {/* Language */}
        <Badges titre="Languages de développement" items={data.language_code} />
        
        {/* Compétences */}
        <Badges titre="Compétences" items={data.competences} />

        {/* Expériences */}
        <Experiences titre="Expériences" experiences={data.experiences} />

        {/* Autres expériences */}
      </div>
    </>
  )
}

export default App
