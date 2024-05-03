import React from 'react';
import { render } from '@testing-library/react';
import RightNav from './RightNav';
import '@testing-library/jest-dom';


describe('RightNav Component', () => {
  test('renders Home, Chat, and FAQs links', () => {
    const { getByText } = render(<RightNav open={false} />);
    
    const homeLink = getByText(/Home/i);
    const chatLink = getByText(/Chat/i);
    const faqsLink = getByText(/FAQs/i);

    expect(homeLink).toBeInTheDocument();
    expect(chatLink).toBeInTheDocument();
    expect(faqsLink).toBeInTheDocument();
  });
});
