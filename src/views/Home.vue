<template>
  <div class="home">
    <v-layout >
      <v-flex x12>
        <v-card>
          <v-date-picker 
          v-model="fecha"
          full-width
          locale="es-cl"
          color="blue lighten-1"
          :min="AñoMinimo"
          :max="AñoMaximo"
          @change="dolar(fecha)"
          ></v-date-picker>
        </v-card>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-center">
          $ {{valor}} - {{fecha}} 
          </v-card-text>
        </v-card>
       
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
//con mutationmap lo que hacemos es obtener los metodos del store
import {mapMutations} from 'vuex';
export default {
  
  name: 'Home',
  data(){
    return{
      fecha: new Date().toISOString().substr(0, 10),
      AñoMinimo:'1984',
      AñoMaximo:new Date().toISOString().substr(0, 10),
      valor:null
    }
    },
    methods:{
      ...mapMutations(['mostrarLoading','ocultarLoading']),
      async dolar(dia){
        //separamos la variable dia
        let ArrayFecha=dia.split(['-'])
        //la invertimos
        let ddmmyy=ArrayFecha[2]+'-'+ArrayFecha[1]+'-'+ArrayFecha[0];
        console.log(ddmmyy);
        try {
          this.mostrarLoading({titulo:'Buscando dolar',color:'secondary'})
          //enviamos los datos a la api
          let datos=await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`)
        console.log(datos.data.serie);
        //si la longitud es mamyot que 0 es que hay algo
        if(datos.data.serie.length>0){
          //esperara el valor de la api
        this.valor=await datos.data.serie[0].valor
          
        }else{
        this.valor='fin de semana (sin resultado)'
        }
        
        } catch (error) {
          console.log(error);
        }
        finally{
          this.ocultarLoading()
        }
        
      }
    },
    created(){
      this.dolar(this.fecha)
    }
}
</script>
