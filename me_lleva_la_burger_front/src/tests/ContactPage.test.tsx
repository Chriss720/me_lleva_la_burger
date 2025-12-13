import { render, screen } from '@testing-library/react';
import { ContactPage } from '../pages/ContactPage';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Header and Footer to isolate ContactPage testing
vi.mock('../components/layout/Header', () => ({
    Header: () => <div data-testid="mock-header">Header</div>
}));

vi.mock('../components/layout/Footer', () => ({
    Footer: () => <div data-testid="mock-footer">Footer</div>
}));

describe('ContactPage', () => {
    it('renders contact title and descriptions', () => {
        render(<ContactPage />);

        expect(screen.getByText(/CONTÁCTANOS/i)).toBeInTheDocument();
        expect(screen.getByText(/¿Tienes hambre\? ¿Dudas\?/i)).toBeInTheDocument();
    });

    it('renders social media links', () => {
        render(<ContactPage />);

        expect(screen.getByText('WhatsApp')).toBeInTheDocument();
        expect(screen.getByText('Facebook')).toBeInTheDocument();
        expect(screen.getByText('Correo')).toBeInTheDocument();
    });
});
