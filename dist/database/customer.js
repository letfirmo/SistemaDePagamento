"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customers = void 0;
const Customer_1 = require("../models/Customer");
const regions_1 = require("./regions");
exports.customers = [
    new Customer_1.Customer('1', 'Maria', regions_1.regions[0]),
    new Customer_1.Customer('2', 'João', regions_1.regions[1]),
    new Customer_1.Customer('3', 'Ana', regions_1.regions[2]),
    new Customer_1.Customer('4', 'Carlos', regions_1.regions[3]),
    new Customer_1.Customer('5', 'Fernanda', regions_1.regions[4]),
    new Customer_1.Customer('6', 'Lucas', regions_1.regions[5]),
    new Customer_1.Customer('7', 'Juliana', regions_1.regions[6]),
    new Customer_1.Customer('8', 'Pedro', regions_1.regions[7]),
    new Customer_1.Customer('9', 'Clara', regions_1.regions[8]),
    new Customer_1.Customer('10', 'Bruno', regions_1.regions[9]),
];
