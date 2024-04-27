import React from 'react';
import { render, screen } from '@testing-library/react';
import MainDiagnoseInputComponent from '@/components/prediction/MainDiagnoseInputComponent';
import { useTranslation } from 'react-i18next';


// Mocking necessary components and hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "predictions:mainInpuPlaceholder") return "Type your symptoms...";
      return key;
    }
  }),
}));

jest.mock('@/components/prediction/ButtonGetDiagnosis', () => () => <button>Get Diagnosis</button>);

describe('MainDiagnoseInputComponent', () => {
  it('renders a textarea and a button', () => {
    render(<MainDiagnoseInputComponent />);
    
    const textarea = screen.getByPlaceholderText("Type your symptoms...");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveStyle('borderColor: #3af05e');
    expect(textarea).toHaveStyle('borderRadius: 30px');
    expect(textarea).toHaveStyle('padding: 4px');
    expect(textarea).toHaveStyle('boxShadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;');

    const button = screen.getByRole('button', { name: "Get Diagnosis" });
    expect(button).toBeInTheDocument();
  });
});
