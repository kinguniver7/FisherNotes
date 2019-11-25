import { Thing } from '../interfaces/fishing_tackle/thing';

export interface ThingDetail extends Thing  {
    specifications: ThingDetailSpecifications[];
}

export interface ThingDetailSpecifications {
    title: string;
    value: string;
}
