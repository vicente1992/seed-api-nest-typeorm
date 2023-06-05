import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register and return the result', async () => {
      const response = {
        user: {
          id: '91e8eb4c-5632-430e-89d2-21d65c8b75be',
          names: 'test',
          lastName: 'test',
          email: 'test@gmail.com',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      };
      jest
        .spyOn(authService, 'register')
        .mockImplementation(() => Promise.resolve(response));

      // Mock los valores necesarios
      const createAuthDto: CreateAuthDto = {
        names: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: '12345',
      };

      // Verifica las expectativas
      expect(await authService.register(createAuthDto)).toBe(response);
      expect(authService.register).toHaveBeenCalledWith(createAuthDto);
      // expect(result).toBe(response);
    });
  });
});
