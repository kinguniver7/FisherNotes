import { Thing } from './thing';
import { LengthType } from '../../enums/length-type';

export interface Bait extends Thing  {
    length?: number;
    typeLength?: LengthType;
}
