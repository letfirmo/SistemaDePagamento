#Cliente
class Customer:
    def __init__(self, name, phone_number, address):
        self.name = name
        self.phone_number = phone_number
        self.address = address

#Produto
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"Produto: {self.name}\nPreço: R${self.price:.2f}"

#Pedido
class Order:
    def __init__(self, customer: Customer, value, order_number):
        self.name = customer.name
        self.phone_number = customer.phone_number
        self.value = value
        self.order_number = order_number

    #caso dê o print(pedido), retorna as info
    def __str__(self):
        return f"Cliente: {self.name}\nEmail: {self.email}\nValor: {self.price:.2f}\nNúmero do Pedido: {self.order_number}"

#Método de pagamento
class Method:
    cash = "Dinheiro"
    debit_card = "Cartão de débido"
    credit_card = "Cartão de crédito"
    pix = "Pix"

#Pagamento
class Payment:
    def __init__(self, order: Order, method: Method):
        self.order = order
        self.method = method

#Produto
class Product:
    def __init__(self, name, price, description=""):
        self.product = name
        self.description = description
        self.price = price

    def new_price(self, price):
        self.price = price

    def new_description(self, description):
        self.description = description




######classes que não serão usadas agora#######

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