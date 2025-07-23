"use strict";
// Entidade produto
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        if (price < 0) {
            throw new Error("O preço do produto não pode ser negativo.");
        }
        if (name.trim() === "") {
            throw new Error("O nome do produto não pode ser vazio.");
        }
    }
}
exports.Product = Product;
