<template>
    <div class="page-title">
        <div class="page-title__text">
            {{ props.title }}
        </div>
        <div
            class="page-title__tag"
            v-if="isTagVisible"
        >
            {{ props.tagText }}
            {{ props.tagValue }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    tagText: {
        type: String,
        default: "",
    },

    tagValue: {
        type: String,
        default: "",
    },
})

const isTagVisible = computed(() => {
    if (
        typeof props.tagText === "string" &&
        typeof props.tagValue === "string"
    ) {
        return props.tagText.isNotEmpty() && props.tagValue.isNotEmpty()
    }
    return false
})
</script>

<style lang="sass">
.page-title
    display: flex
    align-items: center
    gap: 16px

.page-title__text
    font-size: 28px
    font-weight: 500

.page-title__tag
    background: white
    border-radius: 14px
    padding: 4px 10px
    font-size: 12px
    line-height: 20px
    font-weight: 500
    color: var(--blue)
</style>
