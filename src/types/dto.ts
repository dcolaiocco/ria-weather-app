export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface DailyForecast {
    dt: number;
    temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
    };
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain: {
        '1h': number;
    };
}

export interface HourlyForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain: {
        '1h': number;
    };
}

export interface City {
    city_id: number;
    city_name: string;
    state_code: string;
    country_code: string;
    country_full: string;
    lat: number;
    lon: number;
}
