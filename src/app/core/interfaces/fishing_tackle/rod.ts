import { Thing } from './thing';

/**
 * Удилище
 */
export interface Rod extends Thing {
    // кол секций
    sections: number;
    // Тест по приманке (г)
    testOfBaitG: number;
    // Тест по леске (lb)
    testOfFishingLineLb: number;
    // строй
    formationType: RodFormationType;
    // вид рыбалки
    applicationType: RodApplicationType;
}
/**
 * Строй удилища
 */
export enum RodFormationType {
    // медленный
    slow,
    // средне-медленный
    regularSlow,
    // средний
    regular,
    // средне-быстрый
    regularFast,
    // быстрый
    fast,
    // очень быстрый
    extraFast


}

/**
 * Применение. Вид рыбалки
 */
export enum RodApplicationType {
    spining
}
