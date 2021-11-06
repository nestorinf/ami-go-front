<template>
<div>
  <v-card class="mb-7">
    <v-card-title class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Consultar Orden        
      </h3>
      
    </v-card-title>
    <v-card-text class="pt-5">
        <v-row>
      <v-col cols="4">
          <v-card class="w-100"
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
             <v-icon class="mr-2"
              >mdi-refresh</v-icon
            > Estatus de la Orden
            </h3>           
          </v-card-title>

          <v-card-text class="pt-5"  v-if="order">
            <v-row>
              <v-col cols="12" lg="12">
                <v-select
                  @input="acceptChangeStatus()"
                  :loading="loadingStatusSlug"
                  label="Cambiar de Estatus"
                  :items="StatusList"
                  v-model="order.state_id"
                  filled
                  required
                  background-color="transparent"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>

          </v-card>
          <br>
          <v-card class="w-100"
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
             <v-icon class="mr-2"
              >mdi-text-box</v-icon
            > Datos de la orden
            </h3>
            <!-- <v-icon small @click="setData()" class="mr-2"
              >mdi-feature-search-outline</v-icon
            > -->
            

          </v-card-title>

          <v-card-text class="pt-5"  v-if="order">
            Id : {{order.id}} <br>
            Fecha : {{order.created_at}} <br>
            Estatus : {{order.state.value}}  <br>
            Nota : {{order.note}} 
          </v-card-text>

          </v-card>
          <br>
          <v-card class="w-100"
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-store</v-icon
            >
            {{(this.type=="commerce")?'Comercio':'Restaurant'}}
            </h3>
          </v-card-title>

          <v-card-text class="pt-5"  v-if="order && type=='commerce'">
            Nombre : {{order.commerce.name}} <br>
            Categoria : {{order.commerce.commerce_type.name}} <br>
            Dirección : {{order.commerce_address.name}} 
          </v-card-text>
          <v-card-text class="pt-5"  v-else>
            Nombre : {{order.restaurant.name}} <br>
            Categoria : {{order.restaurant.restaurant_type.name}} <br>
            Dirección : {{order.restaurant_address.name}} 
          </v-card-text>

          </v-card>
          <br>
          <v-card
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-account</v-icon
            > Usuario
            </h3>
          </v-card-title>

          <v-card-text class="pt-5" v-if="order">
            Nombre : {{order.user.name}} <br>
            Email : {{order.user.name}} <br>
            Telefono : {{order.user.phone}} <br>
            Dirección : {{order.user_address.address}} 

          </v-card-text>

          </v-card>
          <br> 
          <v-card
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-credit-card-outline</v-icon
            > Forma de Pago
            </h3>
          </v-card-title>

          <v-card-text class="pt-5" v-if="order && order.payment_allocation">
            <span v-for="(item, index) in order.payment_allocation.payment" :key="index">              
              Tipo : {{item.payment_type.value}} <br>
              Monto:  {{item.amount_total}}  <br>
              Cambio:  {{item.amount_change}}   <br>
              Nota:  {{item.note}} <br>
            </span>           
          </v-card-text>

          </v-card>
          <br>
          <v-card
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-shopping-outline</v-icon
            > Retiro
            </h3>
          </v-card-title>

          <v-card-text class="pt-5" v-if="order">
            Tipo : {{(order.delivery_type)?order.delivery_type.value:''}} <br>
            <span v-if="order.driver_id">
              Conductor : {{order.driver_user.name}} <br>
              Conductor (Tlf) : {{order.driver_user.phone}} <br>
            </span>
            Dirección Origen : {{(type=="commerce")?order.commerce_address.name:order.restaurant_address.name}} <br>
            Dirección Destino : {{order.user_address.address}} <br>
          </v-card-text>

          </v-card>
          <br> 
          <v-card
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-sale</v-icon
            > Detalles de Descuentos
            </h3>
          </v-card-title>

          <v-card-text class="pt-5" v-if="order">
            <div v-for="(item, index) in order.discounts_details" :key="index">              
              {{index+1}}. <strong> {{item.nombre}} - {{item.descuento}}{{item.tipo}} </strong>
            </div>           
          </v-card-text>

          </v-card>
      </v-col>
    
      <v-col cols="8">
          <v-card
            elevation="5"
          >
          <v-card-title class="border-bottom px-2 py-2">
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
              <v-icon class="mr-2"
              >mdi-text-box-search</v-icon
            > Detalles de la Orden
            </h3>
          </v-card-title>

          <v-card-text class="pt-5" v-if="order">
             
          <v-row>
            <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Descripción / Pedido
                    </th>
                    <th class="text-left">
                      Precio Unitario
                    </th>
                    <th class="text-left">
                      Unidad
                    </th>
                    <th class="text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in order.details"
                    :key="index"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td class="text-right">{{ item.total_price | setAmount }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="6" offset-md="6">
              
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Total Neto</td>
                    <td class="text-right">{{order.amount_total | setAmount}}</td>                    
                  </tr>
                  <tr>
                    <td>IVA</td>
                    <td class="text-right">{{order.tax_total | setAmount}}</td>                    
                  </tr>
                  <tr>
                    <td>Cargo Delivery</td>
                    <td class="text-right">{{order.amount_delivery | setAmount}}</td>                    
                  </tr>
                  <tr>
                    <td>Descuento Promoción</td>
                    <td class="text-right">{{order.discount_promotions | setAmount}}</td>                    
                  </tr>
                  <tr>
                    <td>Descuento Cúpon</td>
                    <td class="text-right">{{order.discount_cupon | setAmount}}</td>                    
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="text-right">{{order.grand_total | setAmount}}</td>                    
                  </tr> 
                </tbody>
              </template>
            </v-simple-table>
            </v-col>
          </v-row>
          </v-card-text>

          </v-card>
        </v-col>
        </v-row>
        
    <v-btn color="black" class="text-capitalize float-right" to="/order-control/index" dark
      >Regresar</v-btn
    >

    </v-card-text>
    

  </v-card>
  
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="confirmButton"
      :message="messageDialog"
    ></DialogConfirm>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
</div>
</template>

<script>
import { mapActions } from "vuex";
import DialogConfirm from "../components/DialogConfirm";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
export default {
  name: "ShowOrder",
  props: {
    id: String,
    type: String,
  },
  components: {
    DialogConfirm,
    SnackBar
  },


  data: () => ({
    messageDialog: "",
    textSnackBar: "",
    search: "",
    loading: false,   
    order : null, 
    items: [],
      loadingStatusSlug: true,
      StatusList: [],
  }),


  mounted() {
    console.log('asda',this.id,this.type);
    this.setData();
  },

  computed: {
    
  },

  watch: {
    
  },

  methods: {
    ...mapActions({
      getOrder: "orderControl/getOrderById",
      getupdateOrden: "orderControl/updateOrder",
      getLoadStatus: "referenceList/getReferenceListByReferenceSlugData",

    }),
    
    setData() {
      this.loadStatus();
        this.getOrder({'type':this.type, 'id':this.id}).then((result) => {
         console.log(result);
         this.order = result;
        });
    },

    loadStatus() {
      const slugName = "ORDER_STATUS";
      const rows = [];
      this.getLoadStatus(slugName).then((response) => {
        response.map((element) => {
          if(element.alternative=='order-'+this.type){
            rows.push({
              value: element.id,
              text: element.value,
            }); 
          }
          this.loadingStatusSlug = false;
          this.StatusList = rows;
        });
      });
    },
    acceptChangeStatus() {
      this.messageDialog = 'Estas Seguro que realmente deseas cambiar el estatus de la orden?? Esta acción puede acosionar errores al procesar la orden';
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    confirmButton() {

      this.$refs.DialogConfirm.changeStateDialog(false);
      this.getupdateOrden({'type':this.type, 'id':this.id, 'status':this.order.state_id})
        .then((result) => {
          if (result) {
            this.setData();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },

  },  
  filters: {   
      setAmount: function (value) { 
        return Intl.NumberFormat().format(value);      
      },
  },
};
</script>