import { defineStore } from 'pinia'

// NOTE: 초기 목업 데이터 (추후 API 연동 시 이 부분만 교체하면 됨)
const initialProducts = [
  {
    id: 1,
    name: 'Chronos White Edition',
    price: 299.0,
    rating: 4.9,
    reviews: 124,
    image: 'https://placehold.co/400',
    category: 'Tech Accessories',
    isFavorite: false
  },
  {
    id: 2,
    name: 'Studio Pro Headphones',
    price: 350.0,
    rating: 4.8,
    reviews: 89,
    image: 'https://placehold.co/400',
    category: 'Tech Accessories',
    isFavorite: false
  },
  {
    id: 3,
    name: 'Signature Oud Candle',
    price: 65.0,
    rating: 5.0,
    reviews: 42,
    image: 'https://placehold.co/400',
    category: 'Home Essentials',
    isNew: true,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Titanium Hydra Bottle',
    price: 85.0,
    rating: 4.7,
    reviews: 215,
    image: 'https://placehold.co/400',
    category: 'Personal Care',
    isFavorite: false
  },
  {
    id: 5,
    name: 'Apex Pro Tablet Sleeve',
    price: 120.0,
    rating: 4.9,
    reviews: 56,
    image: 'https://placehold.co/400',
    category: 'Tech Accessories',
    isFavorite: false
  },
  {
    id: 6,
    name: 'Nomad Weekend Bag',
    price: 450.0,
    rating: 4.8,
    reviews: 102,
    image: 'https://placehold.co/400',
    category: 'Travel Gear',
    isFavorite: false
  }
]

export const useProductStore = defineStore('product', {
  state: () => ({
    // products 초기 세팅
    products: [...initialProducts],
    product: {},
    searchName: '',
  }),
  actions: {
    setSearchName(name){
      this.searchName = name
    },
    hasSearchName() {
      return this.searchName.trim() !== ''
    },
    setProducts(products) {
          this.products = products
    },
    setProduct(product) {
          this.product = product
    },
    resetProducts() {
      this.products = [...initialProducts]
    },
    loadProduct(productId) {
      const id = Number.parseInt(productId, 10)
      const foundProduct = this.products.find(p => p.id === id)
      if (foundProduct) {
        this.setProduct(foundProduct)
        return
      }

      // 상세 페이지를 새로고침해서 products 가 비어있는 경우를 대비한 fallback
      const fallback = initialProducts.find(p => p.id === id)
      if (fallback) {
        this.setProduct(fallback)
      }
    }
  }
})  