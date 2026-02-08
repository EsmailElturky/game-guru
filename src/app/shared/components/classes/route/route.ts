import { IRoute } from '../../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Place } from '../place/place';
export class Route {
  path: Place[];

  properties:
    | {
        color: string;
        weight: number;
        opacity: number;
      }
    | undefined;

  title?: string;
  id: string;

  constructor(route: IRoute) {
    this.path = route.path.map((place) => new Place(place));
    this.properties = route.properties;
    this.title = route.title;
    this.id = route.id ?? uuidv4();
  }
}
