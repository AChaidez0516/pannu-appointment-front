import React from 'react';
import { render, screen } from '@testing-library/react';
import NoCancelChekedInPage from '../../../pages/manual/cancel/no-cancel-checked-in';

jest.mock('../../../src/components/PageLayout', () => ({children}) => {
    return <React.Fragment>{children}</React.Fragment>
});

describe('Tests in NoCancelCheckedInPage', () => {
  it('renders the proper messages', () => {
    render(<NoCancelChekedInPage />);

    
    expect(screen.getByText("Your appointment was not canceled")).toBeTruthy();
    expect(screen.getByText("Look forward to seeing you at the appointment time.")).toBeTruthy();
  });
});