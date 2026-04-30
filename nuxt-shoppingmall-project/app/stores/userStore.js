import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: '',
            username: '',
            rememberMe: false
        },
        accessToken: null,
        
    }),
    actions: {
        login(user){
            this.user = user
            this.accessToken = 'mocked-access-token'
        },
        logout() {
            this.user = {
            id: '',
            username: '',
            rememberMe: false
            }
            this.accessToken = null;
        },
        hasAuthenticated() {
            console.log('accessToken:', this.accessToken)
            return this.accessToken !== null
        }
    }
})