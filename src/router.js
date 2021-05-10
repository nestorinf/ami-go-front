import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      redirect: "dashboards/analytical",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        // Application
        {
          name: "Apps",
          path: "apps/chat",
          component: () => import("@/views/apps/chat/Chat"),
        },
        // Components
        {
          name: "Alerts",
          path: "components/alerts",
          component: () => import("@/views/components/Alerts"),
        },
        {
          name: "Avatar",
          path: "components/avatar",
          component: () => import("@/views/components/Avatar"),
        },
        {
          name: "Badge",
          path: "components/badge",
          component: () => import("@/views/components/Badge"),
        },
        {
          name: "Banner",
          path: "components/banner",
          component: () => import("@/views/components/Banner"),
        },
        {
          name: "Appbar",
          path: "components/appbar",
          component: () => import("@/views/components/Appbar"),
        },
        {
          name: "Toolbar",
          path: "components/toolbar",
          component: () => import("@/views/components/Toolbar"),
        },
        {
          name: "Systembar",
          path: "components/systembar",
          component: () => import("@/views/components/Systembar"),
        },
        {
          name: "BottomNavigation",
          path: "components/bottomnavigation",
          component: () => import("@/views/components/BottomNavigation"),
        },
        {
          name: "Bottomsheet",
          path: "components/bottomsheet",
          component: () => import("@/views/components/Bottomsheet"),
        },
        {
          name: "Breadcrumb",
          path: "components/breadcrumb",
          component: () => import("@/views/components/Breadcrumb"),
        },
        {
          name: "Buttons",
          path: "components/buttons",
          component: () => import("@/views/components/Buttons"),
        },
        {
          name: "Fab",
          path: "components/fab",
          component: () => import("@/views/components/Fab"),
        },
        {
          name: "Cards",
          path: "components/cards",
          component: () => import("@/views/components/Cards"),
        },
        {
          name: "Carousel",
          path: "components/carousel",
          component: () => import("@/views/components/Carousel"),
        },
        {
          name: "Chips",
          path: "components/chips",
          component: () => import("@/views/components/Chips"),
        },
        {
          name: "Dialogs",
          path: "components/dialogs",
          component: () => import("@/views/components/Dialogs"),
        },
        {
          name: "Dividers",
          path: "components/dividers",
          component: () => import("@/views/components/Dividers"),
        },
        {
          name: "Expansion Panel",
          path: "components/expansionpanel",
          component: () => import("@/views/components/ExpansionPanel"),
        },
        {
          name: "Footer",
          path: "components/footer",
          component: () => import("@/views/components/Footer"),
        },
        {
          name: "Sheet",
          path: "components/sheet",
          component: () => import("@/views/components/Sheet"),
        },
        {
          name: "Overflow Buttons",
          path: "components/overflow-buttons",
          component: () => import("@/views/components/OverflowButtons"),
        },
        {
          name: "Grids",
          path: "components/grids",
          component: () => import("@/views/components/Grids"),
        },
        {
          name: "Button Groups",
          path: "components/button-group",
          component: () => import("@/views/components/ButtonGroups"),
        },
        {
          name: "Chip Groups",
          path: "components/chip-group",
          component: () => import("@/views/components/ChipGroups"),
        },
        {
          name: "Item Groups",
          path: "components/item-group",
          component: () => import("@/views/components/ItemGroups"),
        },
        {
          name: "List Item Groups",
          path: "components/listitem-group",
          component: () => import("@/views/components/ListItemGroups"),
        },
        {
          name: "Slide Groups",
          path: "components/slide-group",
          component: () => import("@/views/components/SlideGroups"),
        },
        {
          name: "Windows",
          path: "components/windows",
          component: () => import("@/views/components/Windows"),
        },
        {
          name: "Hover",
          path: "components/hover",
          component: () => import("@/views/components/Hover"),
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/components/Icons"),
        },
        {
          name: "Images",
          path: "components/images",
          component: () => import("@/views/components/Images"),
        },
        {
          name: "Lists",
          path: "components/lists",
          component: () => import("@/views/components/Lists"),
        },
        {
          name: "Menus",
          path: "components/menus",
          component: () => import("@/views/components/Menus"),
        },
        {
          name: "Navigation Drawers",
          path: "components/navigation-drawers",
          component: () => import("@/views/components/NavigationDrawers"),
        },
        {
          name: "Overlay",
          path: "components/overlay",
          component: () => import("@/views/components/Overlay"),
        },
        {
          name: "Pagination",
          path: "components/pagination",
          component: () => import("@/views/components/Pagination"),
        },
        {
          name: "Parallex",
          path: "components/parallex",
          component: () => import("@/views/components/Parallex"),
        },
        {
          name: "Color Pickers",
          path: "components/color-pickers",
          component: () => import("@/views/components/ColorPickers"),
        },
        {
          name: "Date Pickers",
          path: "components/date-pickers",
          component: () => import("@/views/components/DatePickers"),
        },
        {
          name: "Time Pickers",
          path: "components/time-pickers",
          component: () => import("@/views/components/TimePickers"),
        },
        {
          name: "Progress Circular",
          path: "components/progress-circular",
          component: () => import("@/views/components/ProgressCircular"),
        },
        {
          name: "Progress Linear",
          path: "components/progress-linear",
          component: () => import("@/views/components/ProgressLinear"),
        },
        {
          name: "Rating",
          path: "components/rating",
          component: () => import("@/views/components/Rating"),
        },
        {
          name: "SkeletonLoaders",
          path: "components/skeleton-loaders",
          component: () => import("@/views/components/SkeletonLoaders"),
        },
        {
          name: "Snackbar",
          path: "components/snackbar",
          component: () => import("@/views/components/Snackbar"),
        },
        {
          name: "Sparkline",
          path: "components/sparkline",
          component: () => import("@/views/components/Sparkline"),
        },
        {
          name: "Steppers",
          path: "components/steppers",
          component: () => import("@/views/components/Steppers"),
        },
        {
          name: "Subheaders",
          path: "components/subheaders",
          component: () => import("@/views/components/Subheaders"),
        },
        {
          name: "Tabs",
          path: "components/tabs",
          component: () => import("@/views/components/Tabs"),
        },
        {
          name: "Timeline",
          path: "components/timeline",
          component: () => import("@/views/components/Timeline"),
        },
        {
          name: "Tooltips",
          path: "components/tooltips",
          component: () => import("@/views/components/Tooltips"),
        },
        {
          name: "Treeview",
          path: "components/treeview",
          component: () => import("@/views/components/Treeview"),
        },
        {
          name: "Colors",
          path: "style-animation/colors",
          component: () => import("@/views/style-animation/Colors"),
        },
        {
          name: "Content",
          path: "style-animation/content",
          component: () => import("@/views/style-animation/Content"),
        },
        {
          name: "Display",
          path: "style-animation/display",
          component: () => import("@/views/style-animation/Display"),
        },
        {
          name: "Elevation",
          path: "style-animation/elevation",
          component: () => import("@/views/style-animation/Elevation"),
        },
        {
          name: "Flex",
          path: "style-animation/flex",
          component: () => import("@/views/style-animation/Flex"),
        },
        {
          name: "Float",
          path: "style-animation/float",
          component: () => import("@/views/style-animation/Float"),
        },
        {
          name: "Spacing",
          path: "style-animation/spacing",
          component: () => import("@/views/style-animation/Spacing"),
        },
        {
          name: "Text",
          path: "style-animation/text",
          component: () => import("@/views/style-animation/Text"),
        },
        {
          name: "Typography",
          path: "style-animation/typography",
          component: () => import("@/views/style-animation/Typography"),
        },
        {
          name: "Transitions",
          path: "style-animation/transitions",
          component: () => import("@/views/style-animation/Transitions"),
        },
        {
          name: "ProgrammaticScrolling",
          path: "style-animation/scroll",
          component: () => import("@/views/style-animation/Scroll"),
        },
        {
          name: "ApexCharts",
          path: "charts/apexcharts",
          component: () => import("@/views/charts/apexcharts/ApexCharts"),
        },
        {
          name: "Analytical",
          path: "dashboards/analytical",
          component: () => import("@/views/dashboards/analytical/Analytical"),
        },
        {
          name: "Classic",
          path: "dashboards/classic",
          component: () => import("@/views/dashboards/classic/Classic"),
        },
        {
          name: "Demographical",
          path: "dashboards/demographical",
          component: () =>
            import("@/views/dashboards/demographical/Demographical"),
        },
        {
          name: "Minimal",
          path: "dashboards/minimal",
          component: () => import("@/views/dashboards/minimal/Minimal"),
        },
        {
          name: "Overview",
          path: "dashboards/overview",
          component: () => import("@/views/dashboards/overview/Overview"),
        },
        {
          name: "Ecommerce",
          path: "dashboards/ecommerce",
          component: () => import("@/views/dashboards/ecommerce/Ecommerce"),
        },
        {
          name: "FullCalendar",
          path: "apps/fullcalendar",
          component: () => import("@/views/apps/fullcalendar/FullCalendar"),
        },
        {
          name: "Ecommerce-shop",
          path: "apps/shop",
          component: () => import("@/views/apps/ecommerce/Listing"),
        },
        {
          name: "Contact",
          path: "apps/contact",
          component: () => import("@/views/apps/contact/Contact"),
        },
        {
          name: "ContactList",
          path: "apps/contact-list",
          component: () => import("@/views/apps/contact-list/ContactList"),
        },
        {
          name: "ContactGrid",
          path: "apps/contact-grid",
          component: () => import("@/views/apps/contact-grid/ContactGrid"),
        },
        {
          name: "Email",
          path: "apps/email/inbox",
          component: () => import("@/views/apps/email/Email"),
          children: [
            {
              path: "/apps/email/:mailType",
              name: "MailIndex",
              component: () => import("@/views/apps/email/EmailList.vue"),
            },
            {
              path: "/apps/email/:mailType/0/:uuid",
              name: "MailDetail1",
              component: () => import(`@/views/apps/email/EmailDetail.vue`),
            },
            {
              path: "/apps/email/0/:mailTag",
              name: "MailTag",
              component: () => import("@/views/apps/email/EmailList.vue"),
            },
            {
              path: "/apps/email/0/:mailTag/0/:uuid",
              name: "MailDetail",
              component: () => import(`@/views/apps/email/EmailDetail.vue`),
            },
          ],
        },
        {
          name: "Todo",
          path: "apps/todo",
          component: () => import("@/views/apps/todo/Todo"),
        },
        {
          name: "FEAutocompletes",
          path: "form-elements/FEautocompletes",
          component: () => import("@/views/form-elements/FEAutocompletes"),
        },
        {
          name: "FECombobox",
          path: "form-elements/FECombobox",
          component: () => import("@/views/form-elements/FECombobox"),
        },
        {
          name: "FEFileInputs",
          path: "form-elements/FEFileInputs",
          component: () => import("@/views/form-elements/FEFileInputs"),
        },
        {
          name: "FEInputs",
          path: "form-elements/FEInputs",
          component: () => import("@/views/form-elements/FEInputs"),
        },
        {
          name: "FEOverflowButtons",
          path: "form-elements/FEOverflowButtons",
          component: () => import("@/views/form-elements/FEOverflowButtons"),
        },
        {
          name: "FESelectionControls",
          path: "form-elements/FESelectionControls",
          component: () => import("@/views/form-elements/FESelectionControls"),
        },
        {
          name: "FESelects",
          path: "form-elements/FESelects",
          component: () => import("@/views/form-elements/FESelects"),
        },
        {
          name: "FESliders",
          path: "form-elements/FESliders",
          component: () => import("@/views/form-elements/FESliders"),
        },
        {
          name: "FETextareas",
          path: "form-elements/FETextareas",
          component: () => import("@/views/form-elements/FETextareas"),
        },
        {
          name: "FETextfields",
          path: "form-elements/FETextfields",
          component: () => import("@/views/form-elements/FETextfields"),
        },
        {
          name: "FLFormAction",
          path: "form-layouts/FLFormAction",
          component: () =>
            import("@/views/form-layouts/form-action/FLFormAction"),
        },
        {
          name: "FLFormBasic",
          path: "form-layouts/FLFormBasic",
          component: () =>
            import("@/views/form-layouts/form-basic/FLFormBasic"),
        },
        {
          name: "FormWizard",
          path: "form-layouts/FormWizard",
          component: () =>
            import("@/views/form-layouts/form-wizard/FormWizard"),
        },
        {
          name: "DragnDrop",
          path: "extra-components/DragnDrop",
          component: () =>
            import("@/views/extra-components/drag-n-drop/DragnDrop"),
        },
        {
          name: "FLFormHorizontal",
          path: "form-layouts/FLFormHorizontal",
          component: () =>
            import("@/views/form-layouts/form-horizontal/FLFormHorizontal"),
        },
        {
          name: "TableSimple",
          path: "tables/TableSimple",
          component: () => import("@/views/tables/table-simple/TableSimple"),
        },
        {
          name: "TableDataIterators",
          path: "tables/TableDataIterators",
          component: () =>
            import("@/views/tables/table-data-iterators/TableDataIterators"),
        },
        {
          name: "TableDatatable",
          path: "tables/TableDatatable",
          component: () =>
            import("@/views/tables/table-data-table/TableDatatable"),
        },
        {
          name: "FormValidation",
          path: "form-layouts/FormValidation",
          component: () =>
            import("@/views/form-layouts/form-validation/FormValidation"),
        },
        {
          name: "MaterialIcons",
          path: "icons/MaterialIcons",
          component: () => import("@/views/icons/MaterialIcons"),
        },
        {
          name: "ThemifyIcons",
          path: "icons/ThemifyIcons",
          component: () => import("@/views/icons/ThemifyIcons"),
        },
        {
          name: "FontAwesomeIcons",
          path: "icons/FontAwesomeIcons",
          component: () => import("@/views/icons/FontAwesomeIcons"),
        },
        {
          name: "SimpleLineIcons",
          path: "icons/SimpleLineIcons",
          component: () => import("@/views/icons/SimpleLineIcons"),
        },
      ],
    },

    {
      path: "/authentication",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
      children: [
        {
          name: "BoxedLogin",
          path: "boxedlogin",
          component: () => import("@/views/authentication/BoxedLogin"),
        },
        {
          name: "FullLogin",
          path: "fulllogin",
          component: () => import("@/views/authentication/FullLogin"),
        },
        {
          name: "BoxedRegister",
          path: "boxedregister",
          component: () => import("@/views/authentication/BoxedRegister"),
        },
        {
          name: "FullRegister",
          path: "fullregister",
          component: () => import("@/views/authentication/FullRegister"),
        },
        {
          name: "Error",
          path: "error",
          component: () => import("@/views/authentication/Error"),
        },
      ],
    },
    {
      path: "*",
      component: () => import("@/views/authentication/Error"),
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
