var __fn = ($, _, Vue) => {
	var Slot = {
        'Case01'() {
            var _note = `
            <pre>
            https://cn.vuejs.org/v2/guide/components-slots.html
            1.演示如何利用 slot ,在父層中指定引用子層物件內部的資料
            </pre>
            `;
            var dyn = {
                template: `
                <span>
                    <slot v-bind:user="user">{{ user.lastName }}</slot>
                  </span>
                `,
                data(){
                    return { 
                        user:{
                            firstName:'firstName',
                            lastName :'lastName '
                    }}
                },
            }
            var _obj = {
                _css:``,
                _vue: {
                    template: `
                    <div>
                        ${_note}
                        <h1>使用預設的 slot</h1>
                        <dyn></dyn>
                        <h1>由父層指定 slot 內容</h1>
                        <dyn>
                            <template v-slot:default="slotProps">
                                {{ slotProps.user.firstName }}
                            </template>
                        </dyn>
                        <h1>這樣的寫法與上面等價,但只適用單一 slot 的寫法,多個 slot 還是得用標準的 template </h1>
                        <dyn v-slot="slotProps">
                            {{ slotProps.user.firstName }}
                        </dyn>
                        <h1>這個用法試不出來,照官方說法 ,應該是會顯示為 Guest</h1>
                        <dyn v-slot="{ user: person }">
                            {{ person.firstName }}
                        </dyn>
                        <dyn v-slot="{ user = { firstName: 'Guest' } }">
                            {{ user.firstName }}
                        </dyn>
                    </div>
                    `, 
                    components:{dyn}
                }
            };
            return _obj;
        },
        'Case02'() {
            var _note = `
            <pre>
            https://cn.vuejs.org/v2/guide/components-slots.html
            1.這裡是 延伸 Case01 的範例,與 Case01 不同的地方,
                是將 user 的資料改用 prop 傳入, 主要是想試出 官網中,
                插槽 prop 是 undefined 的範例,但試驗結果仍是不 work
            </pre>
            `;
            var dyn = {
                inheritAttrs:false,
                template: `
                <span>
                    <slot v-bind:user="user">{{ user.lastName }}</slot>
                  </span>
                `,
                props:['user']
            }
            var _obj = {
                _vue: {
                    template: `
                    <div>
                        ${_note}
                        <h1>使用預設的 slot</h1>
                        <dyn :user="user"></dyn>
                        <h1>由父層指定 slot 內容</h1>
                        <dyn :user="user">
                            <template v-slot:default="slotProps">
                                {{ slotProps.user.firstName }}
                            </template>
                        </dyn>
                        <h1>這樣的寫法與上面等價,但只適用單一 slot 的寫法,多個 slot 還是得用標準的 template </h1>
                        <dyn :user="user" v-slot="slotProps">
                            {{ slotProps.user.firstName }}
                        </dyn>
                        <h1>這個用法試不出來,照官方說法 ,應該是會顯示為 Guest</h1>
                        <dyn :user="user" v-slot="{ user: person }">
                            {{ person.firstName }}
                        </dyn>
                        <dyn   v-slot="{ user={firstName:'Guest'}}">
                            {{ user.firstName }}
                        </dyn>
                    </div>
                    `
                    ,data(){
                        return { 
                            user:{
                                firstName:'firstName',
                                lastName :'lastName '
                        }}
                    }, 
                    components:{dyn}
                }
            };
            return _obj;
        },
	}
	return {Slot}; 
}
(function () {
	var cfg = {
		//避免緩存
		urlArgs: "bust=" + new Date().getTime(),
		paths: {
			moment:"https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min",
		},
		map: {
			"*": {
				css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
			},
		},
	};
	var arr = ['jquery', 'lodash', 'vue'];
	define({arr,cfg,__fn});
}());


