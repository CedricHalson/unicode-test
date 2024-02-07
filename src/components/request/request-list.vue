<template>
    <div class="request-list">
        <request-item
            v-for="item in data.requests"
            :key="item.number"
            :item="item"
            :drag-active="data.dragging"
            @drag="onDrag"
            @drag-end="onDragEnd"
            @drop="onDrop"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"

import requestItem from "./request-item.vue"
import { RequestModel } from "@/models/request-model"

const data = reactive({
    requests: [] as Array<RequestModel>,
    dragging: false,
})

const initData = () => {
    data.requests = [
        RequestModel.createInstance({
            number: "1",
            name: "Mastercard",
            order: 1,
            parent: "",
            children: [
                RequestModel.createInstance({
                    number: "1.1",
                    name: "Mastercard (Standart)",
                    order: 1,
                    parent: "1",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "1.2",
                    name: "Mastercard (World)",
                    order: 2,
                    parent: "1",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "1.3",
                    name: "Mastercard (Platinum)",
                    order: 3,
                    parent: "1",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "1.4",
                    name: "Mastercard (Gold)",
                    order: 4,
                    parent: "1",
                    children: [
                        RequestModel.createInstance({
                            number: "1.4.1",
                            name: "Gold +",
                            order: 1,
                            parent: "1.4",
                            children: [],
                        }),
                        RequestModel.createInstance({
                            number: "1.4.2",
                            name: "Gold +1",
                            order: 2,
                            parent: "1.4",
                            children: [
                                RequestModel.createInstance({
                                    number: "1.4.2.1",
                                    name: "Gold +1 Ultra",
                                    order: 1,
                                    parent: "1.4.2",
                                    children: [],
                                }),
                                RequestModel.createInstance({
                                    number: "1.4.2.2",
                                    name: "Gold +1 Deluxe",
                                    order: 2,
                                    parent: "1.4.2",
                                    children: [],
                                }),
                                RequestModel.createInstance({
                                    number: "1.4.2.3",
                                    name: "Gold +1 Platinum",
                                    order: 3,
                                    parent: "1.4.2",
                                    children: [],
                                }),
                            ],
                        }),
                        RequestModel.createInstance({
                            number: "1.4.3",
                            name: "Gold +2",
                            order: 3,
                            parent: "1.4",
                            children: [],
                        }),
                    ],
                }),
            ],
        }),
        RequestModel.createInstance({
            number: "2",
            name: "вклады",
            order: 2,
            parent: "",
            children: [
                RequestModel.createInstance({
                    number: "2.1",
                    name: "Максимал фойда (Нац. валюта)",
                    order: 1,
                    parent: "2",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "2.2",
                    name: "On-line (Нац. валюта)",
                    order: 2,
                    parent: "2",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "2.3",
                    name: "Аванс (Нац. валюта)",
                    order: 3,
                    parent: "2",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "2.4",
                    name: "Максимал фойда (Ин. валюта)",
                    order: 4,
                    parent: "2",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "2.5",
                    name: "On-line (Ин. валюта)",
                    order: 5,
                    parent: "2",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "2.6",
                    name: "Аванс (Ин. валюта)",
                    order: 6,
                    parent: "2",
                    children: [],
                }),
            ],
        }),
        RequestModel.createInstance({
            number: "3",
            name: "Кредиты",
            order: 3,
            parent: "",
            children: [
                RequestModel.createInstance({
                    number: "3.1",
                    name: "Ипотека",
                    order: 1,
                    parent: "3",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "3.2",
                    name: "Микрозайм",
                    order: 2,
                    parent: "3",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "3.3",
                    name: "Потребительский Кредит",
                    order: 3,
                    parent: "3",
                    children: [],
                }),
                RequestModel.createInstance({
                    number: "3.4",
                    name: "Yashil Makon",
                    order: 4,
                    parent: "3",
                    children: [],
                }),
            ],
        }),
    ]
}

const onDrag = () => {
    data.dragging = true
}

const onDragEnd = () => {
    data.dragging = false
}

const onDrop = (
    draggedItemId: string,
    dropped: RequestModel,
    parent?: RequestModel,
) => {
    const list: Array<RequestModel> = parent ? parent.children : data.requests

    const draggedIndex = list.findIndex((el) => el.number === draggedItemId)
    if (draggedIndex > -1) {
        const draggedItem = list.splice(draggedIndex, 1)[0]

        // moved up
        // else moved down
        if (draggedItem.order > dropped.order) {
            list.forEach((el) => {
                if (el.order >= dropped.order && el.order < draggedItem.order) {
                    el.order++
                }
            })
            draggedItem.order = dropped.order - 1
        } else {
            list.forEach((el) => {
                if (el.order > draggedItem.order && el.order <= dropped.order) {
                    el.order--
                }
            })
            draggedItem.order = dropped.order + 1
        }
        list.push(draggedItem)

        list.sort((a, b) => a.order - b.order)
    }
}

onMounted(() => {
    initData()
})
</script>

<style lang="sass">
.request-list
    padding: 16px 0

    display: flex
    flex-direction: column
    gap: 4px

    overflow: hidden
</style>
