<script setup lang="ts">
    import {DataTableSchema} from './DataTableSchema';
    import TableLoading from './components/TableLoading.vue';

    import IconLeft from './components/IconLeft.vue';
    import IconRight from './components/IconRight.vue';

    import { ref, watch, computed } from 'vue';

    import {SearchIn} from './lib/SearchIn';

    const cellWidth = ref<string>('0vw');
    const cWValue = ref<number>(0);
    const arrowNavigation = ref<boolean>(false);
    const columnsLength = ref<number>(4);


    interface Pagination {
        from: number, 
        to: number
    }
    const pagination = ref<Pagination[]>([]);

    const createPagination = ( array : Object[]) => {
        pagination.value = [];
        if (DataTableSchema.perPage) {
            if(array.length > 1){
                const p = DataTableSchema.perPage;
                let i = 0;
                let ii = -1;
                for (let index = 0; index < array.length; index++) {
                    i++;
                    if (i === p) {
                        i = 0;
                        ii++;
                        pagination.value.push({
                            from: p * ii,
                            to: index + 1
                        })
                    }
                }
                if (pagination.value[pagination.value.length - 1]) {
                    const last = pagination.value[pagination.value.length - 1].to;
                    if (array.length !== last) {
                        const ghosts = array.length - last;
                        pagination.value.push({
                            from: array.length - ghosts,
                            to: array.length
                        })
                    }
                }
            } else {
                pagination.value.push({
                    from: 0,
                    to: 1
                })
            }

        }
    }


    watch(
        () => DataTableSchema.tHead, 
        (h) => {
            let l = h.length;
            if(DataTableSchema.columnsLength){
                columnsLength.value = DataTableSchema.columnsLength;
            }
            if(l > columnsLength.value){
                l = columnsLength.value;
                arrowNavigation.value = true;
            }
            cellWidth.value = `${96 / l}vw`;
            cWValue.value = 96 / l;

            createPagination(DataTableSchema.tRows);

        }
    )

    const getAllElements = () => {
        const elementsHead = document.querySelectorAll('.head');
        const elementsCell = document.querySelectorAll('.cell');
        const elements = [...elementsHead, ...elementsCell];
        return elements
    }

    const left = ref<number>(0);
    const moveToRight = () => {
        if(left.value !== (cWValue.value *( columnsLength.value - DataTableSchema.tHead.length))){
            left.value = left.value - cWValue.value;
            getAllElements().forEach(element => {
                element as HTMLElement;
                element.setAttribute('style', `transform: translateX(${left.value}vw)`);
            });            
        }
    }

    const moveToLeft = () => {
        if(left.value < 0){
            left.value = left.value + cWValue.value;
            getAllElements().forEach(element => {
                element as HTMLElement;
                element.setAttribute('style', `transform: translateX(${left.value}vw)`);
            });
        }
    }

    const paginationSelect = ref<number>(0);
    const inputSearch = ref<string>(); 
    const data = computed(() => {

        const p = DataTableSchema.perPage;
        if(p){
            const elements : any = [];

            if(inputSearch.value){
                SearchIn(inputSearch.value, DataTableSchema.tRows)?.forEach(element => {
                    elements.push(element);
                });
                createPagination(elements);
                setPagination(paginationSelect.value)

            } else {
                DataTableSchema.tRows.forEach(element => {
                    elements.push(element);
                });
                createPagination(elements);
                setPagination(paginationSelect.value)
            }
            return elements.slice(
                pagination.value[paginationSelect.value].from, 
                pagination.value[paginationSelect.value].to
            );
        } else {
            if(inputSearch.value){
                return SearchIn(inputSearch.value, DataTableSchema.tRows)
            } else {
                return DataTableSchema.tRows;
            }
        }

    });

    const setPagination = (n : number) => {
        paginationSelect.value = n;
        setTimeout(() => {
            getAllElements().forEach(element => {
                element as HTMLElement;
                element.setAttribute('style', `transform: translateX(${left.value}vw)`);
            });
        }, 100);
    }

    const getCount = () => {
        if(DataTableSchema.perPage){
            return pagination.value[pagination.value.length - 1].to;
        } else {
            return DataTableSchema.tRows.length
        }
    }

</script>

<template>
    <div v-if="DataTableSchema.loading">
       <TableLoading></TableLoading>
    </div>
    <div v-else>
        <h1>{{DataTableSchema.title}}</h1>

        <div class="header_actions" style="margin-bottom: 10px;">

            <div class="h_action">
                {{ getCount()}} elements
            </div>

            <div class="h_action" v-for="action in DataTableSchema.headerActions">
                <button :style="`color:${action.colorText}; background:${action.colorBackground}`" @click="action.onClick()"> {{ action.text }} </button>
            </div>

            <div class="h_action" v-if="DataTableSchema.search">
                <input class="search_input" type="text" placeholder="Search" v-model="inputSearch">
            </div>

        </div>

        <div class="tHead_container">
            <div v-for="heead in DataTableSchema.tHead" class="head">
                <div style="padding-left: 3px;">
                    {{ heead.title }}
                </div>
            </div>
        </div>
        <div class="table_container">
            <div v-for="row in data" class="tRows_container">
                <div v-for="cell, i in row" class="row">
                    <div class="cell">

                        <div v-if="cell.formatText" class="cellText"> 
                            {{ cell.formatText.content }} 
                        </div>

                        <div v-if="cell.formatButton" class="cellButton">
                            <button :style="`color:${cell.formatButton.colorText}; background:${cell.formatButton.colorBackground}`" @click="cell.formatButton.onClick()"> {{ cell.formatButton.text }} </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="pagination_container" v-if="DataTableSchema.perPage">
            <button v-for="b, i in pagination" @click="setPagination(i)"
                :class="i === paginationSelect ? 'page_button page_button_select' : 'page_button'"
            >{{ i + 1 }}</button>
        </div>

        <div v-if="arrowNavigation && left < 0" class="arrow_navigation-left" @click="moveToLeft()">
            <IconLeft></IconLeft>
        </div>
        <div v-if="arrowNavigation && left !== (cWValue *( columnsLength - DataTableSchema.tHead.length))" class="arrow_navigation-right" @click="moveToRight()">
            <IconRight></IconRight>
        </div>
    </div>
</template>

<style scoped>

    .table_container{
        max-height: 50vh;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .tHead_container, 
    .tRows_container, 
    .header_actions, 
    .pagination_container{
        display: flex;
        width: 96vw;
        justify-content: start;
        align-items: center;
        margin-left: 2vw;
    }

    .header_actions{
        justify-content: end;
        column-gap: 10px;
    }
    .pagination_container{
        justify-content: end;
        column-gap: 10px;
        margin-top: 10px;
    }

    .head, .cell{
        min-width: v-bind(cellWidth);
        max-width: v-bind(cellWidth);
        display: flex;
        justify-content: start;
        align-items: center;
        min-height: 6vh;
        max-height: 6vh;
    }

    .head{
        box-shadow: -0.5px -0.5px 0px 0.5px var(--border) inset;
        background: rgba(39, 48, 61, 0.199);
        font-size: 1.2rem;
        justify-content: center;
    }
    .cell{
        box-shadow: -0.5px -0.5px 0px 0.5px var(--border) inset;
    }

    .tRows_container:nth-child(even){
        background: rgba(67, 77, 91, 0.099);
    }

    .cellText{
        font-size: 1rem;
        padding-left: 10px;
    }

    .cellButton{
        width: 100%;
        text-align: center;
    }

    .cellButton > button, .h_action > button {
        border: none;
        border-radius: 5px;
        padding: 5px 8px 5px 8px;
        font-size: 0.7rem;
    }

    .cellButton > button:hover, .h_action > button{
        cursor: pointer;
    }

    .arrow_navigation-left,
    .arrow_navigation-right{
        position: fixed;
        top: 17.8vh;
    }

    .arrow_navigation-lef{
        left: 0px;
    }
    .arrow_navigation-right{
        right: 0px;
    }

    .page_button{
        min-width: 25px;
        min-height: 25px;
        border-radius: 5px;
        border: none;
        background: rgba(239, 240, 244, 0.106);
        color: var(--color)
    }

    .page_button:hover{
        cursor: pointer;
    }

    .page_button_select{
        background: var(--color);
        color: white;
    }

    .search_input{
        height: 4vh;
        width: 15vw;
        border-radius: 5px;
        border: solid 1px var(--border);
        color: var(--color);
        background: transparent;
        font-size: 19px;
    }

</style>