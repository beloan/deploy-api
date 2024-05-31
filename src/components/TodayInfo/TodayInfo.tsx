import './TodayInfo.css';
import { WeatherIcons } from '../../Icons/WeatherIcons.tsx';
// @ts-ignore
import sunriseImg from '../../assets/sunrise.png';
// @ts-ignore
import humidityImg from '../../assets/humidity.png';
// @ts-ignore
import sunsetImg from '../../assets/sunset.png';
// @ts-ignore
import windImg from '../../assets/wind.png';
// @ts-ignore
import pressureImg from '../../assets/pressure.png';
// @ts-ignore
import uvImg from '../../assets/uv.png';
import { conditionsWeather } from '../../Dictionaries.ts';

interface TodayInfoProps {
    weather?: ResponseWeather;
}

export const TodayInfo: React.FC<TodayInfoProps> = ({ weather }) => {
    return (
        <div className={'container_today'}>
            <div className={'container_today__first'}>
                <div className={'today_temperature'}>
                    <div className={'today_temperature__degrees'}>{weather?.current.temp_c
                        ? weather.current.temp_c : '-'}°C
                    </div>

                    <div className={'today_temperature__feels'}>
                        Ощущается как:
                        <div>{weather?.current.feelslike_c ? weather.current.feelslike_c : '-'}°C</div>
                    </div>
                </div>

                <div className={'today_sun'}>
                    <div className={'today_sun__item'}>
                        <img src={sunriseImg} />

                        <div>
                            Восход
                            <div>{weather?.forecast.forecastday[0].astro.sunrise
                                ? weather.forecast.forecastday[0].astro.sunrise : '--:--'}</div>
                        </div>
                    </div>

                    <div className={'today_sun__item'}>
                        <img src={sunsetImg} />
                        <div>
                            Заход
                            <div>{weather?.forecast.forecastday[0].astro.sunset
                                ? weather.forecast.forecastday[0].astro.sunset : '--:--'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'container_today__second'}>
                <WeatherIcons
                    id={weather?.current.condition.text && conditionsWeather.has(weather.current.condition.text)
                        ? conditionsWeather.get(weather.current.condition.text)! : 'sunny'} width={170} />
                {weather?.current.condition.text ? weather.current.condition.text : ' Нет информации'}
            </div>

            <div className={'container_today__third'}>
                <div className={'today_factors'}>
                    <div className={'today_factors__item'}>
                        <img src={humidityImg} className={'today_factors__item'} />
                        <div className={'today_factors__item__first'}>
                            {weather?.current.humidity ? weather.current.humidity : '-'}%
                        </div>
                        <div className={'today_factors__item__second'}>Влажность</div>
                    </div>

                    <div className={'today_factors__item'}>
                        <img src={windImg} className={'today_factors__item'} />
                        <div className={'today_factors__item__first'}>
                            {weather?.current.wind_kph ? weather.current.wind_kph : '-'}км/ч
                        </div>
                        <div className={'today_factors__item__second'}>Скорость ветра</div>
                    </div>
                </div>

                <div className={'today_factors'}>
                    <div className={'today_factors__item'}>
                        <img src={pressureImg} className={'today_factors__item'} />
                        <div className={'today_factors__item__first'}>
                            {weather?.current.pressure_in ? weather.current.pressure_in : '-'}ГПа
                        </div>
                        <div className={'today_factors__item__second'}>Давление</div>
                    </div>

                    <div className={'today_factors__item'}>
                        <img src={uvImg} className={'today_factors__item'} />
                        <div className={'today_factors__item__first'}>
                            {weather?.current.uv ? weather.current.uv : '-'}
                        </div>
                        <div className={'today_factors__item__second'}>UV</div>
                    </div>
                </div>
            </div>
        </div>
    );
};