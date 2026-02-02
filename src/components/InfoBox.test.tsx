import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoBox } from './InfoBox';

describe('InfoBox', () => {
  it('renders the title correctly', () => {
    render(<InfoBox title="Test Title" content="Test content" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the content correctly', () => {
    render(<InfoBox title="Test Title" content="Test content here" />);
    expect(screen.getByText('Test content here')).toBeInTheDocument();
  });

  it('displays "No data available" when content is empty', () => {
    render(<InfoBox title="Empty Box" content="" />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('applies descriptive variant by default', () => {
    const { container } = render(<InfoBox title="Test" content="Content" />);
    expect(container.querySelector('.info-box')).toHaveClass('descriptive');
  });

  it('applies prescriptive variant when specified', () => {
    const { container } = render(
      <InfoBox title="Test" content="Content" variant="prescriptive" />
    );
    expect(container.querySelector('.info-box')).toHaveClass('prescriptive');
  });

  it('has correct aria-label for accessibility', () => {
    render(<InfoBox title="Accessibility Test" content="Content" />);
    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-label',
      'Accessibility Test'
    );
  });
});
