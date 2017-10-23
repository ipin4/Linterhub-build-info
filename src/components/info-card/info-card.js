class InfoCard extends Polymer.Element {
  static get is () { return 'info-card'; }

  static get properties () {
    return {
      haveMessage: {
        type: Boolean,
        notify: true,
        value: true
      },
      messageList: {
        type: Object,
        notify: true,
        observer: 'checkList',
        value: {}
      }
    };
  }

  checkList () {
    let haveMessage = false;
    for (const key in this.messageList) {
      this.messageList[key] === true ?
        haveMessage = true : '';
    }
    this.haveMessage = haveMessage;
  }

  _closeMessage () {
    this.set('messageList.introMessage', false);
    window.localStorage.messageList =
      JSON.stringify(this.messageList);
    this.checkList();
  }

}

window.customElements.define(InfoCard.is, InfoCard);
