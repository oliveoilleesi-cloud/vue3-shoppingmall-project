import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {

      const existingItem = this.cartItems.find(item => item?.product?.id === product.product.id);

      if (existingItem) {
        existingItem.quantity += product.quantity; // 이미 장바구니에 있으면 수량 증가 
      } else {
        this.cartItems.push({ ...product, quantity: product.quantity }); // 새 상품 추가 
      }
    },
    removeFromCart(productId) {
      console.log('Removing product with ID:', productId); // 디버그 로그
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId); // 장바구니에서 상품 제거 
    },
    clearCart() {
      this.cartItems = []; // 장바구니 초기화 
    }

  },
})  