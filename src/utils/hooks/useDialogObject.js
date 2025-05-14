import React, { useCallback, useRef, useState } from "react";

const useDialogObject = () => {
    const [isOpen, setOpen] = useState(false);
    const obj = useRef(null);

    const onClose = useCallback(() => {
        obj.current = null;
        setOpen(false);
    }, [])

    const open = useCallback((object) => {
        obj.current = object;
        setOpen(true);
    }, [])

    return {
        isOpen,
        open,
        onClose,
        object: obj.current
    }
}

export default useDialogObject;