import './HourlyInfo.css';
import { WeatherIcons } from '../../Icons/WeatherIcons.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import navigationImg from './../../assets/navigation.png';
import { conditionsWeather } from '../../Dictionaries.ts';

interface HourlyInfoProps {
    weather?: ResponseWeather;
}

export const HourlyInfo: React.FC<HourlyInfoProps> = ({ weather }) => {
    return (
        <div className={'container_hourly'}>
            <div className={'hourly_label'}>Почасовой прогноз:</div>

            <div className={'hourly_info'}>
                {[0, 4, 8, 12, 16, 20].map((item) => (
                    <div className={'hourly_info__item'} key={item}>
                        <div className={'hourly_info__item__hours'}>
                            {item}:00
                        </div>
                        <WeatherIcons
                            id={
                                weather?.forecast.forecastday[0].hour[item]
                                    .condition.text &&
                                conditionsWeather.has(
                                    weather.forecast.forecastday[0].hour[item]
                                        .condition.text
                                )
                                    ? conditionsWeather.get(
                                          weather.forecast.forecastday[0].hour[
                                              item
                                          ].condition.text
                                      )!
                                    : 'sunny'
                            }
                            width={50}
                        />
                        <div className={'hourly_info__item__degrees'}>
                            {weather?.forecast.forecastday[0].hour[item].temp_c
                                ? weather?.forecast.forecastday[0].hour[item]
                                      .temp_c
                                : '-'}
                            °C
                        </div>
                        <img
                            src={navigationImg}
                            style={{
                                width: '35px',
                                rotate: `${
                                    weather?.forecast.forecastday[0].hour[item]
                                        .wind_degree
                                        ? weather.forecast.forecastday[0].hour[
                                              item
                                          ].wind_degree
                                        : 0
                                }deg`,
                            }}
                        />
                        <div className={'hourly_info__item__wind_speed'}>
                            {weather?.forecast.forecastday[0].hour[item]
                                .wind_kph
                                ? weather.forecast.forecastday[0].hour[item]
                                      .wind_kph
                                : '-'}
                            км/ч
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
