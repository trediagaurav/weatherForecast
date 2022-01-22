import { useState } from 'react';
import '../css/theme.css'
export default function Theme() {
    const [checked, setChecked] = useState(true);

    const handleChange=()=>{
        setChecked (!checked)
        localStorage.setItem('theme', checked)
    }

    return (
        <div>
            <label className="switch" style={{marginRight:"50px"}}>
                <input type="checkbox" value={checked} onChange={handleChange} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}
