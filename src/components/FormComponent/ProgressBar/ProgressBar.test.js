import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Progressbar from './ProgressBar';

describe('Progressbar component', () => {
  it('renders without crashing', () => {
    render(<Progressbar />);
  });

//   it('renders the correct step based on the page prop', () => {
//     const { getByTestId: getByTestIdPageOne } = render(<Progressbar page="pageone" />);
//     const step1 = getByTestIdPageOne('step1');
//     expect(step1).toHaveClass('accomplished');

//     const { getByTestId: getByTestIdPageTwo } = render(<Progressbar page="pagetwo" />);
//     const step2 = getByTestIdPageTwo('step2');
//     expect(step2).toHaveClass('accomplished');

//     const { getByTestId: getByTestIdPageThree } = render(<Progressbar page="pagethree" />);
//     const step3 = getByTestIdPageThree('step3');
//     expect(step3).toHaveClass('accomplished');
//   });

  it('calls onPageNumberClick with the correct page number when a step is clicked', () => {
    const onPageNumberClickMock = jest.fn();
    const { getByTestId } = render(<Progressbar onPageNumberClick={onPageNumberClickMock} />);
    
    fireEvent.click(getByTestId('step1'));
    expect(onPageNumberClickMock).toHaveBeenCalledWith('1');

    fireEvent.click(getByTestId('step2'));
    expect(onPageNumberClickMock).toHaveBeenCalledWith('2');

    fireEvent.click(getByTestId('step3'));
    expect(onPageNumberClickMock).toHaveBeenCalledWith('3');
  });
});
