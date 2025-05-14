export default function Tools() {
    function toggleDropdown(el) {
        $(`[aria-labelledby = "${el}"]`).toggleClass('hidden transition')
    }

    function convertSearchParamsToDesiredFormat(searchParams) {
        let json = Array.from(searchParams);

        const processedJson = json.map(item => {
            if (item[1] === 'true') return [item[0], true];
            if (item[1] === 'false') return [item[0], false];
            if (item[1] === 'null') return [item[0], null];
            if (!isNaN(item[1])) return [item[0], parseInt(item[1])];
            return item;
        });

        const result = {};
        for (const [key, value] of processedJson) {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    result[key] = [];
                } else if (value[0] === '[' && value[value.length - 1] === ']') {
                    result[key] = JSON.parse(value);
                } else {
                    result[key] = value.split(',');
                }
            } else {
                result[key] = value;
            }
        }
        
        if (result.q === undefined || result.q === null || result.q === '' || result.q == NaN) {
            result.q = '';
        } 
        else {
            result.q = result.q.toString();
            if (result.q == 'NaN') {
                result.q = ''
            }
        }

        function removeCrotchets(obj) {
            if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    if (Array.isArray(obj[key]) && obj[key].length > 0 && obj[key][0] === '[' && obj[key][obj[key].length - 1] === ']') {
                        obj[key] = JSON.parse(obj[key]);
                    } else if (typeof obj[key] === 'string' && obj[key].startsWith('[') && obj[key].endsWith(']')) {
                        obj[key] = JSON.parse(obj[key]);
                    }
                }
            }
            return obj;
        }

        return removeCrotchets(result);
    }

    function toQueryString(params) {
        const encodeValue = (value) => {
            if (value && typeof value === 'object') {
                return encodeURIComponent(JSON.stringify(value));
            } else if (Array.isArray(value)) {
                return encodeURIComponent(JSON.stringify(value));
            }
            return encodeURIComponent(value);
        };

        return '?' + Object.keys(params).map(key => {
            const value = params[key];
            if (value === null) {
                return `${encodeURIComponent(key)}=null`;
            }
            return `${encodeURIComponent(key)}=${encodeValue(value)}`;
        }).join('&');
    }


    return {
        toggleDropdown,
        convertSearchParamsToDesiredFormat,
        toQueryString
    }
}