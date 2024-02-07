<template>
    <div class="request-item">
        <div
            class="request-item__border"
            v-if="isChildBorderVisislbe"
        />
        <div
            class="request-item__main"
            draggable="true"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDrop"
            :class="mainAreaCssCLass"
        >
            <div class="request-item__number">
                <div class="request-item__label text-ellipsis">№</div>
                <div class="request-item__value text-ellipsis">
                    {{ props.item.number }}
                </div>
            </div>
            <div class="request-item__name">
                <div class="request-item__label text-ellipsis">Название</div>
                <div class="request-item__value text-ellipsis">
                    <span
                        class="material-icons icon-yellow"
                        v-if="props.item.isFolder"
                    >
                        folder
                    </span>
                    <span
                        class="material-icons icon-grey"
                        v-else
                    >
                        description
                    </span>
                    {{ props.item.name }}
                </div>
            </div>
            <div class="request-item__order">
                <div class="request-item__label text-ellipsis">Очередность</div>
                <div class="request-item__value text-ellipsis">
                    {{ props.item.order }}
                </div>
            </div>
            <div
                class="request-item__childs"
                v-if="props.item.isFolder"
            >
                <div class="request-item__label text-ellipsis">
                    Подкатегории
                </div>
                <div class="request-item__value text-ellipsis">
                    {{ props.item.childNames }}
                </div>
            </div>
            <div class="request-item__actions">
                <request-badge
                    v-if="props.item.isFolder"
                    :text="props.item.childCount.toString()"
                />
                <request-expansion-btn
                    v-if="props.item.isFolder"
                    :active="data.expanded"
                    @click="onExpansionToggle"
                />
            </div>
        </div>
        <div
            class="request-item__children"
            v-if="isChildrenVisible"
        >
            <request-item
                v-for="child in props.item.children"
                :key="child.number"
                :item="child"
                :parent="item"
                :drag-active="dragActive"
                @drag="emitDrag"
                @drag-end="emitDragEnd"
                @drop="onChildDrop"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"

import { RequestModel } from "@/models/request-model"

import requestBadge from "./request-badge.vue"
import requestExpansionBtn from "./request-expansion-btn.vue"

const props = defineProps({
    item: {
        type: Object as () => RequestModel,
        required: true,
    },

    parent: {
        type: Object as () => RequestModel,
    },

    dragActive: {
        type: Boolean,
        default: false,
    },
})

const data = reactive({
    expanded: false,
})

const emit = defineEmits<{
    (ev: "drag"): void
    (ev: "dragEnd"): void
    (
        ev: "drop",
        draggedId: string,
        dropped: RequestModel,
        parent?: RequestModel,
    ): void
}>()

const mainAreaCssCLass = computed(() => ({
    folder: props.item.isFolder,
    dragging: dragData.dragging,
    "no-child-drag": props.dragActive,
    "drag-over": dragData.dragOver,
    "drop-to-top":
        props.item.order < dragData.dragedItemOrder && dragData.dragOver,
    "drop-to-bottom":
        props.item.order > dragData.dragedItemOrder && dragData.dragOver,
}))

const isChildBorderVisislbe = computed(() => {
    return !props.item.isRootLevel && props.item.order > 1
})

const isChildrenVisible = computed(() => {
    return props.item.isFolder && data.expanded
})

const onExpansionToggle = () => {
    data.expanded = !data.expanded
}

// drag and drop
const dragData = reactive({
    dragging: false,
    dragOver: false,

    dragedItemOrder: 0,
})

const emitDrag = () => {
    emit("drag")
}

const emitDragEnd = () => {
    emit("dragEnd")
}

const onDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("id", props.item.number)
    e.dataTransfer?.setData("order", props.item.order.toString())
    e.dataTransfer?.setData("parent", props.item.parent)
    data.expanded = false
    dragData.dragging = true
    emitDrag()
}

const onDragEnd = () => {
    dragData.dragging = false
    emitDragEnd()
}

const onDragEnter = (e: DragEvent) => {
    e.preventDefault()
    const parent = e.dataTransfer?.getData("parent")
    if (dragData.dragging || parent !== props.item.parent) return
    dragData.dragOver = true

    const order = Number.parseInt(e.dataTransfer?.getData("order") ?? "0")
    if (Number.isInteger(order)) {
        dragData.dragedItemOrder = order
    }
}

const onDragLeave = () => {
    dragData.dragOver = false
}

const onDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const onDrop = (e: DragEvent) => {
    onDragLeave()
    const draggedItemId = e.dataTransfer?.getData("id")
    const draggedItemParent = e.dataTransfer?.getData("parent")

    if (
        props.item.parent === draggedItemParent &&
        props.item.number !== draggedItemId &&
        draggedItemId
    ) {
        emit("drop", draggedItemId, props.item, props.parent)
    }
}

const onChildDrop = (
    draggedItemId: string,
    dropped: RequestModel,
    parent?: RequestModel,
) => {
    emit("drop", draggedItemId, dropped, parent)
}
</script>

<style lang="sass">
.request-item
    background: white
    border-radius: 12px

    display: flex
    flex-direction: column
    justify-content: center


.request-item-drop
    height: 82px
    border-radius: 12px
    border: 2px dashed var(--blue)
    background: var(--yellow)

.request-item__main
    display: flex
    align-items: center
    justify-content: flex-start
    padding: 16px 24px

    &.folder
        .request-item__name .request-item__value
            text-transform: uppercase
            font-weight: 700

        .request-item__name
            width: 300px
            min-width: 300px

    &.no-child-drag *
        pointer-events: none

    &.dragging
        position: relative

        &::after
            content: ""
            display: block
            width: 100%
            height: 100%
            border-radius: 12px

            position: absolute
            top: 0
            left: 0
            border: 2px dashed var(--blue)
            background: var(--light-blue)

    &.drag-over
        overflow: visible
        position: relative

        &::after
            content: ""
            display: none
            position: absolute
            width: calc( 100% - 24px )
            height: 2px
            background: var(--blue)
            left: 12px

    &.drop-to-top
        &::after
            display: block
            top: -3px

    &.drop-to-bottom
        &::after
            display: block
            bottom: -3px

.request-item__number
    width: 60px
    min-width: 60px

.request-item__name
    width: 400px
    min-width: 400px

    .request-item__value
        display: flex
        align-items: center
        gap: 6px

.request-item__order
    width: 100px
    min-width: 100px

.request-item__childs
    flex-grow: 1
    max-width: calc( 100% - 60px - 300px - 100px - 100px )

.request-item__actions
    width: 100px
    min-width: 100px
    flex-grow: 1

    display: flex
    align-items: center
    justify-content: flex-end
    gap: 8px

.request-item__name,
.request-item__order,
.request-item__childs
    padding: 0 8px

.request-item__label
    font-size: 12px
    font-weight: 500
    color: var(--text-grey)
    margin-bottom: 8px

.request-item__value
    font-size: 16px
    line-height: 20px
    font-weight: 500

    .material-icons
        font-size: 20px

    .icon-yellow
        color: var(--yellow)

    .icon-grey
        color: var(--icon-grey)

.request-item__children,
.request-item__border
    border-top: 1px solid #e1e1e1

.request-item__border
    width: calc( 100% - 48px )
    margin: 0 auto

.request-item__children .request-item__main
    &.drop-to-top
        &::after
            width: calc( 100% - 48px )
            left: 24px
            top: -2px

    &.drop-to-bottom
        &::after
            width: calc( 100% - 48px )
            left: 24px
            bottom: -2px
</style>
