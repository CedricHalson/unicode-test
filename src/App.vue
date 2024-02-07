<template>
    <default-layout>
        <page-title
            title="Список тем обращения и продуктов"
            tag-text="Найдено:"
            tag-value="3"
        />
        <request-list />
    </default-layout>
</template>

<script setup lang="ts">
import defaultLayout from "./layouts/default-layout.vue"
import pageTitle from "@/components/page-title.vue"
import requestList from "./components/request/request-list.vue"
</script>

<style lang="sass"></style>
