// Entidade produto

export class Product {
    constructor(
        public readonly id: number,
        public name:string,
        public price: number
    ) {
        if (price < 0) {
            throw new Error("O preço do produto não pode ser negativo.")
        }

        if (name.trim() === "") {
            throw new Error("O nome do produto não pode ser vazio.")
        }
    }   
}
