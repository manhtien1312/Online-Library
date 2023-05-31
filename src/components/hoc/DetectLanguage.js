import { useState } from 'react';


function DetectLanguage() {

    let DetectLanguage = require('detectlanguage');

    let detectlanguage = new DetectLanguage('d2fbd73c274e68314b91ac3943584a62');

    const [text, setText] = useState('')

    const handleClick = () => {
        detectlanguage.detectCode(text).then(function(result) {
            alert(JSON.stringify(result));
        });
    }

    return ( 
        <div>
            <input type="text" onChange={e => setText(e.target.value)}/>
            <button type="submit" onClick={handleClick}>Detect Language</button>
        </div>
    );
}

export default DetectLanguage;