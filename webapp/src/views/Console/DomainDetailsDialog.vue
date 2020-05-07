<template>
  <v-dialog
    v-model="value"
    max-width="700px"
    persistent
    @keydown.esc="close"
  >
    <v-card>
      <v-card-title>
        <div class="title">
          Domain details for <b>{{ name }}</b>
        </div>
        <v-spacer />
        <v-icon @click.stop="close">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-divider />
      <v-alert
        :value="isNew"
        type="success"
      >
        Your domain <b>{{ name }}</b> has been successfully created!
      </v-alert>
      <v-card-text>
        <p>
          To properly secure your domain with DNSSEC, please forward the following information to your domain registrar:
        </p>
        <v-layout flex align-end>
          <div class="caption font-weight-medium">NS records</div>
          <!--v-spacer></v-spacer>
          <div v-if="copied != 'ns'">
            <v-icon
                    small
                    v-clipboard:copy="ns.join('\n')"
                    v-clipboard:success="() => (copied = 'ns')"
                    v-clipboard:error="() => (copied = '')"
            >mdi-content-copy</v-icon>
          </div>
          <div v-else>copied! <v-icon small>mdi-check</v-icon></div-->
        </v-layout>
        <pre
                class="mb-3 pa-3"
                v-clipboard:copy="ns.join('\n')"
                v-clipboard:success="() => (copied = 'ns')"
                v-clipboard:error="() => (copied = '')"
        >{{ ns.join('\n') }}</pre>

        <div v-if="ds.length > 0">
          <v-layout flex align-end>
            <div class="caption font-weight-medium">DS records</div>
            <!--v-spacer></v-spacer>
            <div v-if="copied != 'ds'">
              <v-icon
                      small
                      v-clipboard:copy="ds.join('\n')"
                      v-clipboard:success="() => (copied = 'ds')"
                      v-clipboard:error="() => (copied = '')"
              >mdi-content-copy</v-icon>
            </div>
            <div v-else>copied! <v-icon small>mdi-check</v-icon></div-->
          </v-layout>
          <pre
                  class="mb-3 pa-3"
                  v-clipboard:copy="ds.join('\n')"
                  v-clipboard:success="() => (copied = 'ds')"
                  v-clipboard:error="() => (copied = '')"
          >{{ ds.join('\n') }}</pre>
        </div>
        <div v-else>
          <div class="caption font-weight-medium">DS records</div>
          <p>(unavailable, please contact support)</p>
        </div>

        <p>Once your domain registrar processes this information, your deSEC DNS setup will be ready to use.</p>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          v-if="isNew"
          color="primary"
          outline
          @click.native="$emit('createAnotherDomain')"
        >
          Create another domain
        </v-btn>
        <v-btn
          color="primary"
          dark
          depressed
          @click.native="close"
        >
          {{ isNew ? 'Close and edit' : 'Close' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DomainDetailsDialog',
  props: {
    name: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    ds: {
      type: Array,
      required: true,
    },
    ns: {
      type: Array,
      default: () => ['ns1.desec.io', 'ns2.desec.org'],
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    copied: '',
  }),
  methods: {
    close() {
      this.$emit('input', false);
      this.copied = '';
    },
  },
};
</script>

<style scoped>
  .caption {
    text-transform: uppercase;
  }
  pre {
    background: lightgray;
    overflow: auto;
  }
</style>
