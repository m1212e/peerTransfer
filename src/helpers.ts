import type {TransferredFile} from './interfaces/transferredFile';

export function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function saveFile(file: TransferredFile) {
    var blob = new Blob([file.data], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, file.name);
    }
    else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = file.name;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}