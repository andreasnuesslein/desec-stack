<script>
import { HTTP, withWorking } from '@/utils';
import CrudList from './CrudList';
import DomainDetailsDialog from '@/views/Console/DomainDetailsDialog';

export default {
  name: 'CrudDomainList',
  extends: CrudList,
  components: {
    DomainDetailsDialog,
  },
  data() {
    const self = this;
    return {
        createable: true,
        updatable: false,
        destroyable: true,
        limit_domains: 0,
        headlines: {
          table: 'Domains',
          create: 'Create New Domain',
          destroy: 'Domain Deletion',
        },
        texts: {
          create: () => `You have ${self.availableCount} of ${self.limit_domains} domains left.`,
          destroy: d => (`Delete domain ${d.name}?`),
          destroyInfo: () => 'This operation will cause the domain to disappear from the DNS. It will no longer be reachable from the Internet.',
        },
        columns: {
          name: {
            text: 'Name',
            textCreate: 'Enter Domain Name',
            align: 'left',
            sortable: true,
            value: 'name',
            readonly: true,
            required: true,
            writeOnCreate: true,
            datatype: 'GenericText',
            searchable: true,
          },
          published: {
            text: 'Published',
            align: 'left',
            sortable: true,
            value: 'published',
            readonly: true,
            datatype: 'TimeAgo',
            searchable: false,
          },
        },
        actions: [
          {
            key: 'info',
            go: d => this.postcreate(d),
            icon: 'mdi-information',
          },
        ],
        paths: {
          list: 'domains/',
          create: 'domains/',
          delete: 'domains/:{name}/',
        },
        defaultObject: { name: '' },
        postcreate: d => this.showDomainInfo(d),
        async showDomainInfo(d) {
          if (d.keys === undefined) {
            const url = this.resourcePath(this.paths.delete, d, ':');
            await withWorking(this.error, () => HTTP
                .get(url)
                .then(r => d.keys = r.data.keys)
            );
          }
          let ds = d.keys.map(key => key.ds);
          ds = ds.concat.apply([], ds)
          this.extraComponentBind = {'name': d.name, 'ds': ds};
          this.extraComponentName = 'DomainDetailsDialog';
        },
        // rowclick(domain) { this.$router.push({ name: 'CrudDomain', params: { name: domain.name } }); },
    }
  },
  computed: {
    availableCount: function () {
      return this.limit_domains - this.rows.length;
    },
    available: function () {
      return this.availableCount > 0;
    }
  },
  async mounted() {
    const self = this;
    await withWorking(this.error, () => HTTP
        .get('auth/account/')
        .then(r => self.limit_domains = r.data.limit_domains)
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
