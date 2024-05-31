interface ResponseCity {
    data: [ResponseCityItem];
    links: [ResponseCityLink];
    metadata: {
        currentOffset: number;
        totalCount: number;
    };
}

interface ResponseCityItem {
    id: bigint;
    wikiDataId: string;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    regionWdId: string;
    latitude: number;
    longitude: number;
    population: bigint;
}

interface ResponseCityLink {
    rel: string;
    href: string;
}
