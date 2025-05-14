import appConfig from '@/config/appConfig';
import BaseApiService from './BaseApiService'

export const BookService = {
    search: async (data) => {
        return BaseApiService.post({
            baseURL: appConfig.bookBaseUrl,
            url: '/BookSearch/BookAdvanceSearch',
            data
        });
    },

    searchInBook: async (data) => {
        return BaseApiService.post({
            baseURL: appConfig.bookBaseUrl,
            url: '/BookSearch/BookSearchInText',
            data
        });
    },

    list: async (data) => {
        return BaseApiService.post({
            baseURL: appConfig.bookBaseUrl,
            url: '/BookSearch/BookSearch',
            data
        });
    },

    statistics: async () => {
        return BaseApiService.get({
            baseURL: appConfig.bookBaseUrl,
            url: '/BookSearch/BookStatistics'
        })
    }
}