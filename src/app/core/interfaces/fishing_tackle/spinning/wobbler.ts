import { Thing } from '../thing';
import { LengthType } from 'src/app/core/enums/length-type';
/**
 * (Воблер)Wobbler are a popular type of hard-bodied fishing lure
 */
export interface Wobbler extends Thing {
    // длина
    length: number;
    // мера длины
    lengthType: LengthType;
    // заглубление от
    divesFrom: number;
    // заглубление до
    divesTo: number;
    // плавучесть
    floatType: WobblerFloatType;
}

/**
 * Классификация воблеров по плавучести:
 */
export enum WobblerFloatType {
    // приманка быстро тонущая
    FS = 1,
    // это медленно тонущий воблер
    SS = 2,
    // такое изделие тонет очень медленно
    SSS = 3,
    // обычное тонущее изделие
    S = 4,
    // суспендер, может зависать в толще воды
    SU = 5,
    // суспендер, может зависать в толще воды,
    SP = 6,
    // элемент медленно всплывает
    SF = 7,
    // деталь быстро всплывает
    FF = 8,
    // воблер плавающий
    F = 9
}
