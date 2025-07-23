"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static log(error) {
        if (error instanceof Error) {
            console.error('[ERROR]:', error.message, '\nStack:', error.stack);
        }
        else {
            console.error('[ERROR]: Erro desconhecido', error);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
