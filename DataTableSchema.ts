import { reactive } from "vue";

interface THead{
    title: string
}

interface Text {
    content: string
}

interface Button {
    text: string
    colorText: string,
    colorBackground: string,
    onClick: Function
}

interface TRow{
    formatText?: Text,
    formatButton?: Button
}

interface DataTable{
    title: string,
    tHead: THead[],
    tRows: TRow[][],
    loading: boolean,
    headerActions?: Button[],
    perPage?: number,
    search?: boolean,
    columnsLength?: number
}

export const DataTableSchema = reactive<DataTable>({
    title: '',
    tHead: [],
    tRows: [],
    loading: false
});