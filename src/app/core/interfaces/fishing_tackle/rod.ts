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
    Slow = 1,
    // средне-медленный
    RegularSlow = 2,
    // средний
    Regular = 3,
    // средне-быстрый
    RegularFast = 4,
    // быстрый
    Fast = 5,
    // очень быстрый
    ExtraFast = 6


}

