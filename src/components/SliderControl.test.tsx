import { render, screen, fireEvent } from '@testing-library/react';
import SliderControl from './SliderControl';

describe('SliderControl', () => {
  it('renders the slider with the specified radius', () => {
    const radius = 25;

    render(
      <SliderControl
        radius={radius}
        onRadiusChange={() => {}}
        onNearMeClick={() => {}}
      />
    );

    expect(screen.getByText(`Radius: ${radius} miles`)).toBeInTheDocument();
  });

  it('calls onRadiusChange when the slider value changes', () => {
    const mockOnRadiusChange = jest.fn();

    render(
      <SliderControl
        radius={10}
        onRadiusChange={mockOnRadiusChange}
        onNearMeClick={() => {}}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 20 } });

    expect(mockOnRadiusChange).toHaveBeenCalledWith(20);
  });

  it('calls onNearMeClick when the "Near Me" button is clicked', () => {
    const mockOnNearMeClick = jest.fn();

    render(
      <SliderControl
        radius={10}
        onRadiusChange={() => {}}
        onNearMeClick={mockOnNearMeClick}
      />
    );

    const nearMeButton = screen.getByText('Near Me');
    fireEvent.click(nearMeButton);

    expect(mockOnNearMeClick).toHaveBeenCalled();
  });
});
