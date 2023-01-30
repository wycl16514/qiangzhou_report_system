export default class LoginService {
    static myInstance = null;
    static ERR_NO_LOGIN_INFO = -1
    static ERR_LOGIN_TOKEN_INVALID = -2
    static ERR_LOGIN_SUCCESS = 0
    observers = []
    loginInfo = null
    storageStr = 'loginInfo'
    static getInstance() {
        if (LoginService.myInstance === null) {
            LoginService.myInstance = new LoginService()
        }

        return this.myInstance;
    }

    setLoginInfo(loginInfo) {
        if (!loginInfo) {
            return
        }

        localStorage.setItem(this.storageStr, JSON.stringify(loginInfo))
        this.notifyLogin(loginInfo)
    }

    getLoginInfo() {
        const loginInfo = localStorage.getItem(this.storageStr)
        return loginInfo === null ? null : JSON.parse(loginInfo)
    }

    notifyLogin(loginInfo) {
        if (!loginInfo) {
            return
        }

        for (const observer of this.observers) {
            observer.notifyLogin(loginInfo)
        }
    }

    addLoginObserver(observer) {
        console.log('call addLoginObserver for : ', observer)
        if (observer && observer.notifyLogin) {
            this.observers.push(observer)
        }
    }



}