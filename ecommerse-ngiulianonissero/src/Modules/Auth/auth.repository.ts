import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CredentialRepository {
  private credential = [];

  async createCredential(email: string, password: string): Promise<void> {
    this.credential.push({ email, password });
    const credential = await this.credential.find(
      (credential) => credential.email === email,
    );
    if (!credential)
      throw new BadRequestException('Error al crear la credencial.');
  }

  async loginUser(email: string, password: string): Promise<void> {
    const credential = this.credential.find(
      (credential) => credential.email === email,
    );
    if (!credential)
      throw new BadRequestException('Email o password incorrectos.');
    if (credential.password !== password)
      throw new BadRequestException('Email o password incorrectos.');
  }

  async isRegistred(email: string): Promise<boolean> {
    const credential = this.credential.find(
      (credential) => credential.email === email,
    );

    if (credential) return true;
    else return false;
  }
}
