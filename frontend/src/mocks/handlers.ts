import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

// Mock data generator for PetSitter
const createMockPetSitter = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  location: faker.location.city(),
  petTypes: faker.helpers.arrayElements(['Dog', 'Cat', 'Bird', 'Rabbit'], { min: 1, max: 3 }),
  rate: faker.number.int({ min: 15, max: 50 }),
  imageUrl: faker.image.avatar(), // Using avatar for simplicity
});

export const handlers = [
  // Mock for GET /api/sitters
  http.get('/api/sitters', ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword');
    const location = url.searchParams.get('location');
    const petType = url.searchParams.get('petType');

    console.log('MSW intercepted GET /api/sitters with params:', { keyword, location, petType });

    // Generate a list of mock sitters
    const sitters = faker.helpers.multiple(createMockPetSitter, {
      count: faker.number.int({ min: 5, max: 15 }), // Random number of sitters
    });

    // Basic filtering example (can be expanded)
    const filteredSitters = sitters.filter(sitter => {
      let match = true;
      if (keyword && !sitter.name.toLowerCase().includes(keyword.toLowerCase())) {
        match = false;
      }
      if (location && sitter.location.toLowerCase() !== location.toLowerCase()) {
        match = false;
      }
      if (petType && !sitter.petTypes.some(type => type.toLowerCase() === petType.toLowerCase())) {
        match = false;
      }
      return match;
    });

    return HttpResponse.json(filteredSitters);
  }),

  // Add other handlers here based on your openapi.yml
]; 