import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPersistedState); // Enable persisted state plugin

export default pinia;
