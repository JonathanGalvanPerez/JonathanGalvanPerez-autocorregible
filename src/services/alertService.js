import Swal from 'sweetalert2';

const success = (title, text, confirmButtonText = 'OK') => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText
    });
}

const error = (title, text, confirmButtonText = 'Volver') => {
    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText
    });
}

const confirm = async (title, text, confirmButtonText = 'Seguro', doneText = 'Hecho') => {
    return Swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else
            return false;
    })
}

const Alert = {
    success,
    error,
    confirm
}

export default Alert;