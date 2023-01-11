<template>
    <ElDropdown>
        <ElBadge :value="unreadNotifications">
            <ElButton>Thông báo</ElButton>
        </ElBadge>
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem v-for="notification in notificationList">
                    <div
                        class="dropdown-wrapper"
                        @click="onClickNotification(notification)"
                    >
                        <div class="content">
                            <ElTag type="danger" v-if="!notification.isRead">Unread</ElTag>
                            {{
                                `${notification.sender[0].username} vừa ${
                                    notification.action ===
                                    NotificationAction.COMMENT
                                        ? 'bình luận'
                                        : 'thích'
                                } ${
                                    notification.module ===
                                    NotificationModule.REVIEW
                                        ? 'bài viết'
                                        : 'bình luận'
                                } của bạn.`
                            }}
                        </div>
                        <div class="time">
                            {{ dayjs(notification.createdAt).fmDDMMYYYY() }}
                        </div>
                    </div>
                </ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>

<script setup lang="ts">
import { NotificationAction, NotificationModule, PageName } from '@/constants';
import type { INotification, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { notificationService } from '@/services/notification.api';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore<IStore>();
const notificationList = computed(
    () => store.state.notifications.notificationList
);
const unreadNotifications = computed(
    () =>
        store.state.notifications.notificationList.filter(
            (notification) => !notification.isRead
        ).length
);

const onClickNotification = (notification: INotification) => {
    notificationService.updateNotification(notification._id, {
        isRead: true,
    });
    router.push({
        name: PageName.REVIEW_DETAIL_PAGE,
        params: {
            id: notification.targetId,
        },
    });
    store.dispatch('notifications/getNotificationList');
};
</script>

<style lang="scss">
.el-scrollbar {
    max-height: 600px !important;
    overflow-y: auto !important;
}

.dropdown-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
