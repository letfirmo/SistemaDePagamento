"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ErrorHandler_1 = require("../ErrorHandler");
(0, vitest_1.describe)('ErrorHandler', () => {
    (0, vitest_1.describe)('log', () => {
        (0, vitest_1.it)('when error is instance of Error, then should log message and stack', () => {
            // Arrange
            const mockError = new Error('Test error');
            mockError.stack = 'test stack';
            const consoleSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            ErrorHandler_1.ErrorHandler.log(mockError);
            // Assert
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('[ERROR]:', 'Test error', '\nStack:', 'test stack');
            consoleSpy.mockRestore();
        });
        (0, vitest_1.it)('when error is not instance of Error, then should log unknown error', () => {
            // Arrange
            const unknownError = { some: 'object' };
            const consoleSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            ErrorHandler_1.ErrorHandler.log(unknownError);
            // Assert
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('[ERROR]: Erro desconhecido', unknownError);
            consoleSpy.mockRestore();
        });
        (0, vitest_1.it)('when error is string, then should log unknown error', () => {
            // Arrange
            const stringError = 'some string error';
            const consoleSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            ErrorHandler_1.ErrorHandler.log(stringError);
            // Assert
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('[ERROR]: Erro desconhecido', stringError);
            consoleSpy.mockRestore();
        });
        (0, vitest_1.it)('when error is null, then should log unknown error', () => {
            // Arrange
            const nullError = null;
            const consoleSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            ErrorHandler_1.ErrorHandler.log(nullError);
            // Assert
            (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith('[ERROR]: Erro desconhecido', nullError);
            consoleSpy.mockRestore();
        });
    });
});
