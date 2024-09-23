export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    address: string;
    phone: number;
    country?: string | undefined;
    city?: string | undefined;
    isAdmin?: boolean;
}
