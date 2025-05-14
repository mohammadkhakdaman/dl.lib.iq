import { forwardRef, useState } from 'react';

export const Input = forwardRef(function Input({ type = 'text', value = null, className = '', containerClassName = '', isFocused = false, ...props }, ref) {
    const [newVal, setNewVal] = useState(value)

    return (
        <div className={"form-group mb-4 relative " + containerClassName}>
            <label className='label mb-1'> {props.required && <span className="require">*</span>}</label>

            <input
                {...props}
                type={type}
                className={'block w-full px-4 py-2 ps-40 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' + className}
                defaultValue={newVal}
                placeholder={props.placeholder || ''}
                onChange={(event) => { props.onChange(event) }}
            />

            <span class="input-label w-36 text-center absolute inset-y-0 right-0 flex justify-center items-center text-gray-500 bg-[#e9ecef] rounded-s" style={{ border: '1px solid #ced4da' }}>
                {props.label}
            </span>
            {
                props.error && <p className={props.classNameError ? props.classNameError : 'text-danger'}>
                    {props.error}
                </p>
            }
        </div>  
    );
});