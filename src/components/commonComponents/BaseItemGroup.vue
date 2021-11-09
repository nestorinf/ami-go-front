<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    :active-class="`primary white--text`"
    v-if="permission"
  >
    <template v-slot:activator>
      <v-list-item-icon v-if="item.sicon" class="sicon">
        <v-icon v-text="item.sicon" />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <BaseItemSubGroup
        v-if="child.children"
        :key="`sub-group-${i}`"
        :item="child"
        class="second-dd"
      />

      <BaseItem v-else :key="`item-${i}`" :item="child" text />
    </template>
  </v-list-group>
</template>

<script>
// Utilities
import kebabCase from "lodash/kebabCase";

export default {
  name: "BaseItemGroup",

  inheritAttrs: false,

  props: {
    item: {
      type: Object,
      default: () => ({
        avatar: undefined,
        group: undefined,
        title: undefined,
        roles: undefined,
        children: [],
      }),
    },
    subGroup: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    children() {
      return this.item.children.map((item) => ({
        ...item,
        to: !item.to ? undefined : `${this.item.group}/${item.to}`,
      }));
    },
    roles() {
      return this.item.children.filter((child) => child.roles);
    },
    group() {
      return this.genGroup(this.item.children);
    },
    
    permission() {      
      if(this.item.roles!=undefined){
        const rolesAuthorized = sessionStorage.getItem("role_user");
        return rolesAuthorized.includes(this.item.roles);
      }else{
        return true;
      }

    },
  },

  methods: {
    genGroup(children) {
      return children
        .filter((item) => item.to)
        .map((item) => {
          const parent = item.group || this.item.group;
          let group = `${parent}/${kebabCase(item.to)}`;

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`;
          }

          return group;
        })
        .join("|");
    },
  },
};
</script>

<style>
</style>
