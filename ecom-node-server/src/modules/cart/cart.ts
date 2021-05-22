import { HttpException } from '@nestjs/common';

interface Product {
  qty: number;
  date: number;
  item: any;
}
export class Cart {
  private subTotal: number;
  private tax: number;
  private total: number;
  public products: Product[];

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

  private computeTotals() {
    let total = 0;
    for(const product of this.products) {
      total += Number(product.item.price);
    }
    this.subTotal = total;
    this.tax = Number(this.subTotal * 0.09);
    this.total = Number(this.tax + this.subTotal);
  }

  public addProduct(product: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].item.id === product.id) {
        this.products[i].qty += 1;
        this.products[i].date = Date.now();
        this.computeTotals();
        return;
      }
    }
    this.products.push({ 
      qty: 1, 
      item: product, 
      date: Date.now() 
    });
    this.computeTotals();
  }

  public updateProductQuantity(id: string, qty: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].item.id === id) {
        this.products[i].qty = qty;
      } 
      if(this.products[i].qty === 0) {
        this.products.splice(i, 1);
      }
    }
    this.computeTotals();
  }

  public deleteProductFromCart(id: string) {
    this.products = this.products.filter(product => {
      return product.item.id !== id
    });
    this.computeTotals();
  }
}
