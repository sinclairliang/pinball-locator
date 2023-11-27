import { render, screen } from '@testing-library/react';
import LocationsList from './LocationList';
import {Location} from '../types/Location';

const mockLocations: Location[] = [
    {
      id: 1,
      name: 'Location 1',
      street: '123 Main St',
      city: 'Omaha',
      state: 'NE',
      zip: '12345',
      phone: '555-1234',
      lat: '12.3456',
      lon: '78.9012',
      website: 'https://example.com',
      created_at: '2023-01-01',
      updated_at: '2023-01-02',
      zone_id: null,
      region_id: 123,
      location_type_id: 456,
      description: 'A description',
      operator_id: null,
      date_last_updated: '2023-01-03',
      last_updated_by_user_id: 789,
      is_stern_army: null,
      country: 'USA',
      ic_active: null,
      distance: 10.5,
      bearing: 'NE',
      machine_names: ['Machine A', 'Machine B'],
      machine_ids: [101, 102],
      num_machines: 2,
      machines: [],
    },
  ];

describe('LocationsList', () => {
  it('renders locations when there are locations', () => {
    render(
      <LocationsList
        locations={mockLocations}
        openLocationId={null}
        onListItemClick={() => {}}
        hasSearched={true}
      />
    );

    expect(screen.getByText('Location 1')).toBeInTheDocument();
  });

  it('renders a message when there are no locations and hasSearched is true', () => {
    render(
      <LocationsList
        locations={[]}
        openLocationId={null}
        onListItemClick={() => {}}
        hasSearched={true}
      />
    );

    expect(screen.getByText('No locations found within this radius.')).toBeInTheDocument();
  });

  it('does not render a message when there are no locations and hasSearched is false', () => {
    render(
      <LocationsList
        locations={[]}
        openLocationId={null}
        onListItemClick={() => {}}
        hasSearched={false}
      />
    );

    expect(screen.queryByText('No locations found within this radius.')).toBeNull();
  });
});
