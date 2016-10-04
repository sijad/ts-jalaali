export declare class Jalaali {
    static toJalaali(date: Date): Ijdate;
    static toJalaali(year: number, month: number, day: number): Ijdate;
    static toGregorian(date: Date): Igdate;
    static toGregorian(year: number, month: number, day: number): Igdate;
    static isValidJalaaliDate(year: number, month: number, day: number): Boolean;
    static isLeapJalaaliYear(year: number): Boolean;
    static jalaaliMonthLength(year: number, month: number, day: number): number;
    private static jalCal(jy);
    private static j2d(jy, jm, jd);
    private static d2j(jdn);
    private static g2d(gy, gm, gd);
    private static d2g(jdn);
    private year;
    private month;
    private day;
    private jcalced;
    private gcalced;
    constructor(year: Date);
    constructor(year: number, month: number, day: number);
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
    isValidJalaaliDate(): Boolean;
    isLeapJalaaliYear(): Boolean;
    jalaaliMonthLength(): number;
}
export interface Ijdate {
    jy: number;
    jm: number;
    jd: number;
}
export interface Igdate {
    gy: number;
    gm: number;
    gd: number;
}
