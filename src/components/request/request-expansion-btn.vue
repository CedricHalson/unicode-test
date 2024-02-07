<template>
    <button
        class="request-expansion-btn"
        :class="cssClass"
        @click="onClick"
    >
        <span class="material-icons"> {{ iconName }} </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
})

const iconName = computed(() => {
    if (props.active) {
        return "expand_less"
    }
    return "expand_more"
})

const cssClass = computed(() => ({
    active: props.active,
}))

const emit = defineEmits<{
    (ev: "click"): void
}>()

const onClick = () => {
    emit("click")
}
</script>

<style lang="sass">
.request-expansion-btn
    border: 1px solid var(--blue)
    background: var(--blue)
    color: white
    border-radius: 12px
    cursor: pointer

    width: 32px
    height: 32px

    display: flex
    align-items: center
    justify-content: center

    transition: all 0.3s ease-in-out

    &.active
        background: var(--light-blue)
        color: var(--blue)
</style>
