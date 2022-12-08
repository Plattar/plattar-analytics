import { Util } from "../util/util";

export class AnalyticsData {
    private readonly _map: Map<string, any>;

    constructor() {
        this._map = new Map<string, any>();

        this.push("source", "embed");
        this.push("pageTitle", document.title);
        this.push("pageURL", location.href);
        this.push("referrer", document.referrer);
        this.push("user_id", AnalyticsData._GetUserID());
    }

    public push(key: string, value: any): void {
        this._map.set(key, value);
    }

    public get(key: string): any {
        return this._map.get(key);
    }

    public get data(): any {
        return Object.fromEntries(this._map);
    }

    public get map(): any {
        return this._map;
    }

    private static _GetUserID(): string {
        const key: string = "plattar_user_id";
        let userID: string | null = null;

        try {
            userID = localStorage.getItem(key);
        }
        catch (err) {
            userID = Util.generateUUID();

            // try storing if just generated
            try {
                localStorage.setItem(key, userID);
            }
            catch (_err) {/* silent */ }
        }

        if (!userID) {
            userID = Util.generateUUID();

            // try storing if just generated
            try {
                localStorage.setItem(key, userID);
            }
            catch (_err) { /*silent */ }
        }

        return userID;
    }
}