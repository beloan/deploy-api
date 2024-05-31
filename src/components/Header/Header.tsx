import './Header.css';
import { ChangeEvent, FC, useState } from 'react';
const defaultInput = '';

interface HeaderProps {
    changeCity: (name: string, latitude: number, longitude: number) => void;
}

export const Header: FC<HeaderProps> = ({ changeCity }) => {
    const [input, setInput] = useState(defaultInput);
    const [searchResult, setSearchResult] = useState<ResponseCity>();

    const onClickButton = async (): Promise<void> => {
        return fetch(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=10&sort=name`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':
                        'fcc1d1d0b0mshfe809544f193715p14e89cjsnc80d69fcc87d',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                setSearchResult(response as ResponseCity);
            })
            .catch((error) => console.log(error));
    };

    const onClickElement = (item: ResponseCityItem) => {
        changeCity(item.name, item.latitude, item.longitude);
        setInput(defaultInput);
        setSearchResult(undefined);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target;
        setInput(value.value);
    };

    return (
        <div className={'container_header'}>
            <div className={'label'}>Weather</div>

            <label className={'header_input'}>
                <input
                    className={'header_input'}
                    placeholder={'Выберете свой город (на английском языке)'}
                    onChange={onChange}
                    value={input}
                />

                <button className={'header_input'} onClick={onClickButton}>
                    Найти
                </button>
            </label>

            <div className={'cities'}>
                {searchResult?.data.map((item) => (
                    <div
                        key={item.id}
                        className={'city_item'}
                        onClick={() => onClickElement(item)}
                    >
                        {item.name}, {item.country}
                    </div>
                ))}
            </div>
        </div>
    );
};
