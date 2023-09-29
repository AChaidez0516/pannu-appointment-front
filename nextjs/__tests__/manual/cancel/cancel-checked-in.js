import React from 'react';
import { render, screen } from '@testing-library/react';
import CancelCheckedInPage from '../../../pages/manual/cancel/cancel-checked-in';

jest.mock('../../../src/components/PageLayout', () => ({children}) => {
    return <React.Fragment>{children}</React.Fragment>
});

describe('Tests in CancelCheckedInPage', () => {
  it('renders the proper messages', () => {
    render(<CancelCheckedInPage />);

    
    expect(screen.getByText("Your appointment was cancelled")).toBeTruthy();
    expect(screen.getByText(/Refunds are sent to the original payment method/)).toBeTruthy();
    expect(screen.getByText(/Allow up to 2 weeks for refunds to show up in your bank or credit card account/)).toBeTruthy();
  });
});