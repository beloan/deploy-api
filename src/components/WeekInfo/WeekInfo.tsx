import './WeekInfo.css';
import {
    conditionsWeather,
    monthNames,
    weekdayNames,
} from '../../Dictionaries.ts';
import { WeatherIcons } from '../../Icons/WeatherIcons.tsx';

interface WeekInfoProps {
    date: Date;
    weather?: ResponseWeather;
}

export const WeekInfo: React.FC<WeekInfoProps> = ({ date, weather }) => {
    const getDate = (index: number) => {
        const localData = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + index
        );
        return `${weekdayNames[localData.getDay()]}, ${localData.getDate()} ${monthNames[localData.getMonth()]}`;
    };

    const getWeatherIcon = (index: number): string => {
        if (
            weather == undefined ||
            !conditionsWeather.has(
                weather.forecast.forecastday[index].day.condition.text
            )
        ) {
            return 'sunny';
        }

        return conditionsWeather.get(
            weather!.forecast.forecastday[index].day.condition.text
        )!;
    };

    const getWeather = (index: number) => {
        if (weather == undefined) {
            return '-°C/-°C';
        }
        return `${weather!.forecast.forecastday[index].day.mintemp_c}°C/${weather!.forecast.forecastday[index].day.maxtemp_c}°C`;
    };

    return (
        <div className={'container_week'}>
            <div className={'week_label'}>Прогноз на 3 дня:</div>

            <div className={'week_info'}>
                {[0, 1, 2].map((item) => (
                    <div className={'week_info__item'} key={item}>
                        <WeatherIcons id={getWeatherIcon(item)} width={50} />
                        <div className={'week_info__item__degrees'}>
                            {getWeather(item)}
                        </div>
                        <div className={'week_info__item__date'}>
                            {getDate(item)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
