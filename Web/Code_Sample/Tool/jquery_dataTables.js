/*
https://datatables.net/
	官網
https://dotblogs.com.tw/shadow/2018/04/03/033936
	[jQuery] jQuery DataTables Server Side模式整合ASP.net MVC 的查詢、分頁和排序 Part2
https://www.c-sharpcorner.com/article/Asp-Net-mvc5-datatables-plugin-server-side-integration/

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/684065/
	datatables那點兒事
	*/

var __fn = ($,_,Vue,moment) => {
	var dataSet = [
		["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
		["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
		["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
		["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
		["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
		["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
		["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
		["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
		["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
		["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
		["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
		["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
		["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
		["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
		["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
		["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
		["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
		["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
		["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
		["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
		["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
		["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
		["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
		["Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600"],
		["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
		["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
		["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
		["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
		["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
		["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
		["Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400"],
		["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
		["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
		["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
		["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
		["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
	];
	let Views = {
		HtmlBase(_note = "", ops = {}) {
			var _obj = {
				_vue: {
					template: `
			<div>
			  ${_note}
			  <table  ref="jqDT" class="display" style="width:100%"> 
				<thead> <tr> <th>Name</th> <th>Position</th> 
				<th>Office</th> <th>Age</th> <th>Start date</th> 
				<th>Salary</th> </tr> </thead> <tbody> <tr> <td>Tiger Nixon</td> <td>System Architect</td> <td>Edinburgh</td> <td>61</td> <td>2011/04/25</td> <td>$320,800</td> </tr> <tr> <td>Garrett Winters</td> <td>Accountant</td> <td>Tokyo</td> <td>63</td> <td>2011/07/25</td> <td>$170,750</td> </tr> <tr> <td>Ashton Cox</td> <td>Junior Technical Author</td> <td>San Francisco</td> <td>66</td> <td>2009/01/12</td> <td>$86,000</td> </tr> <tr> <td>Cedric Kelly</td> <td>Senior Javascript Developer</td> <td>Edinburgh</td> <td>22</td> <td>2012/03/29</td> <td>$433,060</td> </tr> <tr> <td>Airi Satou</td> <td>Accountant</td> <td>Tokyo</td> <td>33</td> <td>2008/11/28</td> <td>$162,700</td> </tr> <tr> <td>Brielle Williamson</td> <td>Integration Specialist</td> <td>New York</td> <td>61</td> <td>2012/12/02</td> <td>$372,000</td> </tr> <tr> <td>Herrod Chandler</td> <td>Sales Assistant</td> <td>San Francisco</td> <td>59</td> <td>2012/08/06</td> <td>$137,500</td> </tr> <tr> <td>Rhona Davidson</td> <td>Integration Specialist</td> <td>Tokyo</td> <td>55</td> <td>2010/10/14</td> <td>$327,900</td> </tr> <tr> <td>Colleen Hurst</td> <td>Javascript Developer</td> <td>San Francisco</td> <td>39</td> <td>2009/09/15</td> <td>$205,500</td> </tr> <tr> <td>Sonya Frost</td> <td>Software Engineer</td> <td>Edinburgh</td> <td>23</td> <td>2008/12/13</td> <td>$103,600</td> </tr> <tr> <td>Jena Gaines</td> <td>Office Manager</td> <td>London</td> <td>30</td> <td>2008/12/19</td> <td>$90,560</td> </tr> <tr> <td>Quinn Flynn</td> <td>Support Lead</td> <td>Edinburgh</td> <td>22</td> <td>2013/03/03</td> <td>$342,000</td> </tr> <tr> <td>Charde Marshall</td> <td>Regional Director</td> <td>San Francisco</td> <td>36</td> <td>2008/10/16</td> <td>$470,600</td> </tr> <tr> <td>Haley Kennedy</td> <td>Senior Marketing Designer</td> <td>London</td> <td>43</td> <td>2012/12/18</td> <td>$313,500</td> </tr> <tr> <td>Tatyana Fitzpatrick</td> <td>Regional Director</td> <td>London</td> <td>19</td> <td>2010/03/17</td> <td>$385,750</td> </tr> <tr> <td>Michael Silva</td> <td>Marketing Designer</td> <td>London</td> <td>66</td> <td>2012/11/27</td> <td>$198,500</td> </tr> <tr> <td>Paul Byrd</td> <td>Chief Financial Officer (CFO)</td> <td>New York</td> <td>64</td> <td>2010/06/09</td> <td>$725,000</td> </tr> <tr> <td>Gloria Little</td> <td>Systems Administrator</td> <td>New York</td> <td>59</td> <td>2009/04/10</td> <td>$237,500</td> </tr> <tr> <td>Bradley Greer</td> <td>Software Engineer</td> <td>London</td> <td>41</td> <td>2012/10/13</td> <td>$132,000</td> </tr> <tr> <td>Dai Rios</td> <td>Personnel Lead</td> <td>Edinburgh</td> <td>35</td> <td>2012/09/26</td> <td>$217,500</td> </tr> <tr> <td>Jenette Caldwell</td> <td>Development Lead</td> <td>New York</td> <td>30</td> <td>2011/09/03</td> <td>$345,000</td> </tr> <tr> <td>Yuri Berry</td> <td>Chief Marketing Officer (CMO)</td> <td>New York</td> <td>40</td> <td>2009/06/25</td> <td>$675,000</td> </tr> <tr> <td>Caesar Vance</td> <td>Pre-Sales Support</td> <td>New York</td> <td>21</td> <td>2011/12/12</td> <td>$106,450</td> </tr> <tr> <td>Doris Wilder</td> <td>Sales Assistant</td> <td>Sydney</td> <td>23</td> <td>2010/09/20</td> <td>$85,600</td> </tr> <tr> <td>Angelica Ramos</td> <td>Chief Executive Officer (CEO)</td> <td>London</td> <td>47</td> <td>2009/10/09</td> <td>$1,200,000</td> </tr> <tr> <td>Gavin Joyce</td> <td>Developer</td> <td>Edinburgh</td> <td>42</td> <td>2010/12/22</td> <td>$92,575</td> </tr> <tr> <td>Jennifer Chang</td> <td>Regional Director</td> <td>Singapore</td> <td>28</td> <td>2010/11/14</td> <td>$357,650</td> </tr> <tr> <td>Brenden Wagner</td> <td>Software Engineer</td> <td>San Francisco</td> <td>28</td> <td>2011/06/07</td> <td>$206,850</td> </tr> <tr> <td>Fiona Green</td> <td>Chief Operating Officer (COO)</td> <td>San Francisco</td> <td>48</td> <td>2010/03/11</td> <td>$850,000</td> </tr> <tr> <td>Shou Itou</td> <td>Regional Marketing</td> <td>Tokyo</td> <td>20</td> <td>2011/08/14</td> <td>$163,000</td> </tr> <tr> <td>Michelle House</td> <td>Integration Specialist</td> <td>Sydney</td> <td>37</td> <td>2011/06/02</td> <td>$95,400</td> </tr> <tr> <td>Suki Burks</td> <td>Developer</td> <td>London</td> <td>53</td> <td>2009/10/22</td> <td>$114,500</td> </tr> <tr> <td>Prescott Bartlett</td> <td>Technical Author</td> <td>London</td> <td>27</td> <td>2011/05/07</td> <td>$145,000</td> </tr> <tr> <td>Gavin Cortez</td> <td>Team Leader</td> <td>San Francisco</td> <td>22</td> <td>2008/10/26</td> <td>$235,500</td> </tr> <tr> <td>Martena Mccray</td> <td>Post-Sales support</td> <td>Edinburgh</td> <td>46</td> <td>2011/03/09</td> <td>$324,050</td> </tr> <tr> <td>Unity Butler</td> <td>Marketing Designer</td> <td>San Francisco</td> <td>47</td> <td>2009/12/09</td> <td>$85,675</td> </tr> <tr> <td>Howard Hatfield</td> <td>Office Manager</td> <td>San Francisco</td> <td>51</td> <td>2008/12/16</td> <td>$164,500</td> </tr> <tr> <td>Hope Fuentes</td> <td>Secretary</td> <td>San Francisco</td> <td>41</td> <td>2010/02/12</td> <td>$109,850</td> </tr> <tr> <td>Vivian Harrell</td> <td>Financial Controller</td> <td>San Francisco</td> <td>62</td> <td>2009/02/14</td> <td>$452,500</td> </tr> <tr> <td>Timothy Mooney</td> <td>Office Manager</td> <td>London</td> <td>37</td> <td>2008/12/11</td> <td>$136,200</td> </tr> <tr> <td>Jackson Bradshaw</td> <td>Director</td> <td>New York</td> <td>65</td> <td>2008/09/26</td> <td>$645,750</td> </tr> <tr> <td>Olivia Liang</td> <td>Support Engineer</td> <td>Singapore</td> <td>64</td> <td>2011/02/03</td> <td>$234,500</td> </tr> <tr> <td>Bruno Nash</td> <td>Software Engineer</td> <td>London</td> <td>38</td> <td>2011/05/03</td> <td>$163,500</td> </tr> <tr> <td>Sakura Yamamoto</td> <td>Support Engineer</td> <td>Tokyo</td> <td>37</td> <td>2009/08/19</td> <td>$139,575</td> </tr> <tr> <td>Thor Walton</td> <td>Developer</td> <td>New York</td> <td>61</td> <td>2013/08/11</td> <td>$98,540</td> </tr> <tr> <td>Finn Camacho</td> <td>Support Engineer</td> <td>San Francisco</td> <td>47</td> <td>2009/07/07</td> <td>$87,500</td> </tr> <tr> <td>Serge Baldwin</td> <td>Data Coordinator</td> <td>Singapore</td> <td>64</td> <td>2012/04/09</td> <td>$138,575</td> </tr> <tr> <td>Zenaida Frank</td> <td>Software Engineer</td> <td>New York</td> <td>63</td> <td>2010/01/04</td> <td>$125,250</td> </tr> <tr> <td>Zorita Serrano</td> <td>Software Engineer</td> <td>San Francisco</td> <td>56</td> <td>2012/06/01</td> <td>$115,000</td> </tr> <tr> <td>Jennifer Acosta</td> <td>Junior Javascript Developer</td> <td>Edinburgh</td> <td>43</td> <td>2013/02/01</td> <td>$75,650</td> </tr> <tr> <td>Cara Stevens</td> <td>Sales Assistant</td> <td>New York</td> <td>46</td> <td>2011/12/06</td> <td>$145,600</td> </tr> <tr> <td>Hermione Butler</td> <td>Regional Director</td> <td>London</td> <td>47</td> <td>2011/03/21</td> <td>$356,250</td> </tr> <tr> <td>Lael Greer</td> <td>Systems Administrator</td> <td>London</td> <td>21</td> <td>2009/02/27</td> <td>$103,500</td> </tr> <tr> <td>Jonas Alexander</td> <td>Developer</td> <td>San Francisco</td> <td>30</td> <td>2010/07/14</td> <td>$86,500</td> </tr> <tr> <td>Shad Decker</td> <td>Regional Director</td> <td>Edinburgh</td> <td>51</td> <td>2008/11/13</td> <td>$183,000</td> </tr> <tr> <td>Michael Bruce</td> <td>Javascript Developer</td> <td>Singapore</td> <td>29</td> <td>2011/06/27</td> <td>$183,000</td> </tr> <tr> <td>Donna Snider</td> <td>Customer Support</td> <td>New York</td> <td>27</td> <td>2011/01/25</td> <td>$112,000</td> </tr> </tbody> <tfoot> <tr> <th>Name</th> <th>Position</th> <th>Office</th> <th>Age</th> <th>Start date</th> <th>Salary</th> </tr> </tfoot> 
			  </table>
			</div>
			`,
					data() {
						return {
							jqDT: {}
						}
					},
					mounted() {
						this.jqDT = $(this.$refs.jqDT).DataTable(ops);
					},

				}
			};
			return _obj;
		},
		'DataBase_Array'(_note = "") {
			var _obj = {
				_baseSet: {
					data: dataSet,
					columns: [
						{ title: "Name" },
						{ title: "Position" },
						{ title: "Office" },
						{ title: "Extn." },
						{ title: "Start date" },
						{ title: "Salary" }
					]
				},
				_vue: {
					template: `
		  <div>
			${_note}
			<table ref="jqDT" class="display" width="100%">
			  <tfoot>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
					<th>Start date</th>
					<th>Salary</th>
				</tr>
			  </tfoot>
			</table>
		  </div>
		  `,
					data() {
						return {
							jqDT: {}
						}
					},
					mounted() {
						this.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					},
				}
			};
			return _obj;
		},
		'DataBase_LoadArray'() {
			var _obj = Views.DataBase_Array();
			delete _obj._baseSet.data;
			_obj._vue = Object.assign(_obj._vue, {
				template: `
		<div>
		  <pre>這個範列是以 [DataBase_Array] 為基底,演示如何動態加載資料.</pre>
		  <button @click="Load">Load</button>
		  <table ref="jqDT" id="example" class="display" width="100%"></table>
		  </table>
		</div>
		`,
				methods: {
					Load() {
						this.jqDT
							.clear()
							.rows
							.add(dataSet)
							.draw();

						// 另一種比較麻煩的資料載入方式
						// var length = Object.keys(dataSet).length;
						// for (var i = 1; i < dataSet.length; i++) {
						//     var row = dataSet[i];
						//     $dt.row.add(row);
						// }
						// $dt.draw();
					}
				},
			})
			return _obj;
		},
		'DataBase_Json'(_note = "") {
			var _obj = {
				_data : window.gEx.mydata,
				_baseSet: {
					columns: [
						{ "title": "id", "data": "id" },
						{ "title": "invdate", "data": "invdate" },
						{ "title": "name", "data": "name" },
						{ "title": "note", "data": "note" },
						{ "title": "amount", "data": "amount" },
						{ "title": "tax", "data": "tax" },
						{ "title": "total", "data": "total" }
					]
				},
				_vue: {
					template: `
			<div>
			  ${_note}
			  <button @click="Load">Load</button>
			  <table ref="jqDT"  class="display" width="100%"></table>
			</div>
			`		, data() {
						return {
							jqDT: {}
						}
					},
					mounted() {
						this.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					},
					methods: {
						Load() {
							debugger
							this.jqDT
								.clear()
								.rows
								.add(_obj._data)
								.draw();
						}
					},
				}
			};
			return _obj;
		},


		'Responsive-自適應折行'(_note = null) {

			_note = _note ?? `<pre>[Ref]https://datatables.net/extensions/rowreorder/examples/initialisation/responsive.html
	1.rowReorder
	2.responsive
	</pre>`;
			var _obj = {
				_baseSet: {
					data: dataSet,
					columns: [
						{ title: "Name" },
						{ title: "Position" },
						{ title: "Office" },
						{ title: "Extn." },
						{ title: "Start date" },
						{ title: "Salary" }
					],
					rowReorder: {
						selector: 'td:nth-child(2)'
					},
					responsive: true,
				},

				_vue: {
					template: `
			<div >${_note}
			  <button @click="Switch=!Switch">switch</button>
			  <div class="row">
				<div class="panel" :class="[Switch?'col-lg-4':'col-lg-12']">
				   <div class="panel-body">
					  <div class="table-responsive">
						<table ref="jqDT" class="display" width="100%"></table>
					  </div>
				   </div>
				</div>
			  </div>
			</div>
			 `,
					data() {
						return {
							jqDT: {},
							Switch: false
						}
					},
					mounted() {
						this.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					}
				}
			};
			return _obj;
		},
		'Complex_headers'() {
			var _obj = {
				//https://datatables.net/extensions/fixedcolumns/examples/styling/rowspan.html
				_vue: {
					template: `
		   <div class="row">
			 <div class="col-lg-12">
			   <div class="panel panel-default">
				  <div class="panel-heading">
					 Data Tables |
					 <small>Zero Configuration + Export Buttons</small>
				  </div>
				  <div class="panel-body">
					  <div class="table-responsive">
					   <table id="example" class="display" width="100%"></table>
					   </table>
					  </div>
				  </div>
			   </div>
			 </div>
		   </div>
			`,
					mounted() {
						$('#example').DataTable(
							{
								data: dataSet,
								columns: [
									{ title: "Name" },
									{ title: "Position" },
									{ title: "Office" },
									{ title: "Extn." },
									{ title: "Start date" },
									{ title: "Salary" }
								],
								rowReorder: {
									selector: 'td:nth-child(2)'
								},
								responsive: true,
								scrollY: "300px",
								scrollX: true,
								scrollCollapse: true,
								paging: false,
								fixedColumns: true,
								buttons: [
									{ extend: 'copy', className: 'btn-sm' },
									{ extend: 'csv', className: 'btn-sm' },
									{ extend: 'excel', className: 'btn-sm', title: 'XLS-File' },
									{ extend: 'pdf', className: 'btn-sm', title: $('title').text() },
									{ extend: 'print', className: 'btn-sm' }
								]
							});
					}
				}
			};
			return _obj;
		},
		'Cell href'() {
			var _obj = Views.DataBase_Json(`<pre>這個範列是以 [DataBase_Json] 為基底,演示如何在 cell 欄位做加工處理.</pre>`);
			_obj._baseSet.columns[0].createdCell = (td, cellData, rowData, row, col) => {
				$(td).html(`<a href=#  onclick="alert('${cellData}');" >${cellData}</a>`)
			}
			return _obj;
		},
		'Hide Column'() {
			var _obj = Views.DataBase_Json(`<pre>這個範列是以 [DataBase_Json] 為基底,演示如何在 Hide 欄位(第0欄-id)</pre>`);
			_obj._baseSet.columnDefs = [
				{
					"targets": [0],
					"visible": false
				}
			];
			return _obj;
		},
		'Button Column'() {
			var _obj = Views.DataBase_Json(`<pre>這個範列是以 [DataBase_Json] 為基底,演示如何在 Colument 中,設定 buttton</pre>`);
			_obj._baseSet = {
				columns: [
					{
						"title": "操作",
						data: null,
						render: function ( data, type, row ) {
						  return '<button>exec</button>';
						}
					},
					{ "title": "id", "data": "id" ,
						createdCell(td, cellData, rowData, row, col){
							$(td).html(`<a href=#  onclick="alert('${cellData}');" >${cellData}</a>`)
						}
					},
					{ "title": "invdate", "data": "invdate" },
				]
			};
			_obj._vue.methods.click = function(){
				alert('test');
			}
			return _obj;
		},
		x() {
			var ops = {
				dom: 'Pfrtip',
				columnDefs: [
					{
						searchPanes: {
							controls: true,
						},
						targets: [4]
					}
				]
			};
			var _obj = Views.HtmlBase(`<pre>這個範列是以 [DataBase_Json] 為基底,演示如何在 cell 欄位做加工處理.</pre>`, ops);

			return _obj;
		},
		'Basic initialisation'() {
			//https://datatables.net/extensions/buttons/examples/initialisation/simple.html
		}

	};
	var API = {
		'Select Inputs'() {
			var _obj = Views.DataBase_Array(`<pre>這個範例是以 [DataBase_Json] 為基底,改寫 官網的範例
	  https://datatables.net/examples/api/multi_filter_select.html ,主要演示以下範例
	  1. initComplete
	  2. footer
		2.1 前提是 table 的結構中,必須要有 tfoot tag 
		2.2 使用 appendTo 將 select 物件加入
	  3. column.search() 應用
	  4. column.data().unique().sort() 應用 </pre>`);
			_obj._baseSet = Object.assign(_obj._baseSet, {
				initComplete() {
					debugger
					this.api().columns().every(function () {
						var column = this;
						var select = $('<select><option value=""></option></select>')
							.appendTo($(column.footer()).empty())
							.on('change', function () {
								var val = $.fn.dataTable.util.escapeRegex(
									$(this).val()
								);

								column
									.search(val ? '^' + val + '$' : '', true, false)
									.draw();
							});

						column.data().unique().sort().each(function (d, j) {
							select.append('<option value="' + d + '">' + d + '</option>')
						});
					});
				}
			})
			return _obj;
		},
		'Row Selection'() {
			var _obj = Views.DataBase_Json(`<pre>這個範例是以 [DataBase_Json] 為基底,改寫 官網的範例
	  https://datatables.net/examples/api/select_row.html ,主要演示以下範例
	  1. 觸發 selected 的機制 
	  2. rows('.selected').data() 如何取得 實際選取資料的方法</pre>
	  {{selected.length}}--{{selected}}
	`);
			_obj._vue = Object.assign(_obj._vue, {
				data() {
					return {
						jqDT: {},
						selected: []
					}
				},
				mounted() {
					var _self = this;
					_self.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					_self.jqDT.on('click', 'tr', function () {
						console.log(event);
						debugger
						$(this).toggleClass('selected');
						var _r = _self.jqDT.rows('.selected').data();
						var _arr = [];
						for (var i = 0; i < _r.length; i++) {
							_arr.push(_r[i]);
						}
						_self.selected = _arr;
					});
				},

			})
			return _obj;
		},
		'*Cell Click'() {
			var _obj = Views.DataBase_Json(`<pre>這個範例是以 [DataBase_Json] 為基底,改寫 官網的範例
	  https://datatables.net/examples/api/select_row.html ,主要演示以下範例
	  1. columnDefs 擴充定義樣式的設定 
		  columnDefs 用法與 columns 雷同,但主要的差別在於 columnDefs 
			可以使用 targets 將設定一次指給多個欄位 
	  2. 取得 選取行的資料的方法
		  row() 跟 rows() 的用法雷同,差別在
		  row => 回傳值為物件,適用單撃取值的情境
		  rows =>回傳值為陣列,適用取得複數資料的情境
	  3. column(this).dataSrc()  取得事件 tag 對應的綁定欄位
	  4. 增加 實作 button 的處理程序
	  5. 實作刪除 的處理程序
	  </pre>
	  <div>{{selected}}</div>
	`);
			_obj._baseSet.columnDefs = [
				
				{ className: "cell_button", "targets": [0] ,
					render: function (data, type, row) {
						return `<button class="cell_button">Del</button>`;
					}
				},
				{ className: "cell_0", "targets": [1] },
				{
					className: "e_click", "targets": [2, 3]
					, createdCell(td, cellData, rowData, row, col) {
						$(td).html(`<a href=#>${cellData}</a>`);
					}
				}
			];
			_obj._vue = Object.assign(_obj._vue, {
				data() {
					return {
						jqDT: {},
						selected: [],
					}
				},
				mounted() {
					var _self = this;
					_self.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					_self.jqDT.on('click','.cell_button',function(event){
						debugger
						//當前的 event 是綁在 button 本身觸發,所以必須要再往上取到 td ,
						// 	才有辦法取得正確的資料
						var _td = event.target.parentElement;
						var _r = _self.jqDT.row(_td).data();
						_self.selected = _r;
						_self.jqDT.row(_td).remove().draw();
					});
					_self.jqDT.on('click', '.cell_0', function () {
						debugger
						var _r = _self.jqDT.rows(this).data();
						//取得 cells , 但沒有實質效用
						var _c = _self.jqDT.cells(this);
						_self.selected = [_r[0]];
					});
					_self.jqDT.on('click', '.e_click', function () {
						//取得點撃來源的 綁定欄位名稱
						let filed = _self.jqDT.column(this).dataSrc();
						//取得點撃來源的 整欄資料
						var data = _self.jqDT.row(this).data();
						let _arr = [{ filed, data }];
						_self.selected = _arr;
					});
				},

			})
			return _obj;
		},
		'?Col ReSet'() {
			var _note = `
		 <pre>
		 
		 </pre>
		 `;
			var _obj = {
				_css: ``,
				_vue: {
					template: `
				  <div>
				  ${_note}
				  </div>
			  `,
					data() {
						return {
						}
					}
				}
			};
			return _obj;
		},

	};
	var Tool = {
		'jdt-table-ajax'() {
			var _note = `
			<pre>
			原本為了 使用 Ajax 的程序,要另外建一個 jdt-table-ajax , 結果實作的過程發現,
				原 table-ajax 只要 參考 [Ajax Function] 範例 ,設置 ajax 相關的程序和參數 ,
				就可以直接套用了,根本無需再另外實作,特此誌之
			</pre>
			`;
			var _obj = {
				_css: ``,
				_vue: {
					template: `
					<div>
						${_note}
						<jdt-table :jdt_set="jdt_set" 
									:jdt_data="jdt_data"	
										></jdt-table>
					</div>
					`,
					data() {
						return {
							jdt_set: {
								columns: [
									{ "title": "id", "data": "id" },
									{ "title": "invdate", "data": "invdate" },
									{ "title": "name", "data": "name" },
									{ "title": "note", "data": "note" },
									{ "title": "amount", "data": "amount" },
									{ "title": "tax", "data": "tax" },
									{ "title": "total", "data": "total" }
								],
								"responsive": true,
								"searching": false,
								columnDefs: [
									{
										className: 'e_click', "targets": [1]
										, createdCell(td, cellData, rowData, row, col) {
											$(td).html(`<a href='javascript:void(0)'>${cellData}</a>`);
										}
									}
								],
								serverSide: true, //此參數是設定資料使用 ajax call API 方式取得
								ordering: false,
								deferLoading: 0, //初始化DataTable時，不發出ajax
								ajax(data, callback, settings) {
									debugger
									let { draw } = data;
									var _len = window.tmpData.mydata.length;
									let _ApiBack = {
										/*必要,如果 server 端沒有回傳這個參數,就要此處補上,
											不然頁面不會刷新 
										*/
										draw,
										data: window.tmpData.mydata,
										recordsTotal: _len,
										recordsFiltered: _len,
									}
									//必須要執行這一段 callback ,資料才會刷新 
									callback(_ApiBack);
								}
							},
							jdt_data:window.tmpData.mydata
						}
					}
				}
			};
			return _obj;
		},
		Json2Colums() {
			var _note = `
		<pre>
		將 Json 的物件,直接轉換 欄位格式
		</pre>
		`;
			var _obj = {
				_vue: {
					template: `
				<div>
				${_note}
				JSON<input type=text v-model="json_code" /><BR />
				<textarea v-model="code"></textarea>
				</div>
				`,
					data() {
						return {
							json_code: '',
							arr_code: []
						}
					},
					computed: {
						code() {
							try {
								var _s = JSON.parse(this.json_code)
								var _arr = [];
								for (var i in _s) {
									_arr.push({ title: i, data: i })
								}
								this.arr_code = _arr;
							} catch (error) {
								var z = error;
							}

							return JSON.stringify(this.arr_code).replace(/\},\{/g, '},\n{');
						}
					},
				}
			};
			return _obj;
		},
	}
	var Case = {
		'href.click 衍生事件'() {
			var _obj = Views['Responsive-自適應折行'](`<pre>這個範列是以 [Responsive-自適應折行] 為基底,以演示下面的問題
	1.在自動折行的功能中, col[0] 的位置在點撃時,會觸發展開 隱藏欄位的功能
	2.在應用情境中,該欄位設 href 以實現開啟子視窗的功能
	現在的問題是,在觸發 功能2 時,會一併觸發 功能1,追查問題原因時發現,
	  功能1 的事件會 比 功能2的事件 先執行,這跟一般的事件觸發流程不一樣,
	  所以在功能2 中,下 停止事件的指令也沒用.
	最後是追查到 功能1 的實作底層時,研究它的事件綁定方式後才試出解法,
	  和範例中所示, v1,v2 的取法,功能1 的事件都會先觸發,
	  只有 v3 的取法才能讓 功能2 先觸發.</pre>`);
			_obj._baseSet.columnDefs = [
				{
					className: 'e_click'
					//指定那幾個欄位要套用這個功能
					, "targets": [0, 1]
					, createdCell(td, cellData, rowData, row, col) {
						$(td).html(`<a href='javascript:void(0)'>${cellData}</a>`);
					}
				}
			];

			_obj._vue = Object.assign(_obj._vue, {
				mounted() {
					var _self = this;
					_self.jqDT = $(this.$refs.jqDT).DataTable(_obj._baseSet);
					var _jq
						//= $(this.$refs.jqDT); //v1
						//= _self.jqDT.table().body(); //v2
						= $(_self.jqDT.table().body()); // v3
					_jq.on('click', '.e_click a', function (e) {
						e.preventDefault();
						e.stopPropagation();
						let _filed = _self.jqDT.column(this.offsetParent).dataSrc();
						var _data = _self.jqDT.row(this.offsetParent).data();
						console.log(_data);
					});
				}
			})

			return _obj;
		},
	}

	var Options = {
		'Ajax Function'() {
			var _note = `
		<pre>
		這個範例 只要是演示 datatables - ajax call API 取得資料的機制,
			以及其換頁控制處理機制.
		因為並沒有真正的API 可以 call ,所以此處只是模擬 ajax 取得資料後的處理程序,
			以及關鍵處理程序.
		</pre>
		`;
			var _obj = Views.DataBase_Json(_note);

			$.extend(_obj._baseSet, {
				serverSide: true, //此參數是設定資料使用 ajax call API 方式取得
				ordering: false,
				deferLoading: 0, //初始化DataTable時，不發出ajax
				ajax(data, callback, settings) {
					let { draw } = data;
					var _len = window.tmpData.mydata.length;
					let _ApiBack = {
						/*必要,如果 server 端沒有回傳這個參數,就要此處補上,
							不然頁面不會刷新 
						*/
						draw,
						data: window.tmpData.mydata,
						recordsTotal: _len,
						recordsFiltered: _len,
					}
					//必須要執行這一段 callback ,資料才會刷新 
					callback(_ApiBack);
				}
			});

			_obj._vue.methods = {
				//將 load 程序改成使用 draw , 以觸發 ajax 處理程序
				Load() {
					this.jqDT.draw();
				}
			}
			return _obj;
		},
		'分頁選項'() {
			var _note = `
			<pre>
			https://datatables.net/reference/option/language.lengthMenu
			設定分頁選項的功能
			</pre>
			`;
			var _obj = Views.DataBase_Json(_note);

			$.extend(_obj._baseSet, {
				"language": {
					"lengthMenu": 'Display <select>'+
					  '<option value="10">10</option>'+
					  '<option value="20">20</option>'+
					  '<option value="30">30</option>'+
					  '<option value="40">40</option>'+
					  '<option value="50">50</option>'+
					  '<option value="-1">All</option>'+
					  '</select> records'
				  }
			});
 
			return _obj;
		},
	}
	var PlugIns = {
		'datetime'() {
			var _note = `
			<pre>
			https://datatables.net/plug-ins/dataRender/datetime
			因應工作需求 ,需要做日期資料格式的轉換顯示 ,
			經實測的結果,其處理是應用 moment.js 來做轉換 ,
			重點是轉換時,是採用 moment({from},{to}) 的方式,
			所以 {from} 必須得要跟原始資料的格式一致,這樣才有辦法順利做 format 的動作
			格式可以參考
				http://momentjs.cn/docs/#/displaying/format/
			</pre>
			`;
			var _obj = Views.DataBase_Json(_note);
			_obj._data = [{"SID":"326c3575-00b4-41c6-b09e-04c050545efc","LOT_SID":"GTI19061310370703456","LOT":"Gti-20190613-05","OUTPUT_QTY":null,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20071514082626209","ACTION_LINK_SID_TRACE":"GTI20071514082626209","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":3.0,"WORK_TOTAL":159550.0,"WORK_DATE":null,"EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":null,"CREATE_USER":"Joseph","CREATE_DATE":"2020-07-15 00:00:00","UPDATE_USER":"Joseph","UPDATE_DATE":"2020-07-15 00:00:00"},{"SID":"54c7134f-fc06-4b79-b960-0b5c6ee1d6ef","LOT_SID":"GTI19061310370703457","LOT":"Gti-20190613-06","OUTPUT_QTY":null,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20072211244640681","ACTION_LINK_SID_TRACE":"GTI20072211244640681","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":2.0,"WORK_TOTAL":0.0,"WORK_DATE":null,"EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Joseph","CREATE_DATE":"2020-07-22 00:00:00","UPDATE_USER":"Joseph","UPDATE_DATE":"2020-07-22 00:00:00"},{"SID":"e64bfed6-695a-40b4-8299-1f4238b078df","LOT_SID":"GTI19061310370703472","LOT":"Gti-20190613-21","OUTPUT_QTY":null,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20072213302640885","ACTION_LINK_SID_TRACE":"GTI20072213302640885","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":2.0,"WORK_TOTAL":0.0,"WORK_DATE":null,"EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Joseph","CREATE_DATE":"2020-07-22 00:00:00","UPDATE_USER":"Joseph","UPDATE_DATE":"2020-07-22 00:00:00"},{"SID":"c68c5153-bfee-4e63-9c57-a0d638c248b8","LOT_SID":"GTI19061310370703460","LOT":"Gti-20190613-09","OUTPUT_QTY":25.0,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20081111575883131","ACTION_LINK_SID_TRACE":"GTI20081111575883131","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":1.0,"WORK_TOTAL":0.0,"WORK_DATE":"2020-08-11 00:00:00","EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Joseph","CREATE_DATE":"2020-08-11 00:00:00","UPDATE_USER":"Joseph","UPDATE_DATE":"2020-08-11 00:00:00"},{"SID":"d2652077-eb9a-4990-b8e8-72f8cf1f0b49","LOT_SID":"GTI19061310370703461","LOT":"Gti-20190613-10","OUTPUT_QTY":30.0,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20081112141783229","ACTION_LINK_SID_TRACE":"GTI20081112141783229","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":1.0,"WORK_TOTAL":0.0,"WORK_DATE":"2020-08-11 00:00:00","EQUIPMENT_LIST":"Stepper_001","EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Joseph","CREATE_DATE":"2020-08-11 00:00:00","UPDATE_USER":"Joseph","UPDATE_DATE":"2020-08-11 00:00:00"},{"SID":"6f632908-6a3c-4d07-83d7-f83770617e13","LOT_SID":"GTI19061310370703465","LOT":"Gti-20190613-14","OUTPUT_QTY":30.0,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20081317053187896","ACTION_LINK_SID_TRACE":"GTI20081317053187896","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":2.0,"WORK_TOTAL":0.0,"WORK_DATE":"2020-08-13 00:00:00","EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Admin","CREATE_DATE":"2020-08-13 00:00:00","UPDATE_USER":"Admin","UPDATE_DATE":"2020-08-13 00:00:00"},{"SID":"98342f52-f049-46c2-b92d-d6f7399bc4ab","LOT_SID":"GTI19061310370703464","LOT":"Gti-20190613-13","OUTPUT_QTY":30.0,"ROUTE_VER_OPER_SID":"GTI19041123550700964","STATUS":"Create","OPERATION_SID":"GTI19041123373400918","OPERATION":"設備進站","ACTION":"CalculatWorkHour","APPLICATION_NAME":"StationCheckOut","ACTION_LINK_SID":"GTI20081317035887889","ACTION_LINK_SID_TRACE":"GTI20081317035887889","WO_SID":"Gtimes2019Demo","WO":"Gtimes2019Demo","LINE_SID":null,"LINE_NO":null,"SHIFT_SID":"GTI20071015443415664","SHIFT_NO":"MorningShift","SHIFT":"早班","REPORT_TYPE":"ActualWorkingHours","REPORT_USER_NUM":1.0,"WORK_TOTAL":0.0,"WORK_DATE":"2020-08-13 00:00:00","EQUIPMENT_LIST":null,"EQUIPMENT_TOTAL":0.0,"CREATE_USER":"Admin","CREATE_DATE":"2020-08-13 00:00:00","UPDATE_USER":"Admin","UPDATE_DATE":"2020-08-13 00:00:00"}]
			_obj._baseSet = {
				"columns": [
					{
						"title": "報工日期",
						"data": "WORK_DATE"
					},
					{
						"title": "建立者",
						"data": "CREATE_USER"
					},
					{
						"title": "建立時間",
						"data": "CREATE_DATE"
					},
				],
				columnDefs: [
					{ targets: [0,2]
						,render: $.fn.dataTable.render.moment('YYYY-MM-DD HH:mm:ss','YYYY/MM/DD') },
				],
			}
			return _obj;
		},
	}
	return {
		Views,
		Options,
		API,
		Tool,
		Case,
		PlugIns
	};
};

(function () {
	var cfg = {
		paths: {
			"datatables.net":"https://cdn.datatables.net/1.10.20/js/jquery.dataTables"
			,"dataRender":"https://cdn.datatables.net/plug-ins/1.10.21/dataRender/datetime" 
		},
		shim:{
			'dataRender':{deps: ['jquery',"datatables.net",'moment']},
		}
	};

	var arr = ["jquery", "lodash", "vue","moment"
		,"datatables.net"
		,"dataRender"
		,"https://cdn.datatables.net/rowreorder/1.2.6/js/dataTables.rowReorder.js" 
		,"https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js" 
		,"https://cdn.datatables.net/fixedcolumns/3.3.0/js/dataTables.fixedColumns.min.js" 
		,"css!https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css"
		,"css!https://cdn.datatables.net/responsive/2.2.1/css/responsive.dataTables.min.css"
		,"css!https://cdn.datatables.net/rowreorder/1.2.6/css/rowReorder.dataTables.min.css" 
		,"css!https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css" 
	];
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg, __fn});
	}else{
		window.sample = __fn(window.$,window._,window.Vue);
	}
})();