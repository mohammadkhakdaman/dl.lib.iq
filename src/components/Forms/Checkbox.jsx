import { forwardRef } from 'react';

export const CheckBox = forwardRef(function Input({ checked=false, type = 'checkbox', className = '', value, containerClassName = 'col-xl-4 col-lg-4 col-4', isFocused = false, ...props }, ref) {
    // console.log(value, props?.defaultValue);
    return (
        <div className={containerClassName}>
            <input
                {...props}
                type={type}
                className={'checkbox-custom' + className}
                value={value}
                checked={value == props.defaultValue}
                // checked={checked}
                onChange={(value) => { props.onChange(value) }}
            />
            <label for={props.id} className='checkbox-custom-label'>{props.label} {props.required && <span className="require">*</span>}</label>

            {
                props.error && <p className={props.classNameError ? props.classNameError : 'text-danger'}>
                    {props.error}
                </p>
            }
        </div>
    );
});