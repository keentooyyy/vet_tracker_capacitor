<template>
  <teleport to="body">
    <div v-if="isOpen"
         class="bg-gray-500 bg-opacity-60 absolute top-0 h-screen w-full flex flex-col justify-center items-center">
      <div class="w-10/12 md:max-w-screen-sm">
        <div class="bg-gray-300 rounded-tl-md rounded-tr-md p-3">
          <div class="cursor-pointer text-[var(--main-color)] text-end" @click="closeModal">X</div>
        </div>
        <div class="bg-white py-5 px-3">
          <input
              v-model="inputValue"
              class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-full"
              :placeholder="placeholder"
              type="text">
        </div>
        <div class="bg-gray-300 rounded-bl-md rounded-br-md p-3 flex gap-x-5">
          <button
              class="text-sm outline outline-2 outline-[var(--main-color)] text-[var(--main-color)] rounded-full py-2 px-3 w-3/6"
              @click="handleSubmit">Submit
          </button>
          <button class="text-sm text-white bg-[var(--main-color)] rounded-full py-2 px-3 w-3/6" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "ReusableModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    placeholder: {
      type: String,
      default: "Enter your input"
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  emits: ['submit', 'close'],
  methods: {
    handleSubmit() {
      this.$emit("submit", this.inputValue);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
