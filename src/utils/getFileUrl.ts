export const getFileUrl = (url: string | null) => {
    if (url) {
        return `https://ya-praktikum.tech/api/v2/resources${url}`;
    } else {
        return 'https://img.icons8.com/ios/100/null/user-male-circle.png';
    }
}