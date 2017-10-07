class configBuilder extends Polymer.Element {
  static get is () { return 'config-builder'; }
  static get properties () {
    return {
        url: {
          type: String,
          observer: '_gotUrl'
        },
        ajaxContent: {
          type: Array,
          value: [],
          notify: true
        },
        response: {
          type: Object
        },
        userConfig: {
          type: Object,
          value: {
            name: '',
            options: {

            }
          }
        },
        itemsNumber: {
          type: Array,
          value: [],
          notify: true
        },
        counter: {
          type: Number,
          value: 0
        }
     };
  }

  _gotUrl () {
    this.$.setConfig.generateRequest();
  }

  _dataConverter () {
    this.userConfig.name = this.response.title.split(' ')[0];
    let obj = this.response.definitions.options.properties;
    let array = [];
    for (const index in obj) {
      let data = obj[index];
      if (index) {
        index !== '-version' ?
        data.key = index.replace('--', '') :
        data.key = index.replace('-', '');
      } else {
        data.key = 'path';
      }
      if (data.oneOf) {
        data.enum = data.oneOf[0].enum;
      }
      array.push(data);
    }
    this.ajaxContent = array.slice();
  }

  getDropdown (type) {
    return type ? true : false;
  }

  getSwitch (type) {
    return type === 'null' ? false : true;
  }

  getTextInput (type, notDropdown) {
    return type === 'string' && !notDropdown ? true : false;
  }

  getTextArray (type) {
    return type === 'array' ? true : false;
  }

  dropdownChanged (e) {
    const node = e.target;
    this.userConfig.options['--' + node.parentNode.label]
      = node.selectedItem.innerText;
  }

  checkboxChanged (e) {
    const node = e.target;
    if (node.checked) {
      node.innerHTML = 'null';
      this.userConfig.options['--' + node.name] = 'null';
    } else {
      node.innerHTML = '';
      delete this.userConfig.options['--' + node.name];
    }
  }

  inputChanged (e) {
    const node = e.target;
    if (!node.value || e.key === 'Tab') return;
    this.userConfig.options['--' + node.label] = node.value;
    if (node.value === '') {
      delete this.userConfig.options['--' + node.label];
    }
  }

  inputArrayChanged (e) {
    let node = e.target;
    if (!node.value || e.key === 'Tab') return;
    if (!this.userConfig.options['--' + node.label]) {
      this.userConfig.options['--' + node.label] = new Array();
    }
    this.userConfig.options['--' + node.label] = [];
    let allInputs = node.parentNode.parentNode.querySelectorAll('div.input-block');
    for (let index = 0; index < allInputs.length; index++) {
      this.userConfig.options['--' + node.label].push(allInputs[index].childNodes[1].value);
    }

  }

  addInput (e) {
    this.counter++;
    let indexName = 'input_' + this.counter;
    this.itemsNumber.push(indexName);
    this.$.inputArraySelector.select(indexName);
  }

  removeInput (e) {
    let node = e.target;
    let label = e.target.previousSibling.previousSibling.label;

    this.itemsNumber.forEach((element, elementIndex) => {
      if (element === node.parentNode.id) {
        if (this.userConfig.options['--' + label] !== undefined) {
          this.userConfig.options['--' + label].splice(elementIndex, 1);
        }
        this.itemsNumber.splice(elementIndex, 1);
        this.$.inputArraySelector.deselect(element);
      }
    });
    if (!this.userConfig.options['--' + label] ||
    !this.userConfig.options['--' + label][0]) {
      delete this.userConfig.options['--' + label];
    }
    let allInputs = node.parentNode.parentNode.querySelectorAll('div.input-block');
    for (let index = 0; index < allInputs.length - 1; index++) {
      if (this.userConfig.options['--' + label] !== undefined) {
        allInputs[index].childNodes[1].value = this.userConfig.options['--' + label][index];
      }
    }
  }

  getUserConfig () {
    console.log(this.userConfig);
  }

}
window.customElements.define(configBuilder.is, configBuilder);
