<script>
import { HTTP } from '@/utils';
import CrudList from './CrudList';
import store from "../store"

export default {
  name: 'CrudDomainList',
  extends: CrudList,
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
            go: d => (alert(d.name)),
            icon: 'mdi-information',
          },
        ],
        paths: {
          list: 'domains/',
          create: 'domains/',
          delete: 'domains/:{name}/',
        },
        defaultObject: { name: '' },
        postcreate: d => (alert(`postcreate ${d.name}`)),
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
    try {
      store.commit('working');
      this.limit_domains = (await HTTP.get('auth/account/')).data.limit_domains;
    } catch (e) {
      this.error(e);
    } finally {
      store.commit('working', false);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
