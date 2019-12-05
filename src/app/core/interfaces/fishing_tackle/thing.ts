import { AppImage } from '../app-image';
import { ThingType } from '../../enums/thing-type';
import { FishingType } from '../catching-type';
import { LengthType } from '../../enums/length-type';
/**
 * Вещь
 */
export interface Thing {
    id?: string;
    // The user Id
    userId: string;
    // The name of the thing
    name: string;
    // The description of the thing
    description?: string;
    // Image URL
    imageUrl?: string;
    // Price of the thing
    price?: number;
    // Weight
    weightG?: number;
    // Type of the thing (Wobbler, Rod)
    type: ThingType;
    // Type of fishing
    fishingType?: FishingType;    
    length?: number;
    lengthType?: LengthType;
}

