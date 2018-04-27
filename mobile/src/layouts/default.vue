<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Kings Award
          <div slot="subtitle">Kluge Kinder</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer 
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>
          <q-collapsible avatar="statics/boy-avatar.png" label="With avatar">
          <div>Some thing about you</div>
        </q-collapsible>
        
        </q-list-header>
        <q-item to="/home">
          <q-item-side icon="history" />
          <q-item-main label="News" sublabel="@home" />
        </q-item>
        <q-item to="/children">
          <q-item-side icon="face" />
          <q-item-main label="My kids" sublabel="" />
        </q-item>
        <q-item  to="/plays">
          <q-item-side icon="extension" />
          <q-item-main label="Play" sublabel="Discover winner" />
        </q-item>
        <q-item to="/awards">
          <q-item-side icon="grade" />
          <q-item-main label="Awards" sublabel="@Awards" />
        </q-item>
        <q-item to="/rankings">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Kings" sublabel="Who is the Qeen?" />
        </q-item>
        
        <q-item to="/profile">
          <q-item-side icon="settings" />
          <q-item-main label="Account" sublabel="Account" />
          
        </q-item>
         <q-item to="/tasks">
          <q-item-side icon="playlist add" />
          <q-item-main label="Tasks" sublabel="Tasks" />
          
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL
  }
};
</script>

<style>

</style>
