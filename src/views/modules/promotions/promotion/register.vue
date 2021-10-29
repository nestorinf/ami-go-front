<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        {{ titleForm }}
      </h3>
      <v-col>
        <v-alert
          border="left"
          colored-border
          type="error"
          dense
          dismissible
          width="xl"
          mode
        >
          Los Campos con <strong>*</strong> son obligatorios
        </v-alert>
      </v-col>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las promociones
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12" v-if="expired">
            <v-alert outlined type="warning" prominent border="left">
              No se puede editar una promoción que ya ha expirado.
            </v-alert>
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre de la promoción *"
              required
              filled
              :disabled="expired"
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripción de la promoción"
              filled
              :disabled="expired"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              @input="ChangeType"
              label="Aplica a *"
              :items="types"
              v-model="form.type"
              filled
              :disabled="
                (!!id && form.type == 'products') ||
                expired ||
                form.entities > 0
              "
              required
              :rules="rules.typeRule"
              background-color="transparent"
              :error-messages="errorsBags.type"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" v-if="form.type == 'products'">
            <v-select
              :items="commerces"
              :loading="loadingCommerces"
              filled
              required
              :disabled="!!id"
              v-model="form.commerce_id"
              label="Comercio"
              :rules="rules.commerceRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.expire_date"
                  :disabled="expired"
                  label="Fecha de expiración (Dejar en blanco si no aplica)"
                  hint="Dejar en blanco si no aplica..."
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                  @click:clear="form.expire_date = null"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.expire_date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              label="Tipo de Descuento *"
              :items="types_promotion"
              v-model="form.type_descuent"
              filled
              required
              :disabled="expired"
              :rules="rules.type_descuentRule"
              background-color="transparent"
              :error-messages="errorsBags.type_descuent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.amount"
              label="Descuento *"
              filled
              required
              min="0"
              :disabled="expired"
              :rules="rules.amountRule"
              background-color="transparent"
              :error-messages="errorsBags.amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4">
            <v-checkbox
              v-model="form.is_cupon"
              required
              :disabled="expired"
              label="¿Acepta Cupones?"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" lg="4" v-if="form.is_cupon">
            <v-text-field
              v-model="form.code_cupon"
              label="Código del Cupon"
              filled
              required
              :disabled="expired"
              :rules="rules.code_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.code_cupon"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" v-if="form.is_cupon">
            <v-text-field
              type="number"
              v-model="form.total_cupon"
              label="Cantidad de Cupones"
              filled
              required
              min="0"
              :disabled="expired"
              :rules="rules.total_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.total_cupon"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              label="Visible en *"
              :items="types_visible"
              v-model="form.visible"
              :disabled="expired"
              filled
              required
              :rules="rules.types_visibleRule"
              background-color="transparent"
              :error-messages="errorsBags.visible"
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="!expired">
          <v-col cols="12" lg="12">
            <ShowsImages
              :items="imagesList"
              v-if="id"
              @delete-imagen="deleteImagen"
            ></ShowsImages>
          </v-col>

          <v-col cols="12" lg="12" v-if="id && imagesList.length > 0">
            <v-alert dense outlined type="success"
              >Solo se permite registrar una imagen</v-alert
            >
          </v-col>
          <v-col
            cols="12"
            lg="12"
            class="mb-10"
            v-else-if="id && imagesList.length == 0"
          >
            <v-alert dense outlined type="info"
              >El campo de imagen es obligatorio</v-alert
            >
            <UploadImages v-if="displayed" :max="1" @changed="onFileSelected" />
          </v-col>
          <v-col cols="12" lg="12" class="mb-10" v-else>
            <v-alert
              v-if="selectedFile.length == 0 && !id"
              dense
              outlined
              type="info"
              >El campo de imagen es obligatorio</v-alert
            >
            <UploadImages v-if="displayed" :max="1" @changed="onFileSelected" />
          </v-col>

          <!-- 

          <v-col cols="12" lg="12">
            <UploadImages
              v-if="displayed && imagesList.length==0"
              :max="1" 
              @change="onFileSelected"
            />
            <v-col cols="12" lg="12" v-if="imagesList.length>0">
              <v-alert outlined type="warning" prominent border="left">
                Para añadir una nueva imagen debes borrar la anterior!
              </v-alert>
            </v-col>
            
          </v-col> -->
        </v-row>

        <v-row class="pt-10">
          <v-col cols="12" lg="12">
            <v-btn
              v-if="!expired"
              color="success"
              @click="save"
              :disabled="!valid"
              submit
              class="text-capitalize mr-2"
              >Guardar</v-btn
            >
            <v-btn
              color="black"
              class="text-capitalize"
              to="/promotions/promotion"
              dark
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UploadImages from "vue-upload-drop-images";
import ShowsImages from "../../components/ShowsImages";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
// import moment from "moment";
export default {
  name: "RegisterPromotion",
  props: {
    id: String,
  },
  components: {
    UploadImages,
    ShowsImages,
    SnackBar,
  },

  data() {
    return {
      titleForm: "Promoción",
      menu2: false,
      expired: false,

      displayed: true,
      selectedFile: [],
      textSnackBar: "",
      imagesList: [],
      valid: true,

      form: {
        id: "",
        name: "",
        description: "",
        expire_date: "",
        type: "",
        is_cupon: false,
        code_cupon: "",
        total_cupon: "",
        visible: "",
        type_descuent: "",
        amount: "",
        commerce_id: "",
        entities: 0,
      },
      types: [
        {
          value: "all",
          text: "Todos",
        },
        {
          value: "commerce",
          text: "Comercios",
        },
        {
          value: "delivery_commerce",
          text: "Delivery (Comercios)",
        },
        {
          value: "market",
          text: "Super Mercados",
        },
        {
          value: "market_commerce",
          text: "Delivery (Super Mercados)",
        },
        {
          value: "restaurant",
          text: "Restaurantes",
        },
        {
          value: "delivery_restaurant",
          text: "Delivery (Restaurantes)",
        },
        {
          value: "products",
          text: "Productos",
        },
      ],
      types_visible: [
        {
          value: "all",
          text: "Todos",
        },
        {
          value: "commerce",
          text: "Tiendas",
        },
        {
          value: "restaurant",
          text: "Comidas",
        },
        {
          value: "no",
          text: "Ninguna",
        },
      ],
      types_promotion: [
        {
          value: "porc",
          text: "Porcentaje",
        },
        {
          value: "total",
          text: "Deducible del total",
        },
      ],

      commerces: [],
      loadingCommerces: false,
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        typeRule: [(v) => !!v || "este campo es obligatorio"],
        code_cuponRule: [(v) => !!v || "este campo es obligatorio"],
        total_cuponRule: [(v) => !!v || "este campo es obligatorio"],
        type_descuentRule: [(v) => !!v || "este campo es obligatorio"],
        amountRule: [(v) => !!v || "este campo es obligatorio"],
        commerceRule: [(v) => !!v || "este campo es obligatorio"],
        types_visibleRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({
      storePromotion: "promotion/getPromotion",
      ExpirePromotion: "promotion/getPromotion",
    }),
  },
  watch: {
    ExpirePromotion() {
      if (this.storePromotion.expired) {
        this.expired = true;
      }
    },
    storePromotion(data) {
      if (data.logo.length > 0) {
        this.imagesList = Object.assign([], this.attachments(data.attachment));
      }
    },
  },
  methods: {
    ...mapActions({
      commerceData: "commerce/getCommercesData",
      createPromotion: "promotion/createPromotion",
      getPromotionById: "promotion/getPromotionById",
      updatePromotion: "promotion/updatePromotion",

      removeAttachment: "attachment/removeAttachment",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        //if (this.selectedFile.length) {
        const payload = new FormData();
        payload.append("name", this.form.name);
        payload.append("description", this.form.description);
        payload.append("expire_date", this.form.expire_date);
        payload.append("type", this.form.type);
        payload.append("is_cupon", this.form.is_cupon);
        payload.append("code_cupon", this.form.code_cupon);
        payload.append("total_cupon", this.form.total_cupon);
        payload.append("visible", this.form.visible);
        payload.append("type_descuent", this.form.type_descuent);
        payload.append("amount", this.form.amount);
        payload.append("commerce_id", this.form.commerce_id);
        payload.append("entities", this.form.entities);
        this.selectedFile.forEach((e) => {
          payload.append("images[]", e);
        });
        if (this.id) {
          if (this.selectedFile.length > 0 || this.imagesList.length > 0) {
            payload.append("_method", "PUT");
            payload.append("id", this.id);
            this.update(payload, this.id);
          }
        } else {
          if (this.selectedFile.length || this.id) {
            this.create(payload);
          }
        }
        //}
      }
    },
    setData() {
      if (this.id) {
        this.getPromotionById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            type: result.type,
            expire_date: result.expire_date == null ? "" : result.expire_date,
            is_cupon: result.is_cupon,
            code_cupon: result.code_cupon,
            total_cupon: result.total_cupon,
            description: result.description,
            visible: result.visible,
            type_descuent: result.type_descuent,
            amount: result.amount,
            commerce_id: result.commerce_id,
            entities: result.entities,
          };
          if (result.commerce_id != "") {
            this.loadCommerces();
          }
        });
      }
    },

    ChangeType() {
      this.form.commerce_id = "";
      if (this.form.type == "products") {
        this.loadCommerces();
      }
    },
    loadCommerces() {
      const rows = [];
      this.commerces = [];
      this.loadingCommerces = true;
      this.commerceData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              if (element.commerce_type !== "Restaurantes") {
                rows.push({
                  value: element.id,
                  text: element.name,
                });
              }
              this.commerces = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
    },
    attachments(attachmentData) {
      const attachmentsRows = [];
      if (this.id) {
        attachmentData.map((element) => {
          if (element) {
            attachmentsRows.push({
              id: element.id,
              imagen: element.url,
            });
          }
        });
      }
      return attachmentsRows;
    },

    create(payload) {
      this.createPromotion(payload)
        .then((result) => {
          if (result) {
            // this.form = {};
            this.$refs.form.reset();
            this.form.expire_date = "";
            this.form.expired = false;
            this.form.is_cupon = false;
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);

            this.selectedFile = [];
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

            // this.$router.push("/products/categories");
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

    update(payload, id) {
      this.updatePromotion({ payload, id })
        .then((result) => {
          if (result) {
            this.form = Object.assign({}, result);
            this.form.expire_date =
              result.expire_date == null ? "" : result.expire_date;
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
            this.form.expired = false;
            this.selectedFile = [];
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

            // this.$router.push("/products/categories");
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
    onFileSelected(event) {
      this.selectedFile = event;
    },

    deleteImagen(id) {
      const index = this.imagesList.findIndex((x) => x.id === id);
      const attachments = [...this.imagesList];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesList = attachments;
        }
      });
    },

    // deleteImagen(item) {
    //   this.form.imagenes.forEach((e) => {
    //     if (e.id == item) {
    //       e.delete = !e.delete;
    //     }
    //   });
    //   this.form.saved_imagen = !this.form.saved_imagen;
    // },
  },
};
</script>