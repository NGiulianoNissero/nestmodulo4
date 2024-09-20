import { Test } from '@nestjs/testing';
import { OrdersRepository } from '../../src/modules/orders/orders.repository';
import { OrdersService } from '../../src/modules/orders/orders.service';
import { EOrder } from '../../src/entities/orders.entity';
import { AddOrderDto } from '../../src/modules/orders/dto/addOrder.dto';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let mockOrdersRepository: Partial<OrdersRepository>;

  const mockOrder: EOrder = {
    id: 'order-1',
    date: new Date(),
    user: {
      id: 'user-uuid',
      name: 'Test User',
      orders: [],
      email: 'example@gmail.com',
      password: 'Admin123!',
      phone: 521352133,
      address: '123 calle queso',
    },
    orderDetails: undefined,
  };

  const mockProducts: AddOrderDto[] = [
    { id: 'product-uuid-1' },
    { id: 'product-uuid-2' },
  ];

  beforeEach(async () => {
    mockOrdersRepository = {
      getOrder: jest.fn().mockResolvedValue(mockOrder as EOrder),
      addOrder: jest.fn().mockResolvedValue(mockOrder as EOrder),
    };

    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: mockOrdersRepository },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('El servicio de ordenes debe estar definio.', async () => {
    expect(ordersService).toBeDefined();
  });

  it('getOrder() debe retornar una orden cuando el id es valido.', async () => {
    const result = await ordersService.getOrder('order-1');

    expect(result).toEqual(mockOrder);
  });

  it('getOrder() debe lanzar una excepcion si el id no es valido.', async () => {
    mockOrdersRepository = {
      getOrder: jest
        .fn()
        .mockRejectedValueOnce(
          new BadRequestException(
            `El uuid ${mockOrder.id} no es un uuid valido.`,
          ),
        ),
    };

    try {
      const result = await ordersService.getOrder('INVALID UUID');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(
          `El uuid ${'INVALID UUID'} no es un uuid valido.`,
        );
      } else {
        fail('El error capturado no es una instancia de error.');
      }
    }
  });

  it('addOrder() retorna una orden creada correctamente.', async () => {
    const result = await ordersService.addOrder('user-uuid', mockProducts);

    expect(result).toEqual(mockOrder);
  });
});
