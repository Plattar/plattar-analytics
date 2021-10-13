/**
 * Simple HTTP interaction module
 */
export default class BasicHTTP {
    public static execBeacon(path: string, data: any | null = null): Promise<any> {
        return new Promise<any>((accept, reject) => {
            try {
                const body = data || {};

                const headers = {
                    type: "application/json"
                };

                const blob: Blob = new Blob([JSON.stringify(body)], headers);

                const result: boolean = navigator.sendBeacon(path, blob);

                if (result) {
                    return accept({});
                }
                else {
                    return reject(new Error("BasicHTTP.execBeacon() - could not query request"));
                }
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    public static exec(protocol: string, path: string, data: any | null = null): Promise<any> {
        return new Promise<any>((accept, reject) => {
            try {
                const http: XMLHttpRequest = new XMLHttpRequest();
                http.open(protocol, path, true);
                http.setRequestHeader("Content-Type", "application/json");
                http.setRequestHeader("Accept", "application/json");

                http.onload = (e) => {
                    if (http.status === 200) {
                        if (http.response) {
                            try {
                                const resp: any = JSON.parse(http.response);
                                return accept(resp);
                            }
                            catch (_err) { /* silent */ }
                        }

                        return accept({});
                    }
                    else {
                        return reject(e);
                    }
                };

                http.onerror = (e) => {
                    return reject(e);
                };

                http.onprogress = (_e) => {
                    // empty
                };

                http.send(data ? JSON.stringify(data) : null);
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}