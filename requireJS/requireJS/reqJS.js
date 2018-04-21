/**
 * 模仿requireJS
 */
let req, def
(function (global) {
    let globalModules = {} //全局导出的模块
    let mid = 0 //模块id
    const IS_MAIN_ENTRY = true

    //模块的三种状态
    const RESOLVE = 'RESOLVE'
    const REJECT = 'REJECT'
    const PENDING = 'PENDING'
    /**
     * @param deps {Array} 依赖模块
     */
    req = (deps, callback, errback) => {
        if (!Array.isArray(deps)) {
            throw new Error('第一个参数必须是数组')
        }
        if (typeof callback !== 'function') {
            throw new Error('第二个参数必须是函数')
        }
        if (errback && typeof errback != 'function') {
            throw new Error('第三个参数必须是函数')
        }
        deps.forEach(module => loadModule(module))
        moduleEvent.listen(JSON.parse(JSON.stringify(deps)), callback, errback)
    }
    def = (name, deps, callback) => {
        if (typeof name === 'function' && !deps && !callback) {
            //只传callback
            callback = name
            name = undefined
            deps = undefined
        } else if (typeof name === 'string' && typeof deps === 'function') {
            //只传名字和callback
            callback = deps
            deps = undefined
        } else if (Array.isArray(name) && typeof deps === 'function') {
            //只穿依赖和callback
            callback = deps
            deps = name
            name = undefined
        } else {
            throw new Error('The argument for define function is wrong')
        }
        let src = getCurrentScriptSrc()
        if (!name) {
            name = getModuleNameFromSrc(src)
        }
        let module = {
            src,
            name,
            cb: callback,
            id: ++mid
        }
        globalModules[name] = module
        if (deps) {
            deps.forEach(dep => loadModule(dep))
        } else {
            module.exports = callback()
        }
    }

    //使用观察者模式监听各个模块的加载情况
    let moduleEvent = {
        /**
         * 存储各个模块所对应的成功和失败函数
         */
        events:{},

        /**
         * 存储各模块的加载情况
         */
        state:{},

        listen(deps,callback,errback){
            deps.forEach(dep=>{
                if(!this.state[dep]){
                    this.state[dep]=PENDING
                }
            })
            let modulesName=deps.join('&')
            if(!this.events[modulesName]){
                this.events[modulesName]={}
            }
            let modulesEvent=this.events[modulesName]

            //成功和失败分别注册
            if(!modulesEvent.successFns){
                modulesEvent.successFns=[]
            }
            modulesEvent.successFns.push(callback)
            // (modulesEvent.successFns||(moduleEvent.successFns=[])).push(callback)
            if(!modulesEvent.failFns){
                modulesEvent.failFns=[]
            }
            if(errback){
                modulesEvent.failFns.push(errback)
            }
            modulesEvent.done=false
        },
        /**
         * 触发单个模块的状态改变
         */
        trigger(moduleName,moduleState){
            this.state[moduleName]=moduleState;
            this.triggerModulesState()
        },
        /**
         * 触发依赖模块集合的事件
         */
        triggerModulesState(){
            for(let key in this.events){
                let modules=this.events[key]

                if(modules.done) continue

                let res=judgeModulesState(key,this.state)
                if(res===RESOLVE){
                    //所有module ready
                    let arg=[]
                    key.split('&').forEach(k=>arg.push(globalModules[k].exports))
                    modules.successFns.forEach(successFn=>successFn.apply(this,arg))
                    modules.done=true
                }else if(res===REJECT){
                    //有module失败了
                    modules.failFns.forEach(failFn=>failFn())
                    modules.done=true
                }else if(res===PENDING){

                }
            }
        }       
    }
    /**
     * 判断依赖模块组合的加载情况
     * @param {String} key 依赖模块组合名
     * @param {Object} modules 各个模块的状态对象
     */
    function judgeModulesState(key,modules){
        for(let modulesName of key.split('&')){
            if(modules[modulesName]===REJECT){
                return REJECT
            }
            if(modules[modulesName]===PENDING){
                return PENDING
            }
        }
        return RESOLVE
    }
    /**
     * 加载模块
     * @param {String} moduleName 
     * @param {Boolean} isMainEntry true是main入口js,false是普通模块
     */
    function loadModule(moduleName,isMainEntry){
        let scriptNode=document.createElement('script');
        scriptNode.type='text/javascript'
        moduleName=getModuleNameFromSrc(moduleName)
        scriptNode.src=`./${moduleName}.js`
        scriptNode.onerror=()=>{
            if(!isMainEntry){
                moduleEvent.trigger(moduleName,REJECT)
            }
        }
        scriptNode.onload=()=>{
            console.log(`The script ${moduleName}.js is loaded`)
            if(!isMainEntry){
                moduleEvent.trigger(moduleName,RESOLVE)
            }            
        }
        document.body.appendChild(scriptNode)
    }

    function getModuleNameFromSrc(name) {
        if(!name){
            console.error('argument of getModuleNameFromSrc can not be undefined')
            return
        }
        let fileNameReg=/[^\\\/]*[\\\/]+/g
        return name.replace(fileNameReg,'').split('.')[0]
    }

    function getCurrentScriptSrc(params) {
        return document.currentScript.getAttribute('src')
    }
    /**
     * 加载主入口main.js
     */
    function loadMainEntryJS(){
        let scripts=document.getElementsByTagName('script')
        let requireScript=scripts[scripts.length-1]
        let mainScript=requireScript.getAttribute('data-main')
        if(!mainScript) return
        loadModule(mainScript,IS_MAIN_ENTRY)
    }

    loadMainEntryJS()
})()