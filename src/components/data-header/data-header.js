class dataHeader extends Polymer.Element {
  static get is () { return 'data-header'; }

  static get properties () {
    return {
      statusText: {
        type: String,
        value: 'SUCSESS'
      }
    };
  }

  getError () {
    this.innerHTML === 'SUCSESS' ? this.innerHTML = 'ERROR' :
      this.innerHTML = 'SUCSESS';
    this.classList.toggle('error');
  }
}
window.customElements.define(dataHeader.is, dataHeader);
