import { Thing } from './thing';
import { CatchingType } from '../catching-type';

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
    catchingType: CatchingType;
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

