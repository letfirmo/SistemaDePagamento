class Cliente:
    def __init__(self, nome, email):
        self.nome = nome
        self.email = email


#classe produtos
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"Produto: {self.name}\nPreço: R${self.price:.2f}"


#classe cardapio
class Menu:
    def __init__(self):
        self.products = []

    #funcao addiconar produto
    def add_product(self, product):
        if product not in self.products:
            self.products.append(product)
            return True
        return False

    #funcao remover produto
    def remove_product(self, product):
        if product in self.products:
                self.products.remove(product)
                return True
        return False
    
    #funcao imprimir cardapio
    def show_menu(self):
        for p in self.products:
            print(p)