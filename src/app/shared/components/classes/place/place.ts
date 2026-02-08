import { IPlace } from '../../../interfaces/iplace';
import { Guid } from '../guid/guid';

/**
 * Represents a geographical place with coordinates and optional address
 *
 * @export
 * @class Place
 * @implements {IPlace}
 */
export class Place implements IPlace {
  /**
   * Latitude coordinate of the place
   *
   * @type {number}
   * @memberof Place
   */
  lat: number;

  /**
   * Longitude coordinate of the place
   *
   * @type {number}
   * @memberof Place
   */
  lng: number;

  /**
   * Unique identifier for the place
   * Generated automatically if not provided
   *
   * @type {string}
   * @memberof Place
   */
  id: string;

  /**
   * Optional address of the place
   * Not used for region-type places
   * declare used to not emit undefined value when no address provided
   * @type {string}
   * @memberof Place
   */
  declare address?: string;

  /**
   * Creates an instance of Place
   *
   * @param {IPlace} place - The place data to initialize from
   * @memberof Place
   */
  constructor(place: IPlace) {
    this.lat = place.lat;
    this.lng = place.lng;
    this.id = place.id ?? Guid.generateGuidV4();
    if (place.address) {
      this.address = place.address;
    }
  }
}
