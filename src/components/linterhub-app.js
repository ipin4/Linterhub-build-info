class LinterhubApp extends Polymer.Element {
  static get is () { return 'linterhub-app'; }
  static get properties () {
    return {
      userData: {
        type: Object,
      },
      userRegistred: {
        type: Boolean
      },
      messageList: {
        type: Object,
        value: {
          introMessage: true
        }
      }
    };
  }

  ready () {
    super.ready();
    this.routePageChanged('/signin');
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
    }
  }

  _checkUserData () {
    const userData =
      this.getLocalUserData('userData');
    if (userData) {
      this.userData = userData;
      this.userRegistred = true;
      this.routePageChanged('/repos');
    }
  }

  routePageChanged (page) {
    this.set('route.path', page);
  }

  _showPage404 () {
    this.set('route.path', '/view404');
  }

}
window.customElements.define(LinterhubApp.is, LinterhubApp);
