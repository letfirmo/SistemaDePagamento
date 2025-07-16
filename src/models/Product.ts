// Entidade produto
<<<<<<< HEAD

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
=======
export class Product {
    
}
>>>>>>> fe4d641454f3738d1d4b925466d875cad8bc69a2
