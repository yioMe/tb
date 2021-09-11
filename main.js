
let dom = document.getElementById('tp-bought-root');
let od = dom.getElementsByClassName('js-order-container');

async function start(){
    for (let index = 0; index < od.length; index++) {
        let elementOd = od[index].dataset.reactid.substring(od[index].dataset.reactid.indexOf('-')+1,)
        .slice(-18);
        await go(elementOd).then(data => {
            console.log("成功订单"+JSON.stringify(data));
        }).catch(err => {
            console.log("失败订单"+JSON.stringify(err));
        });
       
    }
    console.log("本页删除完毕，自动刷新");
    location.reload();
}

async function go(elementOd){
    return new Promise(async (res,rej) => {
        fetch("https://buyertrade.taobao.com/trade/itemlist/asyncBought.htm?action=itemlist/RecyleAction&event_submit_do_delete=1&_input_charset=utf8&order_ids="+elementOd+"&isArchive=true&ran="+ Math.random(),
        {method:'post'}
        ).then(async data => {
            res(elementOd)
        }).catch(async err => {
            rej(elementOd)
        })
    })
}

start();
