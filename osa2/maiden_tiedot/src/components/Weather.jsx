import axios from "axios"
import { useState } from "react"
import { useEffect } from 'react'

const Weather = ({ capital }) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data)
                // console.log(response.data)
                // console.log(weather.main.temp)
            })
    }, [])

    if (weather.main != null)
        return (
            <div>
                <h1>Weather in {capital}</h1>
                <p>
                    temperature {weather.main.temp} Celsius
                </p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>
                    wind {weather.wind.speed} m/s
                </p>
            </div>
        )
}

export default Weather