import { AppImage } from '../app-image';
import { ThingType } from '../../enums/thing-type';
/**
 * Вещь
 */
export interface Thing {
    id?: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    // вес
    weightG: number;
    type: ThingType;
}

