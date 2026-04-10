import {defineStore} from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null   

    }), 
    actions: {
        setProduct(product) {
            console.log('Setting product in store:', product)
            this.product = product


    },
    loadProduct(productId) {
      console.log('Loading product with ID:', productId)
      // 상품 목록에서 해당 ID 의 상품을 찾음
      // 실제 앱에서는 API 호출을 사용할 수 있음
      const products = [
        { id: 1, name: 'Chronos White Edition', price: 299.00, rating: 4.9, reviews: 124, image: '/images/product1.jpg' },
        { id: 2, name: 'Studio Pro Headphones', price: 350.00, rating: 4.8, reviews: 89, image: '/images/product2.jpg' },
        { id: 3, name: 'Signature Oud Candle', price: 65.00, rating: 5.0, reviews: 42, image: '/images/product3.jpg' }
      ]
      const foundProduct = products.find(p => p.id === parseInt(productId))
      if (foundProduct) {
        this.setProduct(foundProduct)
      }
    }
  }
})  