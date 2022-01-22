import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { IoSearch } from 'react-icons/io5';
import Weather from './Weather';
import '../css/search.css'
import { useGetAllPostQuery } from '../services/Post';


export default function Search() {
    const [city, setcity] = useState('');
    const [key, setKey] = useState('215854');
    const [value, setValue] = useState('Tel-Aviv')
    const [suggestion, setsuggestion] = useState([])
    const responseInfo = useGetAllPostQuery()
    const cityData = responseInfo.data

    const handleChange = async (e) => {
        setcity(e.target.value)
        if (responseInfo.isSuccess) {
            const newCityData = await cityData.map((names, i) => {
                return names.LocalizedName
            })
            const regex = await new RegExp(`^${e.target.value}`, `i`);
            const suggestion = await newCityData.sort().filter(v => regex.test(v));
            await setsuggestion(suggestion)
        } else {
            handleChange()
        }
    }

    useEffect(() => {
    }, [value, key, responseInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city.length) {
            alert("Please type the city")
        }
        var data = await cityData[cityData.map(function (item, i) {
            return item.LocalizedName;
        }).indexOf(city)];
        const keyData = data.Key
        setKey(keyData)
        setValue(city)
    }
    const suggestionSelected = (value) => {
        setcity(value)
        setsuggestion([])
    }
    const renderSuggestions = () => {
        if (city.length) {
            return (
                <ul>
                    {suggestion.map((item, i) => <li key={i} onClick={() => suggestionSelected(item)}>{item}</li>)}
                </ul>
            )
        }
    }
    if (responseInfo.isError) {
        return(
            <div>
                <h1 style={{color:'red'}}>ERROR !!!! Request Limitation Over</h1>
            </div>
        )
    }else if (responseInfo.isSuccess){
        return (
            <div>
                <Form onSubmit={e => { handleSubmit(e) }} className='autocompletetext'>
                    {<Form.Group controlId="formGridState" className="searchBar w-50 container d-flex position-relative align-items-center">
                        <IoSearch type="submit" value="Submit" onClick={handleSubmit} size={30} className='search' />
                        <Form.Control type="text" list="cityname" name="city" placeholder="Please type the city" style={{ paddingLeft: "50px" }} value={city} onChange={handleChange} autoComplete="off" required />
                    </Form.Group>}
                    {renderSuggestions()}
                </Form>
                <div className='container mt-4 mb-4 border'>
                    {key && <Weather data={key} cityData={value} />}
                </div>
            </div>
        )
    }else{
        return(
            <div>Loading...</div>
        )
    }
    
}
