import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Feedback from './Feedback';
import '@testing-library/jest-dom';

delete window.location;
window.location = { reload: jest.fn() };
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: { reload: jest.fn() },
    writable: true,
  });
});

describe('Feedback component', () => {
  it('renders ChatLoader when loading', () => {
    render(
      <Router>
        <Feedback feedback="" feedbackLoading={true} />
      </Router>
    );
    const chatLoaderElement = screen.getByTestId('chat-loader-container');
    expect(chatLoaderElement).toBeInTheDocument();
  });

  it('calls downloadTranscript when download button is clicked', () => {
    const downloadTranscriptMock = jest.fn();
    global.downloadTranscript = downloadTranscriptMock;
    render(
      <Router>
        <Feedback feedback="" feedbackLoading={false} />
      </Router>
    );
    const downloadButton = screen.getByText('Download Transcript');
    fireEvent.click(downloadButton);
    expect(downloadTranscriptMock).toHaveBeenCalled();
  });

  it('calls clearDatabase and reloads window when restart button is clicked', () => {
    const clearDatabaseMock = jest.fn();
    global.clearDatabase = clearDatabaseMock;
    render(
      <Router>
        <Feedback feedback="" feedbackLoading={false} />
      </Router>
    );
    const restartButton = screen.getByText('Restart Interview');
    fireEvent.click(restartButton);
    expect(clearDatabaseMock).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
