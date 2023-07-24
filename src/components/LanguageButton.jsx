import { changeLanguage } from "i18next"
import {useState} from 'preact/hooks'
const LanguageButton = () => {
    const [language, setLanguage] = useState('de')
  return (
    <div>
        <button onClick={()=>{
            if(language=='en'){
                setLanguage('de')
                changeLanguage('en')
            }else{
                setLanguage('en')
                changeLanguage('de')
            }
        }}>
            {language.toUpperCase()}
        </button>

    </div>
  )
}

export default LanguageButton