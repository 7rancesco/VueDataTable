<script setup lang="ts">
    import {DataTableSchema} from './DataTableSchema';
    import TableLoading from './components/TableLoading.vue';

    import IconLeft from './components/IconLeft.vue';
    import IconRight from './components/IconRight.vue';

    import { ref, watch, computed } from 'vue';

    const cellWidth = ref<string>('0vw');
    const cWValue = ref<number>(0);
    const arrowNavigation = ref<boolean>(false);
    const columnsLength = ref<number>(4);


    interface Pagination {
        from: number, 
        to: number
    }
    const pagination = ref<Pagination[]>([]);


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

            if(DataTableSchema.perPage){
                const p = DataTableSchema.perPage;
                let i = 0;
                let ii = -1;
                for (let index = 0; index < DataTableSchema.tRows.length; index++) {
                    i++;
                    if(i === p){
                        i = 0;
                        ii++;
                        pagination.value.push({
                            from: p * ii,
                            to: index + 1
                        })
                    }
                }
                if(pagination.value[pagination.value.length - 1]){
                    const last = pagination.value[pagination.value.length - 1].to;
                    if(DataTableSchema.tRows.length !== last){
                        const ghosts = DataTableSchema.tRows.length - last;
                        pagination.value.push({
                            from: DataTableSchema.tRows.length - ghosts,
                            to: DataTableSchema.tRows.length
                        })
                    }
                }
                console.log(pagination.value)
            }

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
    const data = computed(() => {
        const p = DataTableSchema.perPage;
        if(p){
            const elements : any = [];
            DataTableSchema.tRows.forEach(element => {
                elements.push(element);
            });
            return elements.slice(
                pagination.value[paginationSelect.value].from, 
                pagination.value[paginationSelect.value].to
            );
        } else {
            return DataTableSchema.tRows;
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

</script>

<template>
    <div v-if="DataTableSchema.loading">
       <TableLoading></TableLoading>
    </div>
    <div v-else>
        <h1>{{DataTableSchema.title}}</h1>

        <div class="header_actions" style="margin-bottom: 10px;">

            <div class="h_action" v-for="action in DataTableSchema.headerActions">
                <button :style="`color:${action.colorText}; background:${action.colorBackground}`" @click="action.onClick()"> {{ action.text }} </button>
            </div>

            <div class="h_action" v-if="DataTableSchema.search">
                <input type="text" placeholder="Search">
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
            <button v-for="b, i in pagination" @click="setPagination(i)">{{ i + 1 }}</button>
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
        box-shadow: -0.5px -0.5px 0px 0.5px rgb(223, 225, 232) inset;
        background: linear-gradient(180deg, rgb(239, 241, 245), rgb(255, 255, 255));
        font-size: 1.2rem;
        justify-content: center;
    }
    .cell{
        box-shadow: -0.5px -0.5px 0px 0.5px rgb(202, 207, 213) inset;
    }

    .tRows_container:nth-child(even){
        background: linear-gradient(180deg, rgb(239, 241, 245), rgb(255, 255, 255));
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
        top: 35vh;
    }

    .arrow_navigation-lef{
        left: 0px;
    }
    .arrow_navigation-right{
        right: 0px;
    }

</style>