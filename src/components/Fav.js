import { useEffect, useState } from 'react'
import '../css/forecast.css';
import { Card, Button } from 'react-bootstrap';

export default function Fav() {
    const [newFavorite, setNewFavorite] = useState([]);
    const data = JSON.parse(localStorage.getItem('climate'));


    useEffect(() => {
    }, [data, newFavorite])

    const del = (item) => {
        const localData = JSON.parse(localStorage.getItem('climate'));
        const newData = localData.filter(function (obj) {
            return obj.city !== item
        })
        localStorage.setItem('climate', JSON.stringify(newData));
        setNewFavorite([...newFavorite, newData])

    }
    if (data.length) {
        return (
            <div className='p-5 fav'>
                <div className='d-flex justify-content-left' style={{ flexWrap: "wrap" }}>{
                    data.map((item, i) => {
                        return (
                            <Card style={{ width: '12rem', height: '15em', margin: '10px', textAlign: "center" }} key={i}>
                                <Card.Body className='card'>
                                    <Card.Title className='title'>{item.city}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.tempC} C</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{item.tempF} F</Card.Subtitle>
                                    <Card.Text>
                                        <img src={require(`../assets/${item.icon}.png`)} width={100} />
                                    </Card.Text>
                                    <Button variant="outline-danger" onClick={() => del(item.city)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>No Favorite's yet !!!!</h1>
            </div>
        )
    }

}
