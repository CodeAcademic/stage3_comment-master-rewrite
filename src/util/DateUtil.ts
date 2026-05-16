class DateUtil {

    static today(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)}`
    }

    private static formatNumber(n: number) {
        return n < 10 ? `0${n}` : n;
    }
}

export default DateUtil;