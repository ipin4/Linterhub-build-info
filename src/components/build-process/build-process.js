class BuildProcess extends Polymer.Element {
  static get is () { return 'build-process'; }
  static get properties () {
    return {
      subPage: {
        type: String,
        notify: true
      },
      subroute: {
        type: Object,
        notify: true,
        observer: '_subroteChanged'
      },
      connected: {
        type: Boolean,
        value: false
      }
    };
  }

  _subroteChanged () {
      if (this.subroute.prefix === '/create_config' ||
          this.subroute.prefix === '/view3') return;
      if (this.subroute.path !== null) {
          this.subPage = this.subroute.path;
          this._pageChanged();
      }
  }

  _pageChanged () {
    if (!this.subroute.path) this.subPage = '/job-log';
    this._updateRequest(this.subPage);
  }

  _updateRequest (subPage) {
    if (subPage === '/job-log') {
      this.connected = true;
      this.$.jobLog.resetTemplate();
      this.$.jobLog.$.buildWebSocket.generateRequest();
    }
    if (subPage === '/view-config') {
      this.$.viewConfig.errorText = '';
      this.$.viewConfig.$.configAjax.generateRequest();
    }
  }

  _showPage404 () {
    this.page = 'view404';
  }
}
window.customElements.define(BuildProcess.is, BuildProcess);
