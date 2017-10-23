class LinterhubApp extends Polymer.Element {
  static get is () { return 'linterhub-app'; }
  static get properties () {
    return {
      page: {
        type: String,
        notify: true
      },
      subPage: {
        type: String,
        notify: true
      },
      userData: {
        type: Object,
        value: null
      },
      userRegistred: {
        type: Boolean,
        value: false
      },
      messageList: {
        type: Object,
        value: {}
      }
    };
  }

  ready () {
    super.ready();
    this.setUserViewConfig();
  }

  getLocalUserData (dataType) {
    const data = window.localStorage[dataType];
    return data ? JSON.parse(
      window.localStorage[dataType]
    ) : '';
  }

  setUserViewConfig () {
    this._checkUserData();
    this._checkMessageList();
  }

  _checkMessageList () {
    const messageList =
      this.getLocalUserData('messageList');
    if (messageList) {
      this.messageList = messageList;
    } else {
      this.messageList = {
        introMessage: true
      };
    }
  }

  _checkUserData () {
    const userData =
      this.getLocalUserData('userData');
    if (userData) {
      this.userData = userData;
      this.userRegistred = true;
      this.set('this.page', '/repos');
    }
  }

  _routePageChanged (page) {
    !page ? window.location.pathname = '/signin' :
      this.page = page;
  }

  _showPage404 () {
    this.page = 'view404';
  }

  static get observers () {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

}
window.customElements.define(LinterhubApp.is, LinterhubApp);
