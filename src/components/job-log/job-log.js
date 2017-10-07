class JobLog extends Polymer.Element {
  static get is () { return 'job-log'; }
  static get properties () {
    return {
      lineNumber: {
        type: Number,
        value: 0
      },
      responsed: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      textHeaders: {
        type: Array,
        value: []
      },
      textSubHeaders: {
        type: Array,
        value: []
      },
      textConsole: {
        type: Array,
        value: []
      },
      errorText: {
        type: String,
        notify: true
      }
    };
  }

  startLoadData () {
    this.responsed = false;
  }

  getError (event) {
    event.type === 'closed' ?
      this.errorText = 'Server is do not respond' :
      this.errorText = event.detail;
    this.responsed = true;
  }

  getData (responseAnswer) {
    const data = responseAnswer.detail.text;
    data.is === 'done' ?
      this.responsed = true :
      this.responsed = false;
    if (data.is === 'header') {
      this.textHeaders.push(data);
      this.$.headerSelector.select(data);
    }
    if (data.is === 'subHeader') {
      this.textSubHeaders.push(data);
      this.$.subHeaderSelector.select(data);
    }
    if (data.is === 'text') {
      this.textConsole.push(data);
      this.$.textSelector.select(data);
    }
  }

  getSubHeader (subheaderRoot, headerRoot) {
    return subheaderRoot.currentHeader === headerRoot.header ? true : false;
  }

  getText (textRoot, subheaderRoot, headerRoot) {
    return textRoot.currentHeader === headerRoot.header &&
      textRoot.currentSubheader === subheaderRoot.subheader ? true : false;
  }

  resetTemplate () {
    this.lineNumber = 0;
    this.errorText = '';
    this.textHeaders = [];
    this.textSubHeaders = [];
    this.textConsole = [];
    this.$.headerSelector.clearSelection();
    this.$.subHeaderSelector.clearSelection();
    this.$.textSelector.clearSelection();
  }

  getNumber () {
    return ++this.lineNumber;
  }

  toggle (e) {
    let collapseElement = e.target.nextElementSibling;
    let rotateElement = e.target.childNodes[1];
    if (!collapseElement) {
      rotateElement = e.target;
      collapseElement = rotateElement.parentNode.nextElementSibling;
    }
    collapseElement.toggle();
    rotateElement.classList.toggle('rotation');
  }

}

window.customElements.define(JobLog.is, JobLog);
