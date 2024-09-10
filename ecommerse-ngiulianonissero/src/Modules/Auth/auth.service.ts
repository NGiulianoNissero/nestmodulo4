import { Injectable } from '@nestjs/common';
import { CredentialRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private credentialRepository: CredentialRepository) {}

  async createCredential(email: string, password: string): Promise<void> {
    await this.credentialRepository.createCredential(email, password);
  }

  async loginUser(email: string, password: string): Promise<void> {
    await this.credentialRepository.loginUser(email, password);
  }
}
