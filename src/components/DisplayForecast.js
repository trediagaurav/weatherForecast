import React from 'react';
import { Card } from 'react-bootstrap';
import { useGetforecastClimateQuery } from '../services/Post';
import '../css/forecast.css';
import moment from 'moment';

export default function DisplayForecast(props) {
    const responseInfo = useGetforecastClimateQuery(props.data)

    if (responseInfo.isSuccess) {
        const forecastData = responseInfo.data.DailyForecasts
        return (
            <div>
                <div className='d-flex justify-content-center' style={{ flexWrap: "wrap" }}>{
                    forecastData.map((item, i) => {
                        return (
                            <Card style={{ width: '12rem', height: '15em', margin: '5px' }} key={i}>
                                <Card.Body className='card'>
                                    <Card.Title className='title'>{moment(item.Date).format('dddd')}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Max: {item.Temperature.Maximum.Value}{item.Temperature.Maximum.Unit}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Min: {item.Temperature.Minimum.Value}{item.Temperature.Minimum.Unit}</Card.Subtitle>
                                    <Card.Text className='condition'>
                                        {item.Day.HasPrecipitation === true ? item.Day.IconPhrase : item.Night.IconPhrase}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.Day.HasPrecipitation === true ? <img src={require(`../assets/${item.Day.Icon}.png`)} width={100} /> : <img src={require(`../assets/${item.Night.Icon}.png`)} width={100} />}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
                </div>

            </div>
        )

    } else if (responseInfo.isError) {
        return (
            <div>
                <h3 style={{ color: 'red' }}>ERROR !!!! Request Limitation Over</h3>
            </div>
        )
    }
    else {
        return (
            <div>
                Loading....
            </div>
        )
    }
}
