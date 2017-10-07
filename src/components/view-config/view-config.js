class ViewConfig extends Polymer.Element {
  static get is () { return 'view-config'; }

  static get properties () {
    return {
      lineNumber: {
        type: Number,
        value: 0
      },
      responsed: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: 1
      },
      errorText: {
        value: String,
        notify: true
      },
      loading: {
        type: Boolean
      }
    };
  }

  getError (event) {
    if (event.detail.error.toString() === '[object ProgressEvent]') {
      this.errorText = 'Internet disconnected';
    } else {
      this.errorText = event.detail.error;
    }
    this.loading = true;
    this.responsed = true;
  }

  startLoader () {
    this.responsed = true;
  }

  endLoader () {
    this.responsed = false;
  }

  getNumber () {
    return ++this.lineNumber;
  }

  getClass (text) {
    let className;
    text === '{' || text === '}' ?
      className = 'one-step' :
      className = 'two-step';
    return className;
  }

}

window.customElements.define(ViewConfig.is, ViewConfig);
