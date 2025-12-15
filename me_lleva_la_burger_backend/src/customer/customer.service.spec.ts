import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  const mockCustomer = {
    id_cliente: 1,
    nombre_cliente: 'Test',
    apellido_cliente: 'User',
    correo_cliente: 'test@example.com',
    contrasena_cliente: 'hashedPass',
    telefono_cliente: '1234567890',
    direccion: 'Test Address',
    fecha_registro: new Date(),
    estado_cliente: 'ACTIVO',
    orders: [],
    carts: [],
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockCustomer]),
    findOneBy: jest.fn().mockResolvedValue(mockCustomer),
    create: jest.fn().mockReturnValue(mockCustomer),
    save: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),

          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockCustomer]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a customer', async () => {
      const createDto = {
        nombre_cliente: 'Test',
        apellido_cliente: 'User',
        correo_cliente: 'test@example.com',
        contrasena_cliente: 'password',
        direccion: 'Address',
        telefono_cliente: '1234567890',
        estado_cliente: 'ACTIVO',
      };
      const result = await service.create(createDto);
      expect(result).toEqual(mockCustomer);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.create).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
