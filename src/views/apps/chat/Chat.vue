<template>
    <v-container fluid class="chat-app common-left-right">
        <v-row>
        <v-col cols="12" sm="12">
            <v-card class="d-flex flex-row">
                <div>
                    
                <!---/Left chat list -->
                <v-navigation-drawer left v-model="drawer" class="flex-shrink-0">
                    <div class="px-3 border-bottom"><v-text-field placeholder="Search contact" class="mb-0 mt-0 " v-model="handleSearchInput"></v-text-field></div>
                    <v-list nav class="hightauto" >
                        <v-list-item v-for="(conversation, i) in filteredList" :key="i" @click="(e) => openMessages(conversation, e)" :class="isActive ? 'active':'s'">
                            <v-avatar size="42" class="mr-3"><img :src="require(`@/assets/images/users/${conversation.image}`)" :alt="conversation.image" /></v-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <h4>{{conversation.name}}</h4>
                                    <span class="caption">{{conversation.lastMessage}}</span>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                </div>
                <!---/Left chat list -->
                <!---right chat conversation -->
                <div class="chat-right-part">
                    <template  v-if="conversation">
                        <!---conversation header-->
                        <div class="chat-topbar d-flex px-3 py-3 align-center">
                            <div>
                                <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-block d-lg-none mr-2" />
                            </div>
                            <v-avatar size="42" class="mr-3"><img :src="require(`@/assets/images/users/${conversation.image}`)" width="37" /></v-avatar>
                            <div class="user-about">
                                <h6>{{conversation.name}}</h6>
                            </div>
                        </div>
                        <!---conversation header-->
                        <!---Chat Room-->
                        <div class="">
                        <div class="chat-room px-3 py-3">
                            <div class="d-flex align-center mb-3" light v-for="message in conversation.messages" :key="message.id" :class="{fromMe: message.fromMe, 'messageItem': true}">
                                    <div class="thumb">
                                        <v-avatar size="37" class="mx-2" v-if="message.fromMe" ><img src="@/assets/images/users/6.jpg" alt="..."/></v-avatar>
                                        <v-avatar size="37"  class="mx-2" v-else><img :src="require(`@/assets/images/users/${conversation.image}`)" alt="..."/>
                                        </v-avatar>
                                    </div>
                                    <v-chip :color="message.fromMe ? 'primary': ''">{{message.text}}</v-chip>
                                </div>    
                            </div>
                        </div>    
                        <!---Chat Room-->
                        <div class="pa-3 border-top">
                                <v-textarea name="input-4-1" rows="2" placeholder="Type and hit Enter"  @keydown="addMessage" ></v-textarea>
                            </div> 
                    </template> 
                    <template v-else>
                        <div class="d-flex justify-center hightauto align-center">
                            <h4>Start conversation</h4>
                        </div>
                    </template>      
                </div>
                <!---right chat conversation -->
            </v-card>
            
        </v-col>
        </v-row>
    </v-container>    
</template>

<script>
import Vue from 'vue';
import UsersList from './userslist.js'
export default {
  name: 'Chat',
  components: {
  },
  data:()=>({
      drawer:null, 
      doNotClose:true,
      handleSearchInput:"",
      UsersList: UsersList,
      chatUserActive: true,
      conversation: "",
      sendMessage:" ",
      isActive: false,
      windowWidth: window.innerWidth,
  }),
  methods: {
      selectedchat: function() {
      this.isActive = !this.isActive;
      // some code to filter users
    },
    openMessages(conversation) {
      Vue.set(this, 'conversation', conversation);
    },

    addMessage(e) {
      if (e.key === 'Enter' && e.target.value) {
        const value = {
          text: e.target.value,
          fromMe: true,
        };
        
        Vue.set(this, 'conversation', Object.assign({}, this.conversation, {
          messages: [
            ...this.conversation.messages || [],
            value,
          ],
        }));

        e.target.value = ''; 
        
      }
    },
    
    handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth;
            this.setSidebarWidth();
    },
    setSidebarWidth() {
        if(this.windowWidth < 1170) {
            this.chatSidebarActive = this.doNotClose = false;
        }else {
            this.chatSidebarActive = this.doNotClose =  true;
        }
    },
    
  },
  computed:{
      filteredList() {
        return this.UsersList.filter(user => {
            return user.name.toLowerCase().includes(this.handleSearchInput.toLowerCase())
        }) 
    },
  },
  created() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.handleWindowResize);
        })
        this.setSidebarWidth();
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleWindowResize)
    },
  
}
</script>
<style lang="scss">
    .chat-app{
        overflow:hidden;
        .v-navigation-drawer__border{
            width:0px;
        }
        .chat-right-part{
            width: 100%;
            border-left:1px solid rgba(0,0,0,0.1);
            .chat-topbar{
                border-bottom: 1px solid rgba(0,0,0,0.1);
            }
        }
        .chat-room {
            min-height: calc(100vh - 385px);
        .fromMe {
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: reverse;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
        }
        }
        .hightauto{
            min-height: calc(100vh - 360px);
        }
    }
    
</style>