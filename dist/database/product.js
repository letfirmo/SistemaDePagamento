"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const Product_1 = require("../models/Product");
exports.products = [
    new Product_1.Product(1, "Sashimis", 50),
    new Product_1.Product(2, "Barca de sushis", 189),
    new Product_1.Product(3, "Salada de Polvo", 80),
    new Product_1.Product(4, "Temaki de Salmão Grelhado", 46.99),
    new Product_1.Product(5, "Temaki de Camarão", 40.80)
];
