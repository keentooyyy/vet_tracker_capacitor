import { defineStore } from 'pinia';

export const petStore = defineStore('petStore', {
    state: () => ({
        pets: [],
    }),
    actions: {
        setPets(pets) {
            this.pets = pets;
        },
    },
    getters: {
        getPets() {
            return this.pets;
        },
    },
});
