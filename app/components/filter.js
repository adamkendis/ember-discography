import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FilterComponent extends Component {
  @tracked query = '';
  
  get placeholder() {
    return `Search by ${this.args.filterKey}`;
  }

  get results() {
    let { resources, filterKey } = this.args;
    let query = this.query;

    if (query) {
      resources = resources.filter(resource => {
        let normalized;
        if (typeof resource[filterKey]  === 'string') {
          normalized = resource[filterKey].toLowerCase();
          return normalized.includes(query.toLowerCase());
        } 
      })
    }
    return resources;
  }
}
