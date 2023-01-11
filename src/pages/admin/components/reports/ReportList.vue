<template>
    <div class="report-list-wrapper">
        <div class="report-item" v-for="report in reportList" :key="report._id">
            <ReportItem :report="report" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IStore } from '@/interfaces';
import { computed } from 'vue';
import { useStore } from 'vuex';
import ReportItem from './ReportItem.vue';

const store = useStore<IStore>();
const reportList = computed(() => store.state.reports.reportList);
</script>

<style lang="scss" scoped>
.report-list-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
