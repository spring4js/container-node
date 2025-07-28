export interface ServiceInfo {
    serviceName: string;
    preStartInfo?: PreStartInfo;
    dependencyList: PropertyDependency[];
}
export interface RouterInfo {
    path: string;
    requestMapList: {
        path: string;
        method: HttpMethod;
        functionName: string;
    }[];
}
export interface PreStartInfo {
    functionName: string;
    type: DependencyType;
    names?: string[];
    fun?: () => string[];
}
export interface PropertyDependency {
    propertyName: string;
    type: DependencyType;
    fun?: () => string;
    name?: string;
}
export declare enum DependencyType {
    Name = "name",
    fun = "fun"
}
export interface IService {
    start(): Promise<void>;
}
export declare const DI_START_DEPENDENCY = "$di$start$dependency";
export declare const DiServiceInfoRegistry: Record<string, ServiceInfo>;
export declare const ControllerInfoRegistry: Record<string, RouterInfo>;
export declare function setServiceInfo(clazz: any, name?: string): void;
export declare function getServiceInfo(clazz: any): ServiceInfo;
export declare function setServiceDependencyByName(clazz: any, propertyName: string, serviceName: string): void;
export declare function setServiceDependencyByFun(clazz: any, propertyName: string, fun: () => string): void;
export declare function getDependencyList(clazz: any): PropertyDependency[];
export declare function setServicePreStartDependencyByNames(clazz: any, startFunctionName: string, dependencyList: string[]): void;
export declare function setServicePreStartDependencyByFun(clazz: any, startFunctionName: string, fun: () => string[]): void;
export declare function getServicePreStartInfo(clazz: any): PreStartInfo | undefined;
export declare enum HttpMethod {
    HEAD = "head",
    OPTIONS = "options",
    GET = "get",
    PUT = "put",
    PATCH = "patch",
    POST = "post",
    DELETE = "delete",
    ALL = "all"
}
export declare function setControllerInfo(clazz: any, path: string): void;
export declare function getControllerServiceNameList(): string[];
export declare function setRouterInfo(clazz: any, functionName: string, method: HttpMethod, path: string): void;
export declare function getRouterInfo(clazz: any): RouterInfo;
