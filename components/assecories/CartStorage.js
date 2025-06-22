// CartStorage.js - Temporary storage solution
class CartStorage {
    constructor() {
      this.cartItems = {};
      this.listeners = [];
    }
  
    // Add item to cart
    addItem(productId, quantity = 1) {
      this.cartItems[productId] = (this.cartItems[productId] || 0) + quantity;
      this.notifyListeners();
    }
  
    // Remove item from cart
    removeItem(productId) {
      delete this.cartItems[productId];
      this.notifyListeners();
    }
  
    // Update item quantity
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.cartItems[productId] = quantity;
        this.notifyListeners();
      }
    }
  
    // Get total items count
    getTotalItems() {
      return Object.values(this.cartItems).reduce((sum, count) => sum + count, 0);
    }
  
    // Get specific item count
    getItemCount(productId) {
      return this.cartItems[productId] || 0;
    }
  
    // Get all cart items
    getAllItems() {
      return { ...this.cartItems };
    }
  
    // Clear cart
    clearCart() {
      this.cartItems = {};
      this.notifyListeners();
    }
  
    // Subscribe to cart changes
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    // Notify all listeners of changes
    notifyListeners() {
      this.listeners.forEach(listener => listener(this.cartItems));
    }
  }
  
  // Create singleton instance
  const cartStorage = new CartStorage();
  export default cartStorage;