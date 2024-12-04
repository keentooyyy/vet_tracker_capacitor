import { defineStore } from 'pinia';

export const petTypeStore = defineStore('petType', {
    state: () => ({
        petTypes: '',
    }),
    actions: {
        setPetTypes(petTypes) {
            this.petTypes = petTypes;
        },
    },
    getters: {
        getPetTypes() {
            return this.petTypes;
        },
    },
});
