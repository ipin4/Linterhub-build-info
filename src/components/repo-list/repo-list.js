class RepoList extends Polymer.Element {
  static get is () { return 'repo-list'; }

  static get properties () {
    return {
      userData: {
        type: Object,
        value: {
          login: '',
          password: ''
        }
      },
    };
  }

  ready () {
    super.ready();
  }

}

window.customElements.define(RepoList.is, RepoList);
