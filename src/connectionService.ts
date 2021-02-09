import Peer from 'peerjs';
import {makeid} from './helpers';
import {writable, get} from 'svelte/store';
/**
 * true if currently online
 */
export const connectedToServer = writable<boolean>(false);
/**
 * string with the users own id
 */
export const ownID = writable<string>(undefined);
/**
 * object of the connection
 */
export const connectedRemoteClient = writable<Peer.DataConnection>(undefined);
/**
 * currently loading
 */
export const loading = writable<boolean>(true);
/**
 * currently loading
 */
export const recievedFiles = writable<File[]>([]);

const blockedUsers = []

let id = localStorage.getItem('storedID')

if (id != undefined) {//TODO: invert ist nur für Debug
    id = makeid(9)
    localStorage.setItem('storedID', id)
}

let peerClient = new Peer(id);

peerClient.on('open', () => {
    connectedToServer.set(true);
    loading.set(false);
    ownID.set(peerClient.id);
})

peerClient.on('connection', (connection) => {

    if (get(connectedRemoteClient) != undefined
        || blockedUsers.some(id => connection.peer == id)) {
        connection.close()
    } else {
        configureRemoteConnection(connection)
    }
})

peerClient.on('error', () => {
    console.error('Client errored, trying again...');
    connectedToServer.set(false);
    connectedRemoteClient.set(undefined)
    ownID.set(undefined)

    //retry once with new id
    setTimeout(() => {
        const id = makeid(9)
        peerClient = new Peer(id);
        localStorage.setItem('storedID', id)
    }, 3000);
})

peerClient.on('disconnected', () => {
    connectedToServer.set(false);
    ownID.set(undefined)
    connectedRemoteClient.set(undefined)
})

export function startConnectionWith(id: string) {
    if (get(connectedRemoteClient) != undefined) {
        throw 'You already have an active connection!'
    }

    if (id == get(ownID)) {
        throw 'You can\'t create a connection with youself!'
    }
    const conn = peerClient.connect(id)
    configureRemoteConnection(conn)
}

function configureRemoteConnection(conn: Peer.DataConnection) {
    loading.set(true);
    connectedRemoteClient.set(conn)

    conn.on('open', () => {
        loading.set(false);
    })
    
    conn.on('data', (data) => {
        console.log(data);
        
        // recievedFiles.set(get(recievedFiles).concat(data))
    })
    
    conn.on('close', () => {
        connectedRemoteClient.set(undefined)
    })
    
    conn.on('error', () => {
        connectedRemoteClient.set(undefined)
    })
}

export function endCurrentConnection() {
    get(connectedRemoteClient)?.close()
    connectedRemoteClient.set(undefined)
}

export function blockUser(id: string) {
    blockedUsers.push(id)
}

export function sendFiles(files: File[]) {
    // get(connectedRemoteClient).send('hallooooo')
    get(connectedRemoteClient).send(files)
}