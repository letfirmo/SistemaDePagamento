import { describe, it, expect } from 'vitest';
import { Pix } from '../Pix';

describe('Pix Payment Method', () => {
  it('When creating a Pix instance with a valid key, then the instance should be created successfully', () => {
    // Arrange
    const validPixKey = '123.456.789-00';
    
    // Act
    const pixInstance = new Pix(validPixKey);
    
    // Assert
    expect(pixInstance).toBeInstanceOf(Pix);
  });

  it('When paying with Pix, then it should return the correct payment message', () => {
    // Arrange
    const pixKey = 'test@email.com';
    const amount = 100.5;
    const pixInstance = new Pix(pixKey);
    const expectedMessage = `Pagamento de R$100.50 realizado via PIX para a chave ${pixKey}`;
    
    // Act
    const result = pixInstance.pay(amount);
    
    // Assert
    expect(result).toBe(expectedMessage);
  });

  it('When paying with decimal amount, then it should format with 2 decimal places', () => {
    // Arrange
    const pixKey = '11987654321';
    const amount = 99.999;
    const pixInstance = new Pix(pixKey);
    const expectedMessage = `Pagamento de R$100.00 realizado via PIX para a chave ${pixKey}`;
    
    // Act
    const result = pixInstance.pay(amount);
    
    // Assert
    expect(result).toBe(expectedMessage);
  });

  it('When paying with integer amount, then it should format with .00 decimal places', () => {
    // Arrange
    const pixKey = 'random-key-123';
    const amount = 200;
    const pixInstance = new Pix(pixKey);
    const expectedMessage = `Pagamento de R$200.00 realizado via PIX para a chave ${pixKey}`;
    
    // Act
    const result = pixInstance.pay(amount);
    
    // Assert
    expect(result).toBe(expectedMessage);
  });

  it('When paying with zero amount, then it should return valid message', () => {
    // Arrange
    const pixKey = 'merchant-key';
    const amount = 0;
    const pixInstance = new Pix(pixKey);
    const expectedMessage = `Pagamento de R$0.00 realizado via PIX para a chave ${pixKey}`;
    
    // Act
    const result = pixInstance.pay(amount);
    
    // Assert
    expect(result).toBe(expectedMessage);
  });
});