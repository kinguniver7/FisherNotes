import { AppImage } from '../app-image';
import { ThingType } from '../../enums/thing-type';
/**
 * Вещь
 */
export interface Thing {
    id: string;
    name: string;
    description: string;
    image: AppImage;
    price: number;
    // вес
    weightG: number;
    type: ThingType;
}

