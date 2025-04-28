from decimal import Decimal
from datetime import datetime

#Cliente
class Customer:
    def __init__(self, id: int, name: str, email: str, phone_number: str, endereço: str, cpf: str):
        self.id = id
        self.name = name
        self.phone_number = phone_number
        self.email = email
        self.endereço = endereço
        self.cpf = cpf
   
    def registerUser(self) -> None:
        print(f"Usuário {self.name} cadastrado!")
    
    def updateUser(self) -> None:
        print(f"Perfil do usuário {self.name} atualizado!")

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


#Pedido
class Order:
    def __init__(self, status: str, id: int, customer: Customer, value, order_number):
        self.id = id
        # self.status = 'Novo' # Verificar se faz sentido esse status de confirmação de pedido os métodos estão comentados abaixo
        self.name = customer.name
        self.phone_number = customer.phone_number
        self.email = customer.email
        self.phone_number = customer.phone_number
        self.cpf = customer.cpf
        self.value = value
        self.order_number = order_number
        self.products = []
        self.quantities = []

    def addProduct(self, product: Product, amount: int) -> None:
        self.products.append(product)
        self.quantities.append(amount)
    
    def removeProduct(self, product: Product) -> None:
        if product in self.products:
            index = self.products.index(product)
            self.products.pop(index)
            self.quantities.pop(index)
    
    def total(self, product: Product) -> Decimal:
        total = Decimal('0.00')
        for product, amount in zip(self.products, self.quantities):
            total += product.price * amount
        return total

    # def confirm(self) -> None:
    #     self.status = "Confirmado"
    #     print(f"Pedido {self.id} confirmado")
    
    # def cancel(self) -> None:
    #     self.status = "Cancelado"
    #     print(f"Pedido {self.id} cancelado")

    #caso dê o print(pedido), retorna as info
     # acho que não precisa identificar isso tudo não, só dar um print no costumer ele já tras todas as informações
    def __str__(self):
        return f"Cliente: {self.name}\nEmail: {self.email}\nValor: {self.price:.2f}\nNúmero do Pedido: {self.order_number}"

#Método de pagamento
class Method:
    cash = "Dinheiro"
    debit_card = "Cartão de débito"
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

# Avaliação dos clientes

class AvaliacaoCliente:
    def __init__(self, cliente_nome):
        self.cliente_nome = cliente_nome
        self.nota = None
        self.comentario = None

    def registrar_avaliacao(self, nota, comentario=""):
        if nota < 1 or nota > 5:
            raise ValueError("Avalie sua experiência entre 1 e 5.")
        self.nota = nota
        self.comentario = comentario.strip()

    def mostrar_avaliacao(self):
        if self.nota is None:
            return f"{self.cliente_nome} Sem nenhuma avaliação."
        avaliacao = f"{Avaliação de {self.cliente_nome}:\n"
        avaliacao += f"Nota: {self.nota}/5\n"
        if self.comentario:
            avaliacao += f"Comentário: {self.comentario}"
        else:
            avaliacao += "Nenhum comentário foi efetuado."
        return avaliacao


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
