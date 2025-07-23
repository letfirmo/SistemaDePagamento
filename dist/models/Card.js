"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.CardType = void 0;
const PaymentMethod_1 = require("./PaymentMethod");
var CardType;
(function (CardType) {
    CardType["Credit"] = "Cr\u00E9dito";
    CardType["Debit"] = "D\u00E9bito";
})(CardType || (exports.CardType = CardType = {}));
class Card extends PaymentMethod_1.PaymentMethod {
    constructor(cardNumber, type) {
        super();
        this.cardNumber = cardNumber;
        this.type = type;
    }
    pay(amount) {
        return `Pagamento de R$${amount.toFixed(2)} realizado via cartão ${this.type}`;
    }
}
exports.Card = Card;
