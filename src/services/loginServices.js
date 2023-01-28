export default class LoginService {
    static myInstance = null;
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