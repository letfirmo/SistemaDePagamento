export class ErrorHandler {
  static log(error: unknown): void {
    if (error instanceof Error) {
      console.error('[ERROR]:', error.message, '\nStack:', error.stack);
    } else {
      console.error('[ERROR]: Erro desconhecido', error);
    }
  }
}