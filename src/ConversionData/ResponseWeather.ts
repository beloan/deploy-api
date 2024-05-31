interface ResponseWeather {
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
        wind_kph: number;
        pressure_in: number;
        humidity: number;
        feelslike_c: number;
        uv: number;
    };
    forecast: {
        forecastday: [ResponseWeatherItem];
    };
}

interface ResponseWeatherItem {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
        };
    };
    astro: {
        sunrise: string;
        sunset: string;
    };
    hour: [ResponseWeatherHour];
}

interface ResponseWeatherHour {
    time: string;
    temp_c: number;
    condition: {
        text: string;
    };
    wind_kph: number;
    wind_degree: number;
}
