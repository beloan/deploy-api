import './DateInfo.css';

interface DateInfoProps {
    city: string;
    time: string;
    weekDay: string;
    date: string;
}

export const DateInfo: React.FC<DateInfoProps> = ({
    city,
    time,
    weekDay,
    date,
}) => {
    return (
        <div className={'container_date'}>
            <div className={'today_label__first'}>{city}</div>
            <div className={'today_label__second'}>{time}</div>
            <div className={'today_label__third'}>{`${weekDay}, ${date}`}</div>
        </div>
    );
};
