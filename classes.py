#Cliente
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

#Pedido
class Order:
    def __init__(self, customer, price, order_number):
        self.name = customer.name
        self.email = customer.email
        self.price = price
        self.order_number = order_number

    #caso dê o print(pedido), retorna as info
    def __str__(self):
        return f"Cliente: {self.name}\nEmail: {self.email}\nValor: {self.price:.2f}\nNúmero do Pedido: {self.order_number}"

######classes que não serão usadas agora#######

#Produtos
#class Product:
#    def __init__(self, name, price):
#        self.name = name
#        self.price = price
#
#    def __str__(self):
#        return f"Produto: {self.name}\nPreço: R${self.price:.2f}"

#Cardapio
#class Menu:
#    def __init__(self):
#        self.products = []
#
#    #funcao addiconar produto
#    def add_product(self, product):
#        if product not in self.products:
#            self.products.append(product)
#            return True
#        return False
#
#    #funcao remover produto
#    def remove_product(self, product):
#        if product in self.products:
#                self.products.remove(product)
#                return True
#        return False
#    
#    #funcao imprimir cardapio
#    def show_menu(self):
#        for p in self.products:
#            print(p)