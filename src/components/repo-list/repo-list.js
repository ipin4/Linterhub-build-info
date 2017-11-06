class RepoList extends Polymer.Element {
  static get is () { return 'repo-list'; }

  static get properties () {
    return {
      url: {
        type: String,
        value: ''
      },
      repoData: {
        type: Array,
        value: []
      },
      linterData: {
        type: Array,
        value: []
      },
    };
  }

  ready () {
    super.ready();
    this.beginFetchData('data/json/myrepos.json');
  }

  beginFetchData (url) {
    this.set('url', url);
    this.$.getRepoList.generateRequest();
  }

  getLintersList (repoId, linterId) {
    return repoId === linterId;
  }

  fetchIsDone (value) {

  }

  openRepoById (event) {

  }

  _loadingIsDone () {
    if (this.responseData[0].description) {
      const repoSelector = this.$.repoSelector;
      this.responseData.map(item => {
        this.repoData.push(item);
        repoSelector.select(item);
      });
      this.beginFetchData ('data/json/linterList.json');
    } else if (this.responseData[0].linterNames) {
      const linterSelector = this.$.linterSelector;
      this.responseData.map(item => {
        this.linterData.push(item);
        linterSelector.select(item);
      });
      this.fetchIsDone('done');
    }
  }

}

window.customElements.define(RepoList.is, RepoList);
