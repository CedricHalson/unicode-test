interface Params {
    number: string
    name: string
    order: number
    parent: string
    children: Array<RequestModel>
}

export class RequestModel implements Params {
    number: string
    name: string
    order: number
    parent: string
    children: Array<RequestModel>

    protected constructor(params: Params) {
        this.number = params.number
        this.name = params.name
        this.order = params.order
        this.parent = params.parent
        this.children = params.children
    }

    public static createInstance(params: Params) {
        return new RequestModel({
            number: params.number,
            name: params.name,
            order: params.order,
            parent: params.parent,
            children: params.children,
        })
    }

    public get childCount() {
        const counter = (list: Array<RequestModel>): number => {
            let count = list.length

            list.forEach((el) => {
                if (el.children.length > 0) {
                    count += counter(el.children)
                }
            })

            return count
        }

        return counter(this.children)
    }

    public get childNames() {
        return this.children.map((el) => el.name).join(" / ")
    }

    public get isRootLevel() {
        return this.parent === undefined || this.parent === null
    }

    public get isFolder() {
        return this.children.isNotEmpty()
    }
}
