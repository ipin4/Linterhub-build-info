class UserPage extends Polymer.Element {
  static get is () { return 'user-page'; }

  static get properties () {
    return {
      userData: {
        type: Object,
        value: {
          login: '',
          password: ''
        },
        notify: true
      },
      isDisable: {
        type: Boolean,
        value: true,
        notify: true
      },
      userRegistred: {
        type: Boolean,
        value: false,
        notify: true
      }
    };
  }

  ready () {
    super.ready();
  }

  setValue (e) {
    this.userData[e.target.id] = e.target.value;
    this.isDisable =
      this.userData.login.length &&
      this.userData.password.length ?
        false : true;
  }

  submit (e) {
    window.localStorage.userData =
      JSON.stringify(this.userData);
    this.userRegistred = true;
    this.set('route.path', '/repos');
  }
}

window.customElements.define(UserPage.is, UserPage);
