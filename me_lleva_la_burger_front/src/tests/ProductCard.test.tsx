import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../components/common/ProductCard';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('ProductCard Component', () => {
    const mockProduct = {
        id: 1,
        nombre_producto: 'Super Burger',
        precio: 99.99,
        descripcion: 'Delicious burger',
        ingredientes: 'Meat, Cheese, Bun',
        disponibilidad: 'Disponible',
        imagen: 'test.jpg'
    };

    const mockOnAddToCart = vi.fn();

    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

        expect(screen.getByText('Super Burger')).toBeInTheDocument();
        expect(screen.getByText('Delicious burger')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('calls onAddToCart when button is clicked', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

        const button = screen.getByRole('button', { name: /agregar al carrito/i });
        fireEvent.click(button);

        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
