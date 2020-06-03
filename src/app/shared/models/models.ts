export interface CurrentUser {
    id: string;
    name: string;
}
export interface News {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface Weather {
    coord: {
        lon: number,
        lat: number
    },
    weather:
    {
        id: number
        main: string,
        description: string,
        icon: string
    }
    ,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    wind: {
        speed: number,
        deg: number
    },
    dt: any,
    sys: {
        country: string,
        sunrise: any,
        sunset: any
    },
    timezone: number,
    name: string,
}