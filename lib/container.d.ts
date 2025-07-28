import { HttpMethod } from './meta-utils';
export interface IServiceClazz {
    new (): any;
    jsFile?: string;
}
export interface ServiceNotFoundHandle {
    (serviceName: string): Promise<any>;
}
export interface Router {
    httpMethod: HttpMethod;
    requestPath: string;
    serviceName: string;
    functionName: string;
}
export declare class Container {
    private clazzMap;
    private instanceMap;
    private serviceNotFoundHandle?;
    constructor({ serviceNotFoundHandle }?: {
        serviceNotFoundHandle?: ServiceNotFoundHandle;
    });
    registerServiceClazz(clazz: IServiceClazz): void;
    getServiceInstanceSync<T>(serviceIdentifier: (new () => T) | string): T;
    getServiceInstance<T>(serviceIdentifier: (new () => T) | string): Promise<T>;
    getRouterInfo(): Router[];
    private createServiceInstance;
    private setServiceInstance;
    private hasServiceInstance;
    private getServiceClazz;
    hasServiceClazz(serviceName: string): boolean;
    private setServiceClazz;
}
