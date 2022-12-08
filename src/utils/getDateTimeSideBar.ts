export default function getDateTimeSideBar(str: string): string {
    const valueMs = Date.parse(str);
    if (isNaN(valueMs)) {
        return "";
    }
    const dateTime = new Date(valueMs);
    const today = new Date();
    let resStr: string;
    if (today.getFullYear() !== dateTime.getFullYear()) {
        resStr = dateTime.toLocaleDateString();
    } else {
        if (today.getMonth() !== dateTime.getMonth()) {
            resStr = dateTime.toLocaleDateString();
        } else {
            if (today.getDate() !== dateTime.getDate()) {
                resStr = getWeekDay(dateTime);
            } else {
                resStr = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
            }

        }
    }
    return resStr;
}

function getWeekDay(date: Date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    return days[date.getDay()];
}
