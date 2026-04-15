import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: null,
            username: '',
        },
        accessToken: null,
        
    }),
    actions: {
        setUser(user){
            this.user = user
        },
        hasAuthenticated() {
            return this.accessToken !== null
        }
    }
})