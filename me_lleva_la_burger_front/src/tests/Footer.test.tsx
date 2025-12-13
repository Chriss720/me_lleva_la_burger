import { render, screen } from '@testing-library/react';
import { Footer } from '../components/layout/Footer';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
    it('renders brand name and copyright', () => {
        render(<Footer />);

        expect(screen.getByText('Me Lleva la Burger')).toBeInTheDocument();
        expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
    });

    it('renders contact information', () => {
        render(<Footer />);

        expect(screen.getByText('hola@mellevalaburger.com')).toBeInTheDocument();
    });
});
