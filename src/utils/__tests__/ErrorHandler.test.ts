import { describe, it, expect, vi } from 'vitest';
import { ErrorHandler } from '../ErrorHandler';

describe('ErrorHandler', () => {
  describe('log', () => {
    it('when error is instance of Error, then should log message and stack', () => {
      // Arrange
      const mockError = new Error('Test error');
      mockError.stack = 'test stack';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      ErrorHandler.log(mockError);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ERROR]:',
        'Test error',
        '\nStack:',
        'test stack'
      );
      consoleSpy.mockRestore();
    });

    it('when error is not instance of Error, then should log unknown error', () => {
      // Arrange
      const unknownError = { some: 'object' };
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      ErrorHandler.log(unknownError);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ERROR]: Erro desconhecido',
        unknownError
      );
      consoleSpy.mockRestore();
    });

    it('when error is string, then should log unknown error', () => {
      // Arrange
      const stringError = 'some string error';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      ErrorHandler.log(stringError);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ERROR]: Erro desconhecido',
        stringError
      );
      consoleSpy.mockRestore();
    });

    it('when error is null, then should log unknown error', () => {
      // Arrange
      const nullError = null;
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      ErrorHandler.log(nullError);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        '[ERROR]: Erro desconhecido',
        nullError
      );
      consoleSpy.mockRestore();
    });
  });
});