import { usePathname, useRouter } from 'next/navigation'
import Tools from './Tools';

export default function useFilter() {
    const pathname = usePathname()
    const router = useRouter();
    const { convertSearchParamsToDesiredFormat } = Tools();

    const simple = (field, value, reFetch = null, type = 'fetch') => {
        if ('URLSearchParams' in window) {
            var jsSearchParams = new URLSearchParams(window.location.search)

            value ? jsSearchParams.set(field, value) : jsSearchParams.delete(field)

            push_state(jsSearchParams, field, reFetch, type)

        } else {
            alert('your browser is oldest, please update it')
        }
    }


    const arrayfilter = (field = 'limit', type, value, refetch) => {
        if ('URLSearchParams' in window) {
            let jsSearchParams = new URLSearchParams(window.location.search);

            let existingData = jsSearchParams.get(field);

            if (!existingData) {
                existingData = [];
            } else {
                existingData = JSON.parse(existingData);
            }

            const existingTypeData = existingData.filter(item => (item.type == type && item.value == value));

            if (existingTypeData.length < 1) {
                existingData.push({ type, value });
            }

            jsSearchParams.set(field, JSON.stringify(existingData));

            push_state(jsSearchParams, field, refetch);
        } else {
            alert('Your browser is too old, please update it.');
        }
    };

    function push_state(params, field = null, reFetch = null, type = 'fetch') {

        var query = '?' + params.toString();

        if (field !== 'page') {
            query = query.replace(new RegExp("page=\\d+"), "")
        }

        query = query.replace("&&", "&").replace('?&', '?').replace('?,&', '?').replace('=,', '').replace(',,', ',')


        var newRelativePathQuery = pathname + query;

        window.history.pushState({}, "", newRelativePathQuery);

        if (type == 'fetch') {
            apply_filter(reFetch)
        }
    }


    const apply_filter = (reFetch = null) => {
        var jsSearchParams = new URLSearchParams(window.location.search)
        var query = '?' + jsSearchParams.toString()
        
        if(pathname.split('/')[2] == 'authors' || pathname.split('/')[2] == 'authorities'){
            router.push('/books' + query)
            return;
        }
        
        var data = convertSearchParamsToDesiredFormat(jsSearchParams)
        var newRelativePathQuery = pathname + query;
        reFetch ? reFetch(data) : router.push(newRelativePathQuery);
    }

    const remove_filter = (field, reFetch, type = null, value = null) => {
        var jsSearchParams = new URLSearchParams(window.location.search)
        if (type == null) {
            jsSearchParams.set(field, '')
        } else {
            let existingData = jsSearchParams.get(field);

            if (existingData) {
                existingData = JSON.parse(existingData);
                const anotherData = existingData.filter(item => (item.value != value));

                jsSearchParams.set(field, JSON.stringify(anotherData));
            }
        }

        push_state(jsSearchParams, field, reFetch)
    }

    return { simple, arrayfilter, apply_filter, remove_filter };
}