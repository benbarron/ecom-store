export class Likes {
  public items: any[];

  constructor() {
    this.items = [];
  }

  public setItems(items: any[]) {
    this.items = items;
  }

  public addItem(item: any) {
    this.items.push(item);
  }

  public removeItem(id: string) {
    this.items = this.items.filter((item) => {
      return item.id !== id;
    });
  }
}
