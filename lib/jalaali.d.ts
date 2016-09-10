export declare class Jalaali {
    private year;
    private month;
    private day;
    private jcalced;
    private gcalced;
    constructor(year: number | Date, month?: number, day?: number);
    toJalaali(): {
        jy: number;
        jm: number;
        jd: number;
    };
    toGregorian(): {
        gy: number;
        gm: number;
        gd: number;
    };
    isValidJalaaliDate(): boolean;
    isLeapJalaaliYear(): boolean;
    jalaaliMonthLength(): number;
    private jalCal(jy);
    private j2d(jy, jm, jd);
    private d2j(jdn);
    private g2d(gy, gm, gd);
    private d2g(jdn);
}
