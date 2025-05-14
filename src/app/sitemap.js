// app/sitemap.ts
import appConfig from '@/config/appConfig'
import ApiService from '@/service/BaseApiService';
import { BookService } from '@/service/BookService';

const batchSize = 1000;
const locales = ['en', 'ar', 'fa'];

export async function generateSitemaps() {
    try {
        const res = await BookService.statistics();
        
        const totalBooks = res.data.bookCount;
        const numPages = Math.ceil(totalBooks / batchSize);
        const ret = Array.from({ length: numPages }, (_, i) => ({ id: i.toString() }));
        return ret;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getBookSitemapEntry = (book, locale) => {
    const entry = {
        url: `${appConfig.siteUrl}/${locale}/books/${book.bookId}`,
        lastModified: book.updateDate,
        alternates: {
            languages: locales.filter(x => x != locale).reduce((res, loc) => {
                res[loc] = `${appConfig.siteUrl}/${loc}/books/${book.bookId}`;
                return res;
            }, {})
        },
        priority: 0.8,
        changefreq: 'weekly'
    };
    return entry;
}

export default async function sitemap({ id }) {
    try {
        const offset = Number(id) * batchSize;

        //const booksres = await BookService.list({ offset, count: 1000 });
        //const books = booksres.data.resultList;
        const books = [...Array.from({ length: batchSize }, (_, i) => ({ 
            bookId: i + offset + 1, 
            updateDate: new Date().toISOString()
        }))];

        const entries = [];

        books.forEach(book => {
            locales.forEach(locale => entries.push(getBookSitemapEntry(book, locale)));
        });

        return entries;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}