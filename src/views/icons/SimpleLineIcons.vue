<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row vs-justify="center">
      <v-col cols="12">
        <v-card class="mb-7">
          <v-card-text class="pa-5">
            <h3 class="card-title d-flex">Control Icons</h3>
            <v-row>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-user"></i> icon-user
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-people"></i> icon-people
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-user-female"></i> icon-user-female
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-user-follow"></i> icon-user-follow
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-user-following"></i> icon-user-following
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-user-unfollow"></i> icon-user-unfollow
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-login"></i> icon-login
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-logout"></i> icon-logout
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-emotsmile"></i> icon-emotsmile
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-phone"></i> icon-phone
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-call-end"></i> icon-call-end
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-call-in"></i> icon-call-in
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-call-out"></i> icon-call-out
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-map"></i> icon-map
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-location-pin"></i> icon-location-pin
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-direction"></i> icon-direction
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-directions"></i> icon-directions
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-compass"></i> icon-compass
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-layers"></i> icon-layers
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-menu"></i> icon-menu
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-list"></i> icon-list
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-options-vertical"></i> icon-options-vertical
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-options"></i> icon-options
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-down"></i> icon-arrow-down
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-left"></i> icon-arrow-left
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-right"></i> icon-arrow-right
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-up"></i> icon-arrow-up
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-up-circle"></i> icon-arrow-up-circle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-left-circle"></i> icon-arrow-left-circle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-right-circle"></i> icon-arrow-right-circle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-arrow-down-circle"></i> icon-arrow-down-circle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-check"></i> icon-check
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-clock"></i> icon-clock
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-plus"></i> icon-plus
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-close"></i> icon-close
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-trophy"></i> icon-trophy
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-screen-smartphone"></i> icon-screen-smartphone
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-screen-desktop"></i> icon-screen-desktop
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-plane"></i> icon-plane
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-notebook"></i> icon-notebook
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-mustache"></i> icon-mustache
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-mouse"></i> icon-mouse
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-magnet"></i> icon-magnet
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-energy"></i> icon-energy
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-disc"></i> icon-disc
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-cursor"></i> icon-cursor
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-cursor-move"></i> icon-cursor-move
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-crop"></i> icon-crop
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-chemistry"></i> icon-chemistry
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-speedometer"></i> icon-speedometer
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-shield"></i> icon-shield
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-screen-tablet"></i> icon-screen-tablet
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-magic-wand"></i> icon-magic-wand
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-hourglass"></i> icon-hourglass
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-graduation"></i> icon-graduation
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-ghost"></i> icon-ghost
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-game-controller"></i> icon-game-controller
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-fire"></i> icon-fire
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-eyeglass"></i> icon-eyeglass
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-envelope-open"></i> icon-envelope-open
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-envolope-letter"></i> icon-envolope-letter
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-bell"></i> icon-bell
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-badge"></i> icon-badge
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-anchor"></i> icon-anchor
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-wallet"></i> icon-wallet
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-vector"></i> icon-vector
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-speech"></i> icon-speech
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-puzzle"></i> icon-puzzle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-printer"></i> icon-printer
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-present"></i> icon-present
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-playlist"></i> icon-playlist
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-pin"></i> icon-pin
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-picture"></i> icon-picture
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-handbag"></i> icon-handbag
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-globe-alt"></i> icon-globe-alt
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-globe"></i> icon-globe
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-folder-alt"></i> icon-folder-alt
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-folder"></i> icon-folder
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-film"></i> icon-film
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-feed"></i> icon-feed
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-drop"></i> icon-drop
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-drawar"></i> icon-drawar
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-docs"></i> icon-docs
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-doc"></i> icon-doc
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-diamond"></i> icon-diamond
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-cup"></i> icon-cup
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-calculator"></i> icon-calculator
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-bubbles"></i> icon-bubbles
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-briefcase"></i> icon-briefcase
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-book-open"></i> icon-book-open
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-basket-loaded"></i> icon-basket-loaded
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-basket"></i> icon-basket
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-bag"></i> icon-bag
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-action-undo"></i> icon-action-undo
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-action-redo"></i> icon-action-redo
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-wrench"></i> icon-wrench
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-umbrella"></i> icon-umbrella
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-trash"></i> icon-trash
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-tag"></i> icon-tag
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-support"></i> .icon-support
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-frame"></i> icon-frame
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-size-fullscreen"></i> icon-size-fullscreen
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-size-actual"></i> icon-size-actual
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-shuffle"></i> icon-shuffle
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-share-alt"></i> icon-share-alt
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-share"></i> icon-share
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-rocket"></i> icon-rocket
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-question"></i> icon-question
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-pie-chart"></i> icon-pie-chart
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-pencil"></i> icon-pencil
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-note"></i> icon-note
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-loop"></i> icon-loop
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-home"></i> icon-home
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-grid"></i> icon-grid
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-graph"></i> icon-graph
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-microphone"></i> icon-microphone
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-music-tone-alt"></i> icon-music-tone-alt
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-music-tone"></i> icon-music-tone
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-earphones-alt"></i> icon-earphones-alt
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-earphones"></i> icon-earphones
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-equalizer"></i> icon-equalizer
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-like"></i> icon-like
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-dislike"></i> icon-dislike
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-start"></i> icon-control-start
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-rewind"></i> icon-control-rewind
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-play"></i> icon-control-play
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-pause"></i> icon-control-pause
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-forward"></i> icon-control-forward
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-control-end"></i> icon-control-end
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-volume-1"></i> icon-volume-1
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-volume-2"></i> icon-volume-2
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-volume-off"></i> icon-volume-off
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-calender"></i> icon-calender
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-bulb"></i> icon-bulb
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-chart"></i> icon-chart
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-ban"></i> icon-ban
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-bubble"></i> icon-bubble
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-camrecorder"></i> icon-camrecorder
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-camera"></i> icon-camera
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-cloud-download"></i> icon-cloud-download
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-cloud-upload"></i> icon-cloud-upload
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-eye"></i> icon-eye
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-flag"></i> icon-flag
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-heart"></i> icon-heart
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-info"></i> icon-info
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-key"></i> icon-key
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-link"></i> icon-link
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-lock"></i> icon-lock
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-lock-open"></i> icon-lock-open
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-magnifier"></i> icon-magnifier
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-magnifier-add"></i> icon-magnifier-add
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-magnifier-remove"></i> icon-magnifier-remove
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-paper-clip"></i> icon-paper-clip
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-paper-plane"></i> icon-paper-plane
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-power"></i> icon-power
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-refresh"></i> icon-refresh
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-reload"></i> icon-reload
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-settings"></i> icon-settings
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-star"></i> icon-star
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-symble-female"></i> icon-symble-female
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-symbol-male"></i> icon-symbol-male
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-target"></i> icon-target
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-credit-card"></i> icon-credit-card
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-paypal"></i> icon-paypal
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-tumblr"></i> icon-social-tumblr
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-twitter"></i> icon-social-twitter
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-facebook"></i> icon-social-facebook
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-instagram"></i> icon-social-instagram
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-linkedin"></i> icon-social-linkedin
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-pintarest"></i> icon-social-pintarest
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-github"></i> icon-social-github
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-gplus"></i> icon-social-gplus
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-reddit"></i> icon-social-reddit
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-skype"></i> icon-social-skype
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-dribbble"></i> icon-social-dribbble
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-behance"></i> icon-social-behance
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-foursqare"></i> icon-social-foursqare
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-soundcloud"></i> icon-social-soundcloud
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-spotify"></i> icon-social-spotify
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-stumbleupon"></i> icon-social-stumbleupon
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-youtube"></i> icon-social-youtube
              </v-col>
              <v-col cols="12" sm="4" class="my-1">
                <i class="mr-2 icon-social-dropbox"></i> icon-social-dropbox
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SimpleLineIcons",
  data: () => ({
    page: {
      title: "Simple line Icons"
    },
    breadcrumbs: [
      {
        text: "Icons",
        disabled: false,
        to: "#"
      },
      {
        text: "Simple line Icons",
        disabled: true
      }
    ]
  })
};
</script>