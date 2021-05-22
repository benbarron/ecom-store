import { HttpException } from '@nestjs/common';

export class Cart {
  private subTotal: number;
  private tax: number;
  private total: number;
  public products: any[];

  constructor() {
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.products = [];
  }

  public setSubtotal(subTotal: number) {
    this.subTotal = subTotal;
  }

  public setTax(tax: number) {
    this.tax = tax;
  }

  public setTotal(total: number) {
    this.total = total;
  }

  public setProducts(products: any[]) {
    this.products = products;
  }

  public getSubtotal() {
    return this.subTotal;
  }

  public getTax() {
    return this.tax;
  }

  public getTotal() {
    return this.total;
  }

  public getProducts() {
    return this.products;
  }

  public addProduct(product: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].item.id === product.id) {
        this.products[i].qty += 1;
        this.products[i].date = Date.now();
        this.subTotal += Number(product.price);
        this.tax = Number(this.subTotal * 0.09);
        this.total = Number(this.tax + this.subTotal);
        return;
      }
    }
    this.products.push({ qty: 1, item: product, date: Date.now() });
    this.subTotal += Number(product.price);
    this.tax = Number(this.subTotal * 0.09);
    this.total = Number(this.tax + this.subTotal);
  }

  public updateProductQuantity(id: string, qty: number) {
    let price = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].item.id === id) {
        price += Number(this.products[i].item.price) * qty;
        this.products[i].qty = qty;
      } else {
        price += Number(this.products[i].item.price * this.products[i].qty);
      }
      if(this.products[i].qty === 0) {
        this.products.splice(i, 1);
      }
    }
    this.subTotal = price;
    this.tax = Number(this.subTotal * 0.09);
    this.total = Number(this.tax + this.subTotal);
  }

  public deleteProductFromCart(id: string) {
    const existing = [...this.products];
    this.products = [];
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    for (let i = 0; i < existing.length; i++) {
      if (existing[i].item.id !== id) {
        this.products.push(existing[i]);
        this.subTotal += Number(existing[i].item.price) * existing[i].qty;
      }
    }
    this.tax = Number(this.subTotal * 0.09);
    this.total = Number(this.tax + this.subTotal);
  }
}
