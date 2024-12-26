import { toast } from 'vue3-toastify';

function toastSuccess(message : string) {
    return toast.success(message);
}

function toastError(message : string) {
    return toast.error(message)
}

export {toastSuccess, toastError}