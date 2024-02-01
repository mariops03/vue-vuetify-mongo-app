import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    currentUser: null,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
  },
  actions: {
    updateUser(user) {
      if (user !== undefined) {
        this.currentUser = user;
        console.log(`Usuario actualizado en el store e${this.currentUser}`);
      } else {
        console.error('Se intentó almacenar un usuario no válido en el store');
      }
    },
  },
  persist: true,
});
