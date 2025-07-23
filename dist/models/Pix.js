"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pix = void 0;
const PaymentMethod_1 = require("./PaymentMethod");
class Pix extends PaymentMethod_1.PaymentMethod {
    constructor(chavePix) {
        super();
        this.chavePix = chavePix;
    }
    pay(amount) {
        return `Pagamento de R$${amount.toFixed(2)} realizado via PIX para a chave ${this.chavePix}`;
    }
}
exports.Pix = Pix;
