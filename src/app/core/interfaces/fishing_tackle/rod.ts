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
}
/**
 * Строй удилища
 */
export enum RodFormationType {
    // медленный
    Slow,
    // средне-медленный
    RegularSlow,
    // средний
    Regular,
    // средне-быстрый
    RegularFast,
    // быстрый
    Fast,
    // очень быстрый
    ExtraFast


}

