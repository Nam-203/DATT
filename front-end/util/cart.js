class Cart {
  checkCart() {
    if (!localStorage.getItem('cart')) {
      this.setCart([]);
    }
  }

  setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart() {
    this.checkCart();
    return JSON.parse(localStorage.getItem('cart'));
  }

  totalPrice(cart) {
    const total = cart.reduce(
      (total, item) =>
        (total +=
          item.option[0].price * item.quantity * (1 - item.discount / 100)),
      0
    );
    return total;
  }

  destroyCart() {
    localStorage.removeItem('cart');
  }
}

export const cart = new Cart();
