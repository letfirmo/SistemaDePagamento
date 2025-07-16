import { describe, it, expect } from "vitest";
import { Order } from "../models/Order";
import { ReportService } from "../services/ReportService";

describe("ReportService", () => {
  describe("generateDailyReport", () => {
    it("when no orders are provided, then returns report with zero values", () => {
      // Arrange
      const orders: Order[] = [];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toBe("Relatório do dia: 0 pedidos - Total R$0.00");
    });

    it("when one order is provided, then returns report with correct values", () => {
      // Arrange
      const orders: Order[] = [{ amount: 100.5 } as Order];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toBe("Relatório do dia: 1 pedidos - Total R$100.50");
    });

    it("when multiple orders are provided, then returns report with sum of amounts", () => {
      // Arrange
      const orders: Order[] = [
        { amount: 50.25 } as Order,
        { amount: 75.1 } as Order,
        { amount: 125.75 } as Order,
      ];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toBe("Relatório do dia: 3 pedidos - Total R$251.10");
    });

    it("when orders with decimal values are provided, then returns correctly formatted total", () => {
      // Arrange
      const orders: Order[] = [
        { amount: 33.333 } as Order,
        { amount: 66.666 } as Order,
      ];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toBe("Relatório do dia: 2 pedidos - Total R$100.00");
    });

    it("when orders with zero amounts are provided, then returns correct total", () => {
      // Arrange
      const orders: Order[] = [
        { amount: 0 } as Order,
        { amount: 0 } as Order,
        { amount: 0 } as Order,
      ];

      // Act
      const result = ReportService.generateDailyReport(orders);

      // Assert
      expect(result).toBe("Relatório do dia: 3 pedidos - Total R$0.00");
    });
  });
});