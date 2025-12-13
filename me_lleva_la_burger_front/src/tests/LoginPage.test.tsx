import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock hooks
const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin
    })
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('LoginPage', () => {
    it('renders login form elements', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Inicia sesion')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('ejemplo@burgerexpress.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /INICIAR SESIÓN/i })).toBeInTheDocument();
    });
});
