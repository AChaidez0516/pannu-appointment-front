import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckedInPage from '../../../pages/manual/payment/checked-in';

jest.mock('../../../src/components/PageLayout', () => ({children}) => {
    return <React.Fragment>{children}</React.Fragment>
});

describe('Tests in CheckedInPage', () => {
  it('renders the proper messages', () => {
    render(<CheckedInPage />);

    
    expect(screen.getByText("You are checked in")).toBeTruthy();
    expect(screen.getByText("Please have a seat and our friendly staff will call you when it is your turn.")).toBeTruthy();
  });
});