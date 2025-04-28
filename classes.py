from decimal import Decimal
from datetime import datetime

#Cliente
class Customer:
    def __init__(self, id: int, name: str, email: str, phone_number: int):
        self.id = id
        self.name = name
        self.phone_number = phone_number
        self.email = email
   
    def registerUser(self) -> None:
        print(f"Usuário {self.name} cadastrado!")
    
    def updateUser(self) -> None:
        print(f"Perfil do usuário {self.name} atualizado!")

#Pedido
class Order:
    def __init__(self, customer: Customer, value, order_number):
        self.name = customer.name
        self.phone_number = customer.phone_number
        self.email = customer.email
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
class Pagamento:
    def __init__(self, pagamentoID, order: Order, method: Method, valor):
        self.pagamentoID = pagamentoID
        self.order = order
        self.method = method
        self.valor = valor
        self.dataPagamento = datetime.now()

    def processar(self):
        pass

    def estornar(self):
        pass

    def validar(self):
        pass

#Produto
class Product:
    def __init__(self, id: int, name: str, price: Decimal, description: str):
        self.id = id
        self.name = name
        self.description = description
        self.price = price

    def updatePrice(self, newPrice: Decimal) -> None:
        self.price = newPrice

    def updateDescription(self, newDescription: str) -> str:
        self.description = newDescription
        return self.description

    def __str__(self):
        return f"Produto: {self.name}\nPreço: R${self.price:.2f}" # se for deixar em Decimal vai ter que alterar a lógica de formatação

#




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
