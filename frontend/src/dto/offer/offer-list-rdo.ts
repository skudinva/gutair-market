import { Type } from '../../types/types';
import { OfferRdo } from './offer-rdo';

export class OfferListRdo implements OfferRdo {
  public id!: string;
  public title!: string;
  public type!: Type;
  public price!: number;
  public isFavorite!: boolean;
  public isPremium!: boolean;
}
