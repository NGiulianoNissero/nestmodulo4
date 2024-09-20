import { Test } from '@nestjs/testing';
import { OrderDetailsRepository } from '../../src/modules/orderDetails/orderDetails.repository';
import { OrderDetailsService } from '../../src/modules/orderDetails/orderDetails.service';
import { EOrder } from '../../src/entities/orders.entity';
import { CreateOrderDetailsDto } from '../../src/modules/orderDetails/dto/createOrderDetails.dto';
import { EOrderDetails } from '../../src/entities/orderDetails.entity';
import { EProduct } from '../../dist/entities/products.entity';
import { BadRequestException } from '@nestjs/common';

describe('OrderDetailsService', () => {
  let orderDetailsService: OrderDetailsService;
  let mockOrderDetailsRepository: Partial<OrderDetailsRepository>;

  const mockOrder: Partial<EOrder> = {
    id: 'order-1',
    date: new Date(),
    user: {
      id: 'user-1',
      name: 'Usuario de testeo',
      email: 'testing@gmail.com',
      password: 'Admin123!',
      phone: 513124123,
      address: '123 calle queso',
    },
  };

  const mockProducts: CreateOrderDetailsDto[] = [
    { id: 'product-1' },
    { id: 'product-2' },
  ];

  const mockOrderDetails: Partial<EOrderDetails> = {
    id: 'orderDetails-1',
    price: 1000,
    order: mockOrder as EOrder,
    products: [
      { id: 'product-1', price: 500, stock: 10 } as EProduct,
      { id: 'product-2', price: 500, stock: 10 } as EProduct,
    ],
  };

  beforeEach(async () => {
    mockOrderDetailsRepository = {
      createOrderDetails: jest.fn().mockResolvedValue(mockOrderDetails),
    };

    const module = await Test.createTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: OrderDetailsRepository,
          useValue: mockOrderDetailsRepository,
        },
      ],
    }).compile();

    orderDetailsService = module.get<OrderDetailsService>(OrderDetailsService);
  });

  it('Servicio de detalles de ordenes debe estar definio', async () => {
    expect(orderDetailsService).toBeDefined();
  });

  it('createOrderDetails() debe retornar los detalles de la orden', async () => {
    const result = await orderDetailsService.createOrderDetails(
      mockProducts,
      mockOrder as EOrder,
    );

    expect(result).toEqual(mockOrderDetails);
  });

  it('createOrderDetails() debe lanzar una exepcion si ocurre un error al crear el detalle de orden', async () => {
    mockOrderDetailsRepository.createOrderDetails = jest.fn(() => {
      throw new BadRequestException(
        'Hubo un error al crear el detalle de orden',
      );
    });

    expect(
      orderDetailsService.createOrderDetails(mockProducts, mockOrder as EOrder),
    ).rejects.toThrow(BadRequestException);
  });
});
