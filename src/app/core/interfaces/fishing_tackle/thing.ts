import { AppImage } from '../app-image';
/**
 * Вещь
 */
export interface Thing {
    name: string;
    description: string;
    image: AppImage;
    price: number;
    // вес
    weightG: number;
}
