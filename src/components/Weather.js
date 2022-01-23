import { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useGetCurrentClimateQuery } from '../services/Post';
import DisplayForecast from './DisplayForecast';

function Weather(props) {
    const [favorite, setFavorite] = useState([]);
    const [alert, setAlert] = useState(false);
    const [addAlert, setAddAlert] = useState(false);
    const responseInfo = useGetCurrentClimateQuery(props.data)

    useEffect(() => {
        if (favorite.length) {
            localStorage.setItem('climate', JSON.stringify(favorite));
        }
    }, [favorite])

    if (responseInfo.isSuccess) {
        const currentData = responseInfo.data[0]
        const fav = () => {
            const localData = JSON.parse(localStorage.getItem('climate'));
            if (localData !== null) {
                update()
            } else {
                post()
            }
        }

        const update = () => {
            const data = JSON.parse(localStorage.getItem('climate'));
            const newData = { city: props.cityData, tempC: currentData.Temperature.Metric.Value, tempF: currentData.Temperature.Imperial.Value, icon: currentData.WeatherIcon }
            if (!data.find((item) => item.city === props.cityData)) {
                setFavorite([...data, newData])
                setAddAlert(true)
                setTimeout(() => {
                    setAddAlert(false)
                }, 3000);
            } else {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000);
            }
        }
        const post = () => {
            const data = { city: props.cityData, tempC: currentData.Temperature.Metric.Value, tempF: currentData.Temperature.Imperial.Value, icon: currentData.WeatherIcon }
            if (!favorite.find((item) => item.city === props.cityData)) {
                setFavorite([...favorite, data])
                setAddAlert(true)
                setTimeout(() => {
                    setAddAlert(false)
                }, 3000);
            } else {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000);
            }
        }
        return (
            <div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col">
                            <div className='row'>
                                <div className='col' style={{ marginLeft: '-28px' }}>
                                    <img src={require(`../assets/${currentData.WeatherIcon}.png`)} width={150} />
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <h5 style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                                            {props.cityData}
                                        </h5>
                                    </div>
                                    <div className='row'>
                                        <h6 style={{ textAlign: 'left' }}>
                                            {currentData.Temperature.Metric.Value} C
                                        </h6>
                                        <h6 style={{ textAlign: 'left' }}>
                                            {currentData.Temperature.Imperial.Value} F
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className='row'>
                                <div className='col d-flex align-items-center justify-content-end' style={{ textAlign: 'right' }}>
                                    <Button variant="outline-success" onClick={fav}>Add Favorite</Button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col position-relative">
                                    {alert && <Alert variant='warning' className="position-absolute" style={{ right: 0, top: 5 }}> Already Added !!!</Alert>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col position-relative">
                                    {addAlert && <Alert variant='success' className="position-absolute" style={{ right: 0, top: 5 }}> City Added!!!</Alert>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className='d-flex align-items-center justify-content-center' style={{ height: '20vh', fontSize: '5vw' }}>
                    {currentData.PrecipitationType ? currentData.PrecipitationType : currentData.WeatherText}
                </h4>
                <div className='mt-5 mb-5'>
                    {props.data && <DisplayForecast data={props.data} />}
                </div>
            </div>
        )

    } else if (responseInfo.isError) {
        return (
            <div>
                <h3 style={{ color: 'red' }}>ERROR !!!! Request Limitation Over</h3>
            </div>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default Weather
