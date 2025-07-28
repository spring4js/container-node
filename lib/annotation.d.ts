import { HttpMethod } from './meta-utils';
import { Container } from "./container";
export declare function Service({ name }?: {
    name: string;
}): (target: any, key?: string | symbol, descriptor?: any) => void;
export declare function Resource({ name }?: {
    name: string;
}): (target: any, key?: string, descriptor?: any) => void;
export declare function createLazyResource(getContainer: () => Container): ({ name }?: {
    name: string;
}) => (target: any, propertyKey: string) => any;
export declare function PreStart(serviceNames?: string[]): (target: any, key: string, descriptor?: any) => void;
export declare function Controller(path?: string): (target: any, key?: string | symbol, descriptor?: any) => void;
export declare function Path(path: string, method: HttpMethod): (target: any, functionName: string, descriptor?: any) => void;
