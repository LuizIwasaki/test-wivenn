import axios from "axios";

interface IBackendConnectionConfig {
    backend_url: string;
}

// this function is exported and exposed by preload.js inside the public folder
declare var backendIp: (() => IBackendConnectionConfig) | undefined;

// if it doesn't exist, we are probably running in dev environment, so use localhost as default
export const api = axios.create({
    baseURL: (window as any).backendIp ? (backendIp as () => IBackendConnectionConfig)().backend_url : 'http://localhost:8000'
});