/**
 * Simple HTTP interaction module
 */
export default class BasicHTTP {
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

                http.send(data ? JSON.stringify(data) : null);
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}