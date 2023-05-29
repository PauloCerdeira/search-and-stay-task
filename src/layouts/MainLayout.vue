<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Search and Stay Task
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'List',
    caption: 'Paginated list of house rules.',
    icon: 'list',
    link: '/list'
  },
  {
    title: 'Show / Update / Delete',
    caption: 'Show, update and delete specific rules.',
    icon: 'search',
    link: '/show'
  },
  {
    title: 'Create',
    caption: 'Add new Rules',
    icon: 'add',
    link: '/create'
  },
  // {
  //   title: 'Update',
  //   caption: 'teste',
  //   icon: 'edit',
  //   link: '/update'
  // },
  // {
  //   title: 'Delete',
  //   caption: 'teste',
  //   icon: 'delete',
  //   link: '/delete'
  // },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
