import { defineStore } from 'pinia';

export const apiStore = defineStore('user', {
    state: () => ({
        apiData: '',
    }),
    actions: {
        setApiData(apiData) {
            this.apiData = apiData;
        },
    },
    getters: {
        getApiData() {
            return this.apiData;
        },
    },
});
