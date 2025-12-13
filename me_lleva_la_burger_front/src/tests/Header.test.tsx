import { render, screen } from '@testing-library/react';
import { Header } from '../components/layout/Header';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock hooks
vi.mock('../hooks', () => ({
    useAuth: () => ({
        user: null,
        isAuthenticated: false,
        logout: vi.fn()
    }),
    useCart: () => ({
        getItemCount: () => 0,
        items: [],
        getTotal: () => 0,
        loadMyCart: vi.fn().mockResolvedValue({})
    })
}));

describe('Header Component', () => {
    it('renders logo and navigation links', () => {
        render(<Header />);

        expect(screen.getByText('ME LLEVA LA BURGER')).toBeInTheDocument();
        expect(screen.getByText('Menú')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('renders login status correctly when not authenticated', () => {
        render(<Header />);
        expect(screen.getByText('Acceder')).toBeInTheDocument();
    });
});
