<template>
    <div class="default-layout">
        <div class="container">
            <slot />
        </div>
    </div>
</template>

<style lang="sass">
.default-layout
    display: flex
    justify-content: center

    padding: 32px 0

    width: 100%
    height: 100%
    min-height: 100vh
</style>
