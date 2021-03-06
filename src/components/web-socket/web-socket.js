class WebSocketElement extends Polymer.Element {
  static get is () { return 'web-socket'; }
  static get properties () {
    return {
      _socket: {
        type: Object,
        observer: '_setListeners'
      },
      url: {
        type: String
      },
      message: {
        type: String
      },
      notResponse: {
        type: Number,
        value: 0
      },
      timer: Object
    };
  }

  ready () {
    super.ready();
    this.closeConnection();
    this.openConnection();
  }

  openConnection () {
    this._socket = new WebSocket(this.url);
  }

  closeConnection () {
    if (this._socket) {
      this._socket.close();
      this._socket = null;
    }
  }

  _setListeners () {
    const that = this;
    if (this._socket !== undefined && this._socket !== null) {
      this._socket.onclose = this._onClosed.bind(this);
      this._socket.onerror = this._onError.bind(this);
      this._socket.onopen = this._onOpen.bind(this);
      this._socket.onmessage = this._onResponse.bind(this);
    }
  }

  generateRequest () {
    if (this._socket === undefined || this._socket.readyState === 0) {
      setTimeout(function (){
        generateRequest.call(this);
      }, 300);
    } else {
      this._socket.send(this.message);
      this._onSend();
    }
  }

  _onOpen () {
    const data = 'Server was opened';
    this.dispatchEvent(new CustomEvent('open', {detail: data}));
  }

  _onResponse (event) {
    clearInterval(this.timer);
    const data = JSON.parse(event.data);
    this.dispatchEvent(new CustomEvent('response', {detail: data}));
  }

  _onError (event) {
    clearInterval(this.timer);
    const data = 'Server is do not respond';
    this.dispatchEvent(new CustomEvent('error', {detail: data}));
  }

  _onClosed (event) {
    const data = event;
    this.dispatchEvent(new CustomEvent('close', {detail: data}));
  }

  _onSend (){
    this.notResponse = 0;
    const that = this;
    const data = 'Try send message';
    this.timer = setInterval(function (){
      if (that.notResponse > 5) {
        that._onError();
      }
      else {
        that.notResponse++;
        that.openConnection();
      }
    }, 1000);
    this.dispatchEvent(new CustomEvent('send', {detail: data}));
  }

}
window.customElements.define(WebSocketElement.is, WebSocketElement);
