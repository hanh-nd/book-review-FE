import type {
    IChat,
    IMessage,
    IGetChatListQuery,
    IGetMessageListQuery,
} from '@/interfaces';
import { chatService } from '@/services/chat.api';

export interface IChatState {
    chatList: IChat[];
    chatListCount: number;
    chatListQuery: IGetChatListQuery;
    selectedChat: IChat | null;

    messageList: IMessage[];
    messageListCount: number;
    messageListQuery: IGetMessageListQuery;
}
const state = (): IChatState => ({
    chatList: [],
    chatListCount: 0,
    chatListQuery: {
        page: 1,
        limit: 100,
        receiverId: '',
    },
    selectedChat: null,

    messageList: [],
    messageListCount: 0,
    messageListQuery: {
        page: 1,
        limit: 100,
    },
});

const getters = {
    chatList: (state: IChatState) => state.chatList,
    chatListCount: (state: IChatState) => state.chatListCount,
    chatListQuery: (state: IChatState) => state.chatListQuery,
    selectedChat: (state: IChatState) => state.selectedChat,

    messageList: (state: IChatState) => state.messageList,
    messageListCount: (state: IChatState) => state.messageListCount,
    messageListQuery: (state: IChatState) => state.messageListQuery,
};

const actions = {
    async getChatDetail(
        { commit, state }: { commit: any; state: IChatState },
        id: string
    ) {
        const response = await chatService.getChatDetail(id);
        if (response?.success) {
            commit('SET_SELECTED_CHAT', response?.data || {});
        } else {
            commit('SET_SELECTED_CHAT', {});
        }
    },

    async getChatList({ commit, state }: { commit: any; state: IChatState }) {
        const response = await chatService.getChatList(state.chatListQuery);
        if (response?.success) {
            commit('SET_CHAT_LIST', response?.data?.items);
            commit('SET_CHAT_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_CHAT_LIST', []);
            commit('SET_CHAT_LIST_COUNT', 0);
        }
    },

    setChatListQuery(
        {
            commit,
            state,
        }: {
            commit: any;
            state: IChatState;
        },
        query: IGetChatListQuery
    ) {
        commit('SET_CHAT_LIST_QUERY', {
            ...state.chatListQuery,
            ...query,
        });
    },

    async getMessageList(
        {
            commit,
            state,
        }: {
            commit: any;
            state: IChatState;
        },
        chatId: string
    ) {
        const response = await chatService.getMessageList(
            chatId,
            state.chatListQuery
        );
        if (response?.success) {
            commit('SET_MESSAGE_LIST', response?.data?.items);
            commit('SET_MESSAGE_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_MESSAGE_LIST', []);
            commit('SET_MESSAGE_LIST_COUNT', 0);
        }
    },

    setMessageListQuery(
        {
            commit,
            state,
        }: {
            commit: any;
            state: IChatState;
        },
        query: IGetMessageListQuery
    ) {
        commit('SET_MESSAGE_LIST_QUERY', {
            ...state.chatListQuery,
            ...query,
        });
    },
};

const mutations = {
    SET_CHAT_LIST(state: IChatState, chatList: IChat[]) {
        state.chatList = chatList;
    },
    SET_CHAT_LIST_COUNT(state: IChatState, chatListCount: number) {
        state.chatListCount = chatListCount;
    },
    SET_CHAT_LIST_QUERY(state: IChatState, chatListQuery: IGetChatListQuery) {
        state.chatListQuery = chatListQuery;
    },
    SET_SELECTED_CHAT(state: IChatState, chat: IChat) {
        state.selectedChat = chat;
    },

    SET_MESSAGE_LIST(state: IChatState, messageList: IMessage[]) {
        state.messageList = messageList;
    },
    SET_MESSAGE_LIST_COUNT(state: IChatState, messageListCount: number) {
        state.messageListCount = messageListCount;
    },
    SET_MESSAGE_LIST_QUERY(
        state: IChatState,
        messageListQuery: IGetChatListQuery
    ) {
        state.messageListQuery = messageListQuery;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
