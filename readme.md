# 使用方法
## 服务注册
```typescript
@Service()
export default class ActionService {
    
}
```
## 服务引用
- @Resource引用
```typescript
@Service()
export default class ActionService {
    @Resource() private profileService: ProfileService
}
```
- 通过container获取
```typescript
const profileService = await container.getServiceInstance<ProfileService>(ProfileService);
```
## Controller

## 项目中添加依赖
- reflect-metadata
- lodash
- tslib

## ts配置

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 使用方式、
## 初始化 reflect-metadata
需要在代码入口处 import 'reflect-metadata'
## 初始化容器
```typescript
const container = new Container();
const dirList = [
    path.resolve(__dirname, 'controller'),
    path.resolve(__dirname, 'service'),
    path.resolve(__dirname, 'access'),
];
for (const dir of dirList) {
    const jsFileList: string[] = await glob(['**/*.js'], {
        cwd: dir,
    });
    for (const jsFile of jsFileList) {
        const obj: any = require(path.join(dir, jsFile));
        // @ts-ignore
        if (!isObject(obj) || !isObject(obj.default)) {
            continue;
        }
        // @ts-ignore
        const clazz = <IServiceClazz>obj.default;
        clazz.jsFile = jsFile;
        container.registerServiceClazz(clazz);
    }
}
```
## 初始化Controller
```typescript
let router = new Router()
const container = getContainer()
let routerList = container.getRouterInfo()
for (let routerInfo of routerList) {
    let {httpMethod, requestPath, serviceName, functionName} = routerInfo
    logger.info(`注册路由 ${httpMethod} ${requestPath}`)
    let instance = await container.getServiceInstance(serviceName)
    // @ts-ignore
    router[httpMethod](requestPath, async (ctx: Context) => {
        try {
            // @ts-ignore
            const ret: any = await instance[functionName](ctx)
            if (ret != undefined) {
                ctx.body = {
                    code: 0,
                    data: ret,
                }
            }
        } catch (err: any) {
            if (err) {
                logger.error(err)
                const {
                    code = err.code || 500,
                    msg = err.message || err.msg || err.error || JSON.stringify(err),
                    data,
                } = err
                ctx.body = {
                    code,
                    msg,
                    data,
                }
            }
        }
    })
}
```
