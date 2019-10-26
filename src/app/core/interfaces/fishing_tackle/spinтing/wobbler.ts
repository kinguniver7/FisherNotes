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
    FS,
    // это медленно тонущий воблер
    SS,
    // такое изделие тонет очень медленно
    SSS,
    // обычное тонущее изделие
    S,
    // суспендер, может зависать в толще воды
    SU,
    // суспендер, может зависать в толще воды,
    SP,
    // элемент медленно всплывает
    SF,
    // деталь быстро всплывает
    FF,
    // воблер плавающий
    F
}
