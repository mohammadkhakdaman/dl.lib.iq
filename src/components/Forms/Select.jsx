import { forwardRef, useState } from 'react';

export const Select = forwardRef(function Input({ children, value = null, className = '', containerClassName = '', isFocused = false, ...props }, ref) {
    const [newVal, setNewVal] = useState(value)
    const margin = props?.margin || 'my-4'
    return (
        <div className={"relative " + containerClassName + margin}>
            {
                props?.label && <label className='input-label line-clamp-1 w-36 text-center absolute inset-y-0 right-0 flex justify-center items-center text-gray-500 bg-[#e9ecef] rounded-s' style={props.labelStyle ? props.labelStyle : { border: '1px solid #ced4da' }}>{props.label} {props.required && <span className="require">*</span>}</label>
            }

            <select
                {...props}
                className={'block cursor-pointer w-full ps-40 bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' + className}
                defaultValue={newVal}
                placeholder={props.placeholder || ''}
                onChange={(event) => { props.onChange(event) }}
            >
                {children}
            </select>
            {
                props.error && <p className={props.classNameError ? props.classNameError : 'text-danger'}>
                    {props.error}
                </p>
            }
        </div>
    );
});
