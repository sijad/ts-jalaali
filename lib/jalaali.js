"use strict";
var Jalaali = (function () {
    function Jalaali(year, month, day) {
        if (year instanceof Date) {
            this.year = year.getFullYear();
            this.month = year.getMonth() + 1;
            this.day = year.getDate();
        }
        else {
            this.year = year;
            this.month = month;
            this.day = day;
        }
    }
    Jalaali.prototype.toJalaali = function () {
        if (!this.jcalced) {
            this.jcalced = this.d2j(this.g2d(this.year, this.month, this.day));
        }
        return this.jcalced;
    };
    Jalaali.prototype.toGregorian = function () {
        if (!this.gcalced) {
            this.gcalced = this.d2g(this.j2d(this.year, this.month, this.day));
        }
        return this.gcalced;
    };
    Jalaali.prototype.isValidJalaaliDate = function () {
        return this.year >= -61 && this.year <= 3177 &&
            this.month >= 1 && this.month <= 12 &&
            this.day >= 1 && this.day <= this.jalaaliMonthLength();
    };
    Jalaali.prototype.isLeapJalaaliYear = function () {
        return this.jalCal(this.year).leap === 0;
    };
    Jalaali.prototype.jalaaliMonthLength = function () {
        if (this.month <= 6) {
            return 31;
        }
        if (this.month <= 11) {
            return 30;
        }
        if (this.isLeapJalaaliYear()) {
            return 30;
        }
        return 29;
    };
    Jalaali.prototype.jalCal = function (jy) {
        var breaks = [
            -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
            1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178,
        ];
        var bl = breaks.length;
        var gy = jy + 621;
        var jp = breaks[0];
        var jump;
        var leapJ = -14;
        if (jy < jp || jy >= breaks[bl - 1]) {
            throw new Error("Invalid Jalaali year " + jy);
        }
        for (var i = 1; i < bl; i += 1) {
            var jm = breaks[i];
            jump = jm - jp;
            if (jy < jm) {
                break;
            }
            leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
            jp = jm;
        }
        var n = jy - jp;
        leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
        if (mod(jump, 33) === 4 && jump - n === 4) {
            leapJ += 1;
        }
        var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
        var march = 20 + leapJ - leapG;
        if (jump - n < 6) {
            n = n - jump + div(jump + 4, 33) * 33;
        }
        var leap = mod(mod(n + 1, 33) - 1, 4);
        if (leap === -1) {
            leap = 4;
        }
        return { leap: leap, gy: gy, march: march };
    };
    Jalaali.prototype.j2d = function (jy, jm, jd) {
        var r = this.jalCal(jy);
        return this.g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
    };
    Jalaali.prototype.d2j = function (jdn) {
        var gy = this.d2g(jdn).gy;
        var jy = gy - 621;
        var r = this.jalCal(jy);
        var jdn1f = this.g2d(gy, 3, r.march);
        var jd;
        var jm;
        var k = jdn - jdn1f;
        if (k >= 0) {
            if (k <= 185) {
                jm = 1 + div(k, 31);
                jd = mod(k, 31) + 1;
                return { jy: jy, jm: jm, jd: jd };
            }
            else {
                k -= 186;
            }
        }
        else {
            jy -= 1;
            k += 179;
            if (r.leap === 1) {
                k += 1;
            }
        }
        jm = 7 + div(k, 30);
        jd = mod(k, 30) + 1;
        return { jy: jy, jm: jm, jd: jd };
    };
    Jalaali.prototype.g2d = function (gy, gm, gd) {
        var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
            + div(153 * mod(gm + 9, 12) + 2, 5)
            + gd - 34840408;
        d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
        return d;
    };
    Jalaali.prototype.d2g = function (jdn) {
        var j = (4 * jdn + 139361631) + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
        var i = div(mod(j, 1461), 4) * 5 + 308;
        var gd = div(mod(i, 153), 5) + 1;
        var gm = mod(div(i, 153), 12) + 1;
        var gy = div(j, 1461) - 100100 + div(8 - gm, 6);
        return { gy: gy, gm: gm, gd: gd };
    };
    return Jalaali;
}());
exports.Jalaali = Jalaali;
;
function round(x) {
    if (x < 0) {
        return Math.ceil(x);
    }
    else {
        return Math.floor(x);
    }
}
function div(a, b) {
    return round(a / b);
}
function mod(a, b) {
    return a - round(a / b) * b;
}
