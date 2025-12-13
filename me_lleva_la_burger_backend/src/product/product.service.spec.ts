import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
    let service: ProductService;
    let productRepo;

    const mockProduct = {
        id_producto: 1,
        nombre_producto: 'Burger',
        precio: 10,
        disponibilidad: 'disponible'
    };

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(() => {
        service = new ProductService(mockRepository as any);
        productRepo = mockRepository;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            jest.spyOn(productRepo, 'find').mockResolvedValue([mockProduct]);
            const result = await service.findAll();
            expect(result).toEqual([mockProduct]);
        });
    });

    describe('findOne', () => {
        it('should return a product by id', async () => {
            jest.spyOn(productRepo, 'findOneBy').mockResolvedValue(mockProduct);
            const result = await service.findOne(1);
            expect(result).toEqual(mockProduct);
        });

        it('should throw NotFoundException if product not found', async () => {
            jest.spyOn(productRepo, 'findOneBy').mockResolvedValue(null);
            await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should successfully insert a product', async () => {
            const dto = {
                nombre_producto: 'New',
                precio: 5,
                descripcion: 'Desc',
                ingredientes: 'Ingredientes test',
                disponibilidad: 'si'
            };

            const expectedProduct = {
                id_producto: 1,
                ...dto,
                foto: null,
                fecha_creacion: new Date(),
                orderProducts: [],
                cartProducts: []
            };

            jest.spyOn(productRepo, 'create').mockReturnValue(expectedProduct);
            jest.spyOn(productRepo, 'save').mockResolvedValue(expectedProduct);

            const result = await service.create(dto);
            expect(result).toEqual(expectedProduct);
        });
    });
});
