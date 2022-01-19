import React from 'react'
import { toast } from 'react-toastify';

export function setToast(message, type) {

    if (type === 'warn') {
        return toast.warn(message)
    }
    else if (type === 'error') {
        return toast.error(message)
    }
    else if (type === 'success') {
        return toast.success(message)
    }
    else if (type === 'info') {
        return toast.info(message)
    }
    else {
        return toast(message)
    }
}


export function copyText(message, entryText) {
    navigator.clipboard.writeText(entryText);
    return setToast(message, "success")
}


