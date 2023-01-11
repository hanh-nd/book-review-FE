<template>
    <div class="report-list-page-wrapper">
        <ReportList />
    </div>
</template>

<script setup lang="ts">
import type { IStore } from '@/interfaces';
import { useStore } from 'vuex';
import ReportList from '../../components/reports/ReportList.vue';

const store = useStore<IStore>();
store.dispatch('reports/getReportList');

</script>

<style lang="scss" scoped></style>
