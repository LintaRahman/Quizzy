import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatLoader from './ChatLoader'; // Update the import path as needed

describe('ChatLoader', () => {
  it('renders the chat loader with three dots', () => {
    // Render the ChatLoader component
    render(<ChatLoader />);

    // Assert that the chat loader container is rendered
    const chatLoaderContainer = screen.getByTestId('chat-loader-container');
    expect(chatLoaderContainer).toBeInTheDocument();

    // Assert that three dots are rendered
    const dots = screen.getAllByTestId('dot'); // Matches dot1, dot2, dot3
    expect(dots).toHaveLength(3);
  });

  it('applies styles from CSS file', () => {
    // Render the ChatLoader component
    render(<ChatLoader />);

    // Assert that the chat loader container has the expected styles
    const chatLoaderContainer = screen.getByTestId('chat-loader-container');
    expect(chatLoaderContainer).toHaveClass('chat-loader-container');
  });
});
