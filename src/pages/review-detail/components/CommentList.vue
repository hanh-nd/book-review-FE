<template>
    <div class="comment-list-wrapper">
        <ElTree
            :data="commentListTree"
            node-key="_id"
            default-expand-all
            :expand-on-click-node="false"
        >
            <template #default="{ node, data }">
                <div class="comment-item">
                    <CommentItem :comment="node.data" />
                </div>
            </template>
        </ElTree>
    </div>
</template>
<script setup lang="ts">
import type { ICommentListTree } from '@/interfaces';
import { ElTree } from 'element-plus';
import CommentItem from './CommentItem.vue';

defineProps<{
    commentListTree: ICommentListTree[];
}>();
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
    :deep(.el-tree-node__content) {
        height: auto;
    }
}
</style>
