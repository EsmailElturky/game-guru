import { v4 as uuidv4 } from 'uuid';
export class Guid {
  static generateGuidV4(): string {
    return uuidv4();
  }
}
