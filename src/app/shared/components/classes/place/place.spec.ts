import { Place } from './place';
import { IPlace } from '../../interfaces';

/**
 * Test suite for the Place class
 */
describe('Place', () => {
  /**
   * Test that Place instances can be created with place data
   */
  it('should create an instance with provided coordinates', () => {
    const placeData: IPlace = {
      lat: 30.5,
      lng: 31.2,
      address: 'Test Address'
    };
    const place = new Place(placeData);
    
    expect(place).toBeTruthy();
    expect(place.lat).toBe(30.5);
    expect(place.lng).toBe(31.2);
    expect(place.address).toBe('Test Address');
    expect(place.id).toBeDefined();
  });

  /**
   * Test that Place class generates an ID if not provided
   */
  it('should generate an ID if not provided', () => {
    const place = new Place({ lat: 10, lng: 20 });
    
    expect(place.id).toBeDefined();
    expect(place.id.length).toBeGreaterThan(0);
  });

  /**
   * Test that Place class uses provided ID
   */
  it('should use provided ID', () => {
    const placeData: IPlace = {
      lat: 40,
      lng: 50,
      id: 'custom-id-123'
    };
    const place = new Place(placeData);
    
    expect(place.id).toBe('custom-id-123');
  });

  /**
   * Test that Place class properly handles address
   */
  it('should handle address correctly', () => {
    // With address
    const placeWithAddress = new Place({
      lat: 60,
      lng: 70,
      address: 'Cairo, Egypt'
    });
    expect(placeWithAddress.address).toBe('Cairo, Egypt');
    
    // Without address
    const placeWithoutAddress = new Place({
      lat: 80,
      lng: 90
    });
    expect(placeWithoutAddress.address).toBeUndefined();
  });
});
