import { AppImage } from '../app-image';
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
}
