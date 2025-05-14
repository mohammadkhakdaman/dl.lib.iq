import appConfig from '@/config/appConfig';
import BaseApiService from './BaseApiService'

export const SubjectService = {
    search: async (data) => {
        return BaseApiService.post({
            baseURL: appConfig.apiBaseUrl,
            url: '/api/Authorities/AuthoritySearch',
            data
        });
    },

    topFourSubjects: async () => {
        const data = {
            "sortItem": 1,
            "offset": 0,
            "count": 4,
            "sortType": 0,
            "q": "",
            "authorityType": "Subject"
        };

        return BaseApiService.post({
            baseURL: appConfig.apiBaseUrl,
            url: '/api/Authorities/AuthoritySearch',
            data
        });
    },

    getBooksBySubject: async (subject, count) => {
        return BaseApiService.get({
            baseURL: appConfig.apiBaseUrl,
            url: `/api/book/listBooksBy/subject/1/${count}/${subject}`,
        });
    }
}