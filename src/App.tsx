import './App.css';
import { Header } from './components/Header/Header.tsx';
import { DateInfo } from './components/DateInfo/DateInfo.tsx';
import { TodayInfo } from './components/TodayInfo/TodayInfo.tsx';
import { WeekInfo } from './components/WeekInfo/WeekInfo.tsx';
import { HourlyInfo } from './components/HourlyInfo/HourlyInfo.tsx';
import { useEffect, useState } from 'react';
import { monthNames, weekdayNames } from './Dictionaries.ts';

const City = {
    name: 'Kazan',
    latitude: 55.78874,
    longitude: 49.12214,
};

function App() {
    const [selectedCity, setSelectedCity] = useState(City);
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);
    const [weather, setWeather] = useState<ResponseWeather>();

    const getHourlyWeather = async (): Promise<void> => {
        return fetch(
            `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${selectedCity.latitude},${selectedCity.longitude}&days=3`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':
                        'fcc1d1d0b0mshfe809544f193715p14e89cjsnc80d69fcc87d',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setWeather(response as ResponseWeather);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            getHourlyWeather();
        }
        return () => {
            ignore = true;
        };
    }, []);

    const changeCity = (name: string, latitude: number, longitude: number) => {
        setSelectedCity({
            name: name,
            latitude: latitude,
            longitude: longitude,
        });
        getHourlyWeather();
    };

    return (
        <div className="container_app">
            <Header changeCity={changeCity} />
            <div className={'container_app__first'}>
                <DateInfo
                    city={selectedCity.name}
                    date={`${dateState.getDate()} ${monthNames[dateState.getMonth()]}`}
                    weekDay={weekdayNames[dateState.getDay()]}
                    time={`${dateState.getHours()}:${
                        dateState.getMinutes().toString().length === 1
                            ? '0' + dateState.getMinutes()
                            : dateState.getMinutes()
                    }`}
                />
                <TodayInfo weather={weather} />
            </div>
            <div className={'container_app__first'}>
                <WeekInfo date={dateState} weather={weather} />
                <HourlyInfo weather={weather} />
            </div>
        </div>
    );
}

export default App;
