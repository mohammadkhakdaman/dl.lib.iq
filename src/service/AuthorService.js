import appConfig from '@/config/appConfig';
import BaseApiService from './BaseApiService'

export const AuthorService = {
    search: async (data) => {
        return BaseApiService.post({
            baseURL: appConfig.apiBaseUrl,
            url: '/api/Authorities/AuthoritySearch',
            data
        });
    },
}