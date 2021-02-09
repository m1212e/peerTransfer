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
 * object of the incoming connection
 */
export const connectedRemoteClientIncoming = writable<Peer.DataConnection>(undefined);
/**
 * object of the outgoing connection
 */
export const connectedRemoteClientOutgoing = writable<Peer.DataConnection>(undefined);
/**
 * currently loading
 */
export const loading = writable<boolean>(true);
/**
 * currently loading
 */
export const recievedFiles = writable<File[]>([]);

const blockedUsers = []


let peerClient = new Peer(makeid(9));

peerClient.on('open', () => {
    connectedToServer.set(true);
    loading.set(false);
    ownID.set(peerClient.id);
})

peerClient.on('connection', (connection) => {

    if (get(connectedRemoteClientIncoming) != undefined
        || blockedUsers.some(id => connection.peer == id)) {
        connection.close()
    } else {
        connectedRemoteClientIncoming.set(connection)
        if (get(connectedRemoteClientOutgoing) == undefined) {
            console.log('called');
            startConnectionWith(connection.peer)
        }
    }
})

peerClient.on('error', () => {
    console.error('Client errored, trying again...');
    connectedToServer.set(false);
    connectedRemoteClientIncoming.set(undefined)
    connectedRemoteClientOutgoing.set(undefined)
    ownID.set(undefined)

    //retry
    setTimeout(() => {
        peerClient = new Peer(makeid(9));
    }, 3000);
})

peerClient.on('disconnected', () => {
    connectedToServer.set(false);
    ownID.set(undefined)
    connectedRemoteClientIncoming.set(undefined)
    connectedRemoteClientOutgoing.set(undefined)
})

export function startConnectionWith(id: string) {
    if (id == get(ownID)) {
        throw 'You can\'t create a connection with yourself!'
    }

    loading.set(true);

    const conn = peerClient.connect(id)
    connectedRemoteClientOutgoing.set(conn)

    conn.on('open', () => {
        loading.set(false);
    })

    conn.on('data', (data) => {
        recievedFiles.set(get(recievedFiles).concat(data))
    })

    conn.on('close', () => {
        connectedRemoteClientIncoming.set(undefined)
    })

    conn.on('error', () => {
        connectedRemoteClientIncoming.set(undefined)
    })
}

export function endCurrentConnection() {
    get(connectedRemoteClientIncoming)?.close()
    get(connectedRemoteClientOutgoing)?.close()
    connectedRemoteClientIncoming.set(undefined)
    connectedRemoteClientOutgoing.set(undefined)
}

export function blockUser(id: string) {
    blockedUsers.push(id)
}

export function sendFiles(files: File[]){
    get(connectedRemoteClientOutgoing).send(files)
}