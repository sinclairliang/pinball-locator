import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingErrorDisplay from './LoadingErrorDisplay';

describe('LoadingErrorDisplay', () => {
  test('displays loading indicator and text when loading', () => {
    render(<LoadingErrorDisplay loading={true} error={null} />);
    const loadingText = screen.getByText(/loading locations.../i);
    expect(loadingText).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const errorMessage = 'Failed to fetch locations';
    render(<LoadingErrorDisplay loading={false} error={errorMessage} />);
    expect(screen.getByText(`${errorMessage}`)).toBeInTheDocument();
  });

  test('renders nothing when not loading and no error', () => {
    const { container } = render(<LoadingErrorDisplay loading={false} error={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
