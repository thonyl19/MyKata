/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import _ from 'lodash';
import {JSDOM} from 'jsdom';
import $ from 'jquery';
(()=>{
    ({
        
        plugins:'jsdom-quokka-plugin',
        jsdom: {html: `<div id="test">Hello</div>`}
    })

    var list_number = [
        '100.11',
        '100',
        '-100',
        '-100.1',
        '-100.11',
        '$100.11',
        '-$100.11',
        '.11',
        '10%',
        '10.1%',
        '-10%',
        '-10.1%',
    ];
    var fn = {
        'base'(){
            const dom = new JSDOM(`<div id="test">Hello</div>`);
            console.log(dom.window.document.body.outerHTML);
            var r = $(dom.window.document.body).html();
            r
        },
        '_t'(){
            var s = `
            <td class="CSFourCellTableTitleTD">
                <asp:Label ID="lblNO" runat="server" Text='<%$ Resources:Face, WO %>' CssClass="lblNotAuthorizedWO"></asp:Label>
            </td>
            <td class="CSFourCellTableContantTD">
                <asp:TextBox ID="txtNO" runat="server" CssClass="CSMustControl" MaxLength="255" Width="300px"></asp:TextBox>
            </td>
            `
            
            var r = $(s).find('asp');
            console.log(r);
            var r1 = r[0];//.attr('Text');
            console.log(r1);
            // var r2  = r1.attr('runat');
            // r2
            // var $xdoc = $.parseXML(s);
            // var $xml = $($xdoc);
            // var z1 = $xml.find('asp:Label');
            // z1;
        },
    }

    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()