import { describe, it, expect, beforeEach } from 'vitest'
import { Order } from '../Order'
import { PaymentMethod } from '../PaymentMethod'
import { Customer } from '../Customer'
import { Product } from '../Product'
import { Region } from '../Region'

// Implementação concreta para teste
class CreditCardPayment extends PaymentMethod {
  pay(amount: number): string {
    return `Paid ${amount} with Credit Card`
  }
}

class PixPayment extends PaymentMethod {
  pay(amount: number): string {
    return `Paid ${amount} with PIX`
  }
}

describe('Order', () => {
  let mockCustomer: Customer
  let mockProduct1: Product
  let mockProduct2: Product
  let mockRegion: Region
  let creditCardPayment: PaymentMethod
  let pixPayment: PaymentMethod

  beforeEach(() => {
    mockRegion = new Region('region-1', 'North', 10)
    mockCustomer = new Customer('customer-1', 'John Doe', mockRegion)
    mockProduct1 = new Product(1, 'Product 1', 100)
    mockProduct2 = new Product(2, 'Product 2', 200)
    creditCardPayment = new CreditCardPayment()
    pixPayment = new PixPayment()
  })

  describe('When creating a new order, then it should initialize with correct values', () => {
    it('should initialize with default paid status as false', () => {
      // Arrange
      const items = [mockProduct1, mockProduct2]
      const amount = 300

      // Act
      const order = new Order('order-1', mockCustomer, items, amount, creditCardPayment)

      // Assert
      expect(order.paid).toBe(false)
    })

    it('should initialize with provided values', () => {
      // Arrange
      const id = 'order-1'
      const items = [mockProduct1, mockProduct2]
      const amount = 300

      // Act
      const order = new Order(id, mockCustomer, items, amount, pixPayment)

      // Assert
      expect(order.id).toBe(id)
      expect(order.customer).toBe(mockCustomer)
      expect(order.items).toEqual(items)
      expect(order.amount).toBe(amount)
      expect(order.paymentMethod).toBeInstanceOf(PaymentMethod)
    })
  })

  describe('When checking order properties, then they should be correct', () => {
    it('should have correct property types', () => {
      // Arrange
      const items = [mockProduct1]
      const amount = 100

      // Act
      const order = new Order('order-1', mockCustomer, items, amount, pixPayment)

      // Assert
      expect(typeof order.id).toBe('string')
      expect(order.customer).toBeInstanceOf(Customer)
      expect(Array.isArray(order.items)).toBe(true)
      expect(order.items[0]).toBeInstanceOf(Product)
      expect(typeof order.amount).toBe('number')
      expect(order.paymentMethod).toBeInstanceOf(PaymentMethod)
      expect(typeof order.paid).toBe('boolean')
    })
  })
})