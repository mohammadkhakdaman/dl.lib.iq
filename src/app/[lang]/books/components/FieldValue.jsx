import { useMemo } from "react";

const FieldValue = ({title, value, className, titleClassName, valueClassName}) => {
    const displayVal = useMemo(() => {
        if(Array.isArray(value)) 
            return value.join(' - ');

        return value ?? '';
    }, [value])
  return (
    <div className={className}>
        <span className={`text-teal-600 ${titleClassName || ''}`}>{title}</span>
        <span className={`ms-1 text-gray-500 ${valueClassName}`}>{displayVal}</span>
    </div>
  )
}

export default FieldValue;