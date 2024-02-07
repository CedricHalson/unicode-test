<template>
    <div class="request-badge">
        <span>
            {{ props.text }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        default: "0",
    },
})
</script>

<style lang="sass">
.request-badge
    height: 20px
    min-width: 30px
    border-radius: 30px

    text-align: center
    font-size: 12px
    font-weight: 500
    color: white
    padding: 2px 4px

    overflow: hidden
    position: relative

    &::before
        content: ""
        display: block
        width: 100%
        height: 100%
        background: var(--ocean)
        opacity: 0.3
        position: absolute
        top: 0
        left: 0

    span
        position: relative
        z-index: 2
</style>
