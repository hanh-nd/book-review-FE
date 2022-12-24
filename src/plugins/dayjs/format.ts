import type { PluginFunc } from 'dayjs';
import type dayjs from 'dayjs';

declare module 'dayjs' {
    interface Dayjs {
        fmDDMMYYYY(separator?: string): string;
        fmHHmmssDDMMYYYY(separator?: string): string;
        fmHHmmDDMMYYYY(separator?: string): string;
        fmMMDDJp(separator?: string): string;
        fmHHmm(separator?: string): string;
        fmHHmmss(separator?: string): string;
    }
}

export const displayPlugin: PluginFunc = (
    option,
    dayjsClass,
    dayjsFactory: typeof dayjs
) => {
    dayjsClass.prototype.fmDDMMYYYY = function (separator = '/') {
        return this.format(`DD${separator}MM${separator}YYYY`);
    };

    dayjsClass.prototype.fmHHmmssDDMMYYYY = function (separator = '/') {
        return this.format(`HH:mm:ss DD${separator}MM${separator}YYYY`);
    };

    dayjsClass.prototype.fmHHmmDDMMYYYY = function (separator = '/') {
        return this.format(`HH:mm DD${separator}MM${separator}YYYY`);
    };

    dayjsClass.prototype.fmHHmm = function (separator = ':') {
        return this.format(`HH${separator}mm`);
    };
    dayjsClass.prototype.fmHHmmss = function (separator = ':') {
        return this.format(`HH${separator}mm${separator}ss`);
    };
};
