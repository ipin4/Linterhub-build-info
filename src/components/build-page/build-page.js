class BuildPage extends Polymer.Element {
  static get is () { return 'build-page'; }
  static get properties () {
    return {
      page: {
        type: String,
      },
      connected: {
        type: Boolean,
        value: false
      }
    };
  }

  static get observers () {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged (page) {
    this.page = page || '/build_process';
  }

  _showPage404 () {
    this.page = 'view404';
  }
}
window.customElements.define(BuildPage.is, BuildPage);
