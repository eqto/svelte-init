async function doOverride(method: string, url: string, signal: AbortSignal, body?: unknown): Promise<Response> {
    const req: RequestInit = { method: method }

    if (method == 'POST' && body != null) req.body = JSON.stringify(body)
    if (signal != null) req.signal = signal
    return new Promise(resolve => {
        fetch(url, req)
            .then(resp => {
                resp.json().then(resp => resolve(resp))
                    .catch(() => {
                        resolve({ status: resp.status, message: 'Invalid server response, ' + resp.statusText })
                    })
            }).catch(e => resolve({ status: 99, message: e }))
    })
}

export async function postOverride(url: string, signal: AbortSignal, body?: unknown): Promise<Response> {
    return doOverride('POST', url, signal, body)
}

export async function getOverride(url: string, signal: AbortSignal): Promise<Response> {
    return doOverride('GET', url, signal)
}

export async function post(url: string, body?: unknown): Promise<Response> {
    return doOverride('POST', url, null, body)
}

export async function get(url: string): Promise<Response> {
    return doOverride('GET', url, null, '')
}

export class Response {
    status = 0
    message = ''
    data?: unknown = null
}