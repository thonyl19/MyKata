/*
https://vuetifyjs.com/zh-Hans/getting-started/installation/
*/
var __fn = ($, _ , styled, Vue, Vuetify) => {
 
 
	let Elements = {
		'*def'() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					vuetify: new Vuetify(),
					template: `
						<div>
						${_note}
						<v-alert
							color="#2A3B4D"
							dark
							icon="mdi-firework"
							dense
							>
							Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Vivamus quis mi. Quisque ut nisi. Maecenas malesuada.
							</v-alert>
							<v-alert
							color="#C51162"
							dark
							icon="mdi-material-design"
							border="right"
							>
							Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. In ut quam vitae odio lacinia tincidunt.
							</v-alert>
							<v-alert
							color="primary"
							dark
							icon="mdi-vuetify"
							border="left"
							prominent
							>
							Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur at lacus ac velit ornare lobortis.
							</v-alert>
							<v-container>
							<v-row
							  align="center"
							  justify="center"
							>
							  <v-badge
								bordered
								color="error"
								icon="mdi-lock"
								overlap
							  >
								<v-btn
								  class="white--text"
								  color="error"
								  depressed
								>
								  Lock Account
								</v-btn>
							  </v-badge>
						
							  <div class="mx-3"></div>
						
							  <v-badge
								bordered
								bottom
								color="deep-purple accent-4"
								dot
								offset-x="10"
								offset-y="10"
							  >
								<v-avatar size="40">
								  <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
								</v-avatar>
							  </v-badge>
						
							  <div class="mx-3"></div>
						
							  <v-badge
								avatar
								bordered
								overlap
							  >
								<template v-slot:badge>
								  <v-avatar>
									<v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img>
								  </v-avatar>
								</template>
						
								<v-avatar size="40">
								  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
								</v-avatar>
							  </v-badge>
							</v-row>
						  </v-container>
						  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="dialogm1"
            column
          >
            <v-radio
              label="Bahamas, The"
              value="bahamas"
            ></v-radio>
            <v-radio
              label="Bahrain"
              value="bahrain"
            ></v-radio>
            <v-radio
              label="Bangladesh"
              value="bangladesh"
            ></v-radio>
            <v-radio
              label="Barbados"
              value="barbados"
            ></v-radio>
            <v-radio
              label="Belarus"
              value="belarus"
            ></v-radio>
            <v-radio
              label="Belgium"
              value="belgium"
            ></v-radio>
            <v-radio
              label="Belize"
              value="belize"
            ></v-radio>
            <v-radio
              label="Benin"
              value="benin"
            ></v-radio>
            <v-radio
              label="Bhutan"
              value="bhutan"
            ></v-radio>
            <v-radio
              label="Bolivia"
              value="bolivia"
            ></v-radio>
            <v-radio
              label="Bosnia and Herzegovina"
              value="bosnia"
            ></v-radio>
            <v-radio
              label="Botswana"
              value="botswana"
            ></v-radio>
            <v-radio
              label="Brazil"
              value="brazil"
            ></v-radio>
            <v-radio
              label="Brunei"
              value="brunei"
            ></v-radio>
            <v-radio
              label="Bulgaria"
              value="bulgaria"
            ></v-radio>
            <v-radio
              label="Burkina Faso"
              value="burkina"
            ></v-radio>
            <v-radio
              label="Burma"
              value="burma"
            ></v-radio>
            <v-radio
              label="Burundi"
              value="burundi"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
						</div>
					`,
					data(){
						return {
							dialogm1: '',
        dialog: false,
						}
					} 
				}
			};
			return _obj;
		},
	};
	return {
		Elements,
		
	};
};
(function () {
	//$, _ , styled, Vue, bts45
	var arr = [
		'jquery',
		'lodash',
		'styled',
		'vue',
		'vuetify2x'
	];
	var cfg = {
		// paths: {
		// 	"bulma":"https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min",
		
		// },
		// shim:{
		// 	"bulma":{deps: ['css!bulma-css']},
		// }
	};
	if (typeof define === "function" && define.amd) {
		define({arr, cfg, __fn});
	}else{
		window.sample = __fn();
	}
})();
 