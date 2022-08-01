export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this.addItem(item));
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }
}
