dayjs = require('dayjs')
// Web3 = require('web3')
//const { info } = require('console');
const { Wallet, ethers, BigNumber } = require('ethers');
// ethers= require('ethers')
predictabi = require("predict.json");
const WebSocket = require('ws');
const regression = require('regression');
const { copyRegisteredKernels } = require('@tensorflow/tfjs');

trainingData = [[]]
tx = 0

sell5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
buy5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
for (i = 0; i < 21; i++) {
  sell5[i] = 1811 / 29
  buy5[i] = 2400 / 29
}
sell5f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
buy5f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

//--------------
ndata = 50;
abnb = []
aeth = []
abtc = []
nt = 0;
//--------------------
ep = 0
sums = 0
sumb = 0


timec = 0;
ctimer = 0;
epochh = 0;
inp = 0
mon = 100;
tx = 0

min = 100000
max = 0

bets = {}
result = {}
tt = 100

it = 0

bstbid = 0
bstask = 0;
lastpr = 0
lastprf = 0;
lastpr5 = 0
lastprf5 = 0;
sum = 10
sum2 = 200
nit = 1
//--------------------------------------------
maker = []
taker = []
Timemin = 0
sellmin = 0
buymin = 0
b1s = 0
b1b = 0
bos = 0
bob = 0
time = 0
xArray = [];
yArray = [];
xArray2 = [];
yArray2 = [];
dx = 0
dxf = 0
bp = 0
sp = 0

//------------------------------------------------------------
sellminf = 0
buyminf = 0
b1sf = 0
b1bf = 0
bosf = 0
bobf = 0
timef = 0
xArrayf = [];
yArrayf = [];
xArray2f = [];
yArray2f = [];

bpf = 0
spf = 0
pr5m = 0
pr10m = 0
//--------------------------------------------------------------

//------------------------------------------------------------------





















min = 1000
max = 0

minf = 1000
maxf = 0
//--------------------------------------------------
const API = require('kucoin-node-sdk');

API.init(require('./config'));

// ws demo
const datafeed = new API.websocket.Datafeed();

// close callback
datafeed.onClose(() => {

  //console.log('ws closed, status ', datafeed.trustConnected);
  cnct()
});

async function cnct() {
  // connect
  datafeed.connectSocket();
  //console.log('connected')
  // subscribe

  //------------------------------------------------------------------------------------------
  const topicf = `/contractMarket/tickerV2:BNBUSDTM`;


  const orderbooksf = datafeed.subscribe("/contractMarket/level2Depth50:BNBUSDTM", (message) => {
    b1sf = 0
    b1bf = 0
    bosf = 0
    bobf = 0
    for (i = 0; i < 50; i++) {
      if (Number(message.data.bids[i][0]) > Number(message.data.bids[0][0]) - 0.002 * bstbid) {
        b1bf = b1bf + Number(message.data.bids[i][1])
      } else if (Number(message.data.bids[i][0]) < Number(message.data.bids[0][0]) - 0.002 * bstbid) {
        bobf = bobf + Number(message.data.bids[i][1])
      }

      if (Number(message.data.asks[i][0]) < Number(message.data.asks[0][0]) + 0.002 * bstbid) {
        b1sf = b1sf + Number(message.data.asks[i][1])
      } else if (Number(message.data.asks[i][0]) > Number(message.data.asks[0][0]) + 0.002 * bstbid) {
        bosf = bosf + Number(message.data.asks[i][1])
      }
    }

  });
  topictickf = "/contractMarket/execution:BNBUSDTM"
  const tickersf = datafeed.subscribe(topictickf, (message) => {
    if (message.topic === topictickf) {
      if (1) {
        if (message.data.side == 'sell') {//--------------------------------------------------
          sellminf = sellminf + Number(message.data.size);

        } else if (message.data.side == 'buy') {//--------------------------------------------------
          buyminf = buyminf + Number(message.data.size);

        }

      } else {
      }
    }
  });
  //--------------------------------------------------
  const callbackIdf = datafeed.subscribe(topicf, (message) => {
    if (message.topic === topicf) {
      bstaskf = message.data.bestAskPrice
      bstbidf = message.data.bestBidPrice

      it = it + 1;

      if (bstbidf > maxf) { maxf = Number(bstbidf) }
      if (bstbidf < minf) { minf = Number(bstbidf) }




    }
  });

  //----------------------------------------------------------------------
  /*
  
  
  
  const orderbooks = datafeed.subscribe("/spotMarket/level2Depth50:BNB-USDT", (message) => {
      b1s=0
      b1b=0
      bos=0
      bob=0
      for (i=0;i< 50; i++){
      if(Number(message.data.bids[i][0])>Number(message.data.bids[0][0])-0.002*bstbid){
      b1b=b1b+Number(message.data.bids[i][1])
  }else if(Number(message.data.bids[i][0])<Number(message.data.bids[0][0])-0.002*bstbid){
    bob=bob+Number(message.data.bids[i][1])
      }
  
      if(Number(message.data.asks[i][0])<Number(message.data.asks[0][0])+0.002*bstbid){
          b1s=b1s+Number(message.data.asks[i][1])
      }else if(Number(message.data.asks[i][0])>Number(message.data.asks[0][0])+0.002*bstbid){
        bos=bos+Number(message.data.asks[i][1])
          }
      }
  
  });
  */
  //--------------------------------------------------

  /*
  topictick="/market/match:BNB-USDT"
  const tickers = datafeed.subscribe(topictick, (message) => {
      if (message.topic === topictick) {
          if(1){
          if(message.data.side=='sell'){//--------------------------------------------------
  sellmin=sellmin+Number(message.data.size);
  
          }else if(message.data.side=='buy'){//--------------------------------------------------
              buymin=buymin+Number(message.data.size);
  
          }
        
      }else{
  }}
    });
    */
  //--------------------------------------------------
  const topic = `/market/ticker:BNB-USDT`;
  const callbackId = datafeed.subscribe(topic, (message) => {
    if (message.topic === topic) {
      bstask = message.data.bestAsk
      bstbid = message.data.bestBid

      it = it + 1;

      if (bstbid > max) { max = Number(bstbid) }
      if (bstbid < min) { min = Number(bstbid) }

      // console.log('realr= ',bstbid)




    }
  });
  //----------------------------------------------------------------------

}
//---------------------------------------------------



function writee() {

  //  console.log('pmax= ',pmax,' pmin= ',pmin,'tx= ',tx,' market= ',dx)

  fs.writeFile('test5.txt', ' dx bnb= ', dxbnb, ' dx eth= ', dxeth, ' dx btc= ', dxbtc, 'dx  Predicte= ', dxbnbp + "\n", { flag: 'a+' }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('writed down');
    }
    // file written successfully
  })
}

async function timmercondition() {
  var myfunc = setInterval(async function () {
    //console.log(ctimer)
    writee()
    summ = 150
    lastinp = inp
    d1 = buymin / summ
    d2 = sellmin / summ
    d3 = b1b / summ
    d4 = b1s / summ
    d5 = (bstbidf - bstbid) / 40 + 0.5
    d6 = (bstbid - lastpr) / 40 + 0.5
    inp = [d1, d2, d3, d4, d5, d6]

    // console.log(nit)
    // console.log('real= ',bstbidf)
    // console.log('realr= ',bstbid)
    min = 100000
    max = 0
    time = 0
    lastpr = Number(bstbid);
    lastprf = Number(bstbidf);
    sum2 = (9 * sum2 + 0.5 * b1b + 0.5 * b1s) / 10
    sum = (9 * sum + buymin - sellmin) / 10
    nit = nit + 1
    sellmin = 0
    buymin = 0
    b1s = 0
    b1b = 0
    bos = 0
    bob = 0

    sellminf = 0
    buyminf = 0
    b1sf = 0
    b1bf = 0
    bosf = 0
    bobf = 0

  }, 60000)
}


cnct();
//timmercondition()

timmersec3()
// timmercondition4()
timmercondition5()












let x = { 1: 1 };
let y1 = { 1: 1 };
let y2 = { 1: 1 };
totall = 0;
totall_Bear = 0;
totall_Bull = 0;
totall_Bear2 = 0;
totall_Bull2 = 0;
nup = 0;
ndown = 0;
mean3 = 15;
timec = 0;
ctimer = 0;
epochh = 0;
tnxs = 0;
timeaveragedbear = 0;
timeaveragedbull = 0;
restart = 0;
k = 0;
i = 0;
adrs = [];
sum = [];
meanBULL = 5;
meanBear = 5;
mon = 100;
sve = 0;

cnd = 0;
up55 = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
down55 = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
addup = { 0: 0 }
adddown = { 0: 0 }
console.log('connected')
cndup = 0;
cnddown = 0
bets = {}
result = {}
www = []
dir = 0;
ok = 0
addresses = {
  "0x8485C06C6162898c3c1Bba8630fBCDbcd81a9888": 0.67,
  "0x67aEb72D4727efB6A4712B29b2e3B78a3eA9f50e": 0.67,
  "0xC65D950E889185072a7994e2FA8afEA78AFc20A1": 0.6,
  "0xb31BD68beb42d5dcDde929e50de0210e40043821": 0.6,
  "0xbC00c3bd290678F6B93A8dbEbc0Ff3DE75672114": 0.6,
  "0x3f57EA477e0bBc7829B832deceC7fbcA9ecA1903": 0.6,
  "0xe39082BAb735b7EBeF0a83bD3C849ee7d3CC509C": 0.6,
  "0xfEFC48199d74D05640515f39096DE1125718147C": 0.6,
  "0xfc408BbF7625D5633C5f44A3393d831f06580DcB": 0.6,
  "0xC1c09D3bd2b2bEd7c9381c0Ad06Ed2cF52f459eb": 0.6
}
//https://bscscan.com/address/0x52a7b95fffed6eb1da2aee25f36f262a681ef004
//--------------------------------------------------

//---------------------------------------------------
async function main2() {
  //---------------------------------------------------------tx connect
  //-----------quiknode
  await connection();

  listentoend();
  listentostart()
  listentoup();
  listentodown();

}
main();

async function main() {
  await main2()
  ok = 1
  //timmersec2();

  timmersec();
  timmersec2();
}

async function timmersec() {
  var myfunc1 = setInterval(async function () {
    timestamp = dayjs().unix()
    ctimer = 300 - (timestamp - +round.startTimestamp);
    tt = tt - 1


    //--------------------------------------------------------
    if (ctimer == 9 || ctimer == 69 || ctimer == 129 || ctimer == 189 || ctimer == 249) {
      nt = nt + 1;
      if (nt < ndata) {
        abnb.push(bstbidbnb)
        aeth.push(bstbideth)
        abtc.push(bstbidbtc)
      } else {
        abnb.push(bstbidbnb)
        abnb.shift()

        abnb.push(bstbideth)
        abnb.shift()

        abnb.push(bstbidbtc)
        abnb.shift()
      }
      if (nt > 10) {
        corrr()
        console.log("r ", bstbid, ' dx bnb= ', dxbnb, ' dx eth= ', dxeth, ' dx btc= ', dxbtc, 'dx  Predicte= ', dxbnbp, ' s= ', sums.toFixed(6), ' b= ', sumb.toFixed(6), ' sellmin ', sellmin, ' buymin ', buymin, ' book sell ', b1s, ' book buy ', b1b)
      }
      if (ctimer == 9) {

        if (nt > 10) {
          corrr()
          writee()
          if (dxbnbp - dxbnb > 0.15) {
            bets[epochh] = 1;
          } else if (dxbnb - dxbnbp > 0.15) {
            bets[epochh] = -1;
          }
        }

        pr10m = pr5m
        pr5m = bstbid
      }
      sell5[20] = sellmin
      sell5.shift()

      buy5[20] = buymin
      buy5.shift()

      buymin = 0
      sellmin = 0

      sell5f[28] = sellminf
      sell5f.shift()

      buy5f[28] = buyminf
      buy5f.shift()

      buyminf = 0
      sellminf = 0


      clamingg()

      //--------------------------------------------------------
    }

  }, 1000)

}
async function timmersec2() {
  var myfunc1 = setInterval(async function () {
    if (tt < 0 && ctimer < -30) {
      main2()
      ok = 1
      // console.log(ctimer,' reset ')
    }
  }, 20000)
}





async function listentoend() {
  contrct.on("EndRound", async (epoch, roundid, value) => {
    let info = {
      roundid: roundid,
      epoch: epoch,
      value: ethers.utils.formatUnits(value, 18),
    };

    clamingg()
    // console.log("end of Time")
    // console.log(addresses)
    tt = 100
    round = await contrct['rounds'](contrct.currentEpoch()).catch()
    cndup = 0;
    cnddown = 0;
    addup = { 0: 0 }
    adddown = { 0: 0 }
  }


  )
}

async function listentostart() {
  contrct.on("StartRound", async (epoch) => {


    clamingg()
    // console.log("start of Time of ",Number(epochh)+1)

    tt = 100
    round = await contrct['rounds'](contrct.currentEpoch()).catch()
  }


  )
}
////////----------------------------***********************************
async function listentoup() {
  contrct.on("BetBull", async (from, epoch, value) => {
    let info = {
      from: from,
      epoch: epoch,
      value: ethers.utils.formatUnits(value, 18),
    };

    epochh = info.epoch;
    tt = 100
    round = await contrct['rounds'](contrct.currentEpoch()).catch()

  }
  )
}
async function listentodown() {

  contrct.on("BetBear", async (from, epoch, value) => {
    let info = {
      from: from,
      epoch: epoch,
      value: ethers.utils.formatUnits(value, 18),
    };

    epochh = info.epoch;
    tt = 50
    round = await contrct['rounds'](contrct.currentEpoch()).catch()
  });
}
//--------------------------------

//****************************** */



async function clamingg() {
  if (www[epochh - 2] == undefined) {
    www[epochh - 2] = 0
    roundchk = await contrct['rounds'](epochh - 2)
    btbull = roundchk.bullAmount
    btbear = roundchk.bearAmount

    totalllbt = Number(roundchk.totalAmount);
    closee = Number(roundchk.closePrice) * 1e-8
    openn = Number(roundchk.lockPrice) * 1e-8

    if (closee > openn) {
      console.log("e ", epochh - 2, " U ", closee - openn)
      rtio = totalllbt / btbull
      if (bets[epochh - 2] == undefined) { } else { result[epochh - 2] = bets[epochh - 2] }
    } else if (closee < openn) {
      console.log("e ", epochh - 2, " D ", closee - openn)
      rtio = totalllbt / btbear
      if (bets[epochh - 2] == undefined) { } else { result[epochh - 2] = (-1) * bets[epochh - 2] }
    } else {
      console.log("e ", epochh - 2, " 0")
      rtio = 0
    }

    if (result[epochh - 2] == undefined) { } else if (result[epochh - 2] == 1) {
      mon = rtio * (10) + mon - 10


    } else if (result[epochh - 2] == (-1)) {
      mon = mon - 10

    }
    //                 if(mon<100){sve=sve-100+mon
    //                         mon=100
    //                     }
    console.log('mon=', mon, '*********************************************')
  }

}
async function connection() {

  // web3=new Web3("wss://autumn-delicate-general.bsc.discover.quiknode.pro/568d2465266d5a1b0f3e16a8e698dfba670fad47/")
  provider = new ethers.providers.WebSocketProvider("wss://autumn-delicate-general.bsc.discover.quiknode.pro/568d2465266d5a1b0f3e16a8e698dfba670fad47/");

  //  web32=new Web3("wss://cold-quick-uranium.bsc.discover.quiknode.pro/b3c4d647c97fb8e2a68ac3af0e8e1d8f9f689d6d/")
  provider2 = new ethers.providers.WebSocketProvider("wss://cold-quick-uranium.bsc.discover.quiknode.pro/b3c4d647c97fb8e2a68ac3af0e8e1d8f9f689d6d/");
  //  console.log('connected')
  predictaddress = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA";
  contrct = new ethers.Contract(predictaddress, predictabi, provider2)
  //  contract4 = new ethers.Contract(predictaddress,predictabi,wallet)
  //  balance=await wallet.getBalance();
  round = await contrct['rounds'](contrct.currentEpoch()).catch()
  //console.log((balance )*1e-18);
  //  console.log('connected')
}






async function timmersec3() {
  var myfunc1 = setInterval(async function () {
    timestamp = dayjs().unix()

    sell5[28] = sellmin


    buy5[28] = buymin

    sell5f[28] = sellminf

    buy5f[28] = buyminf


    sums = 0;
    sell5.forEach(item => {
      sums += item;
    });

    sumb = 0;
    buy5.forEach(item => { sumb += item; });

    sumsf = 0;
    sell5f.forEach(item => {
      sumsf += item;
    });

    sumbf = 0;
    buy5f.forEach(item => { sumbf += item; });


    if (sumb / b1s > 1.3 * (sums / b1b) && sums / b1s > sumb / b1b && tx == 0 && sumb > 100) {
      tx = 1
      ep = bstbid
      //   console.log("########################")
      //   console.log("   U by ",sumb/b1s)

    }

    if ((sumb / b1s) * 1.3 < sums / b1b && sums / b1s < sumb / b1b && tx == 0 && sums > 100) {
      tx = -1
      ep = bstbid
      //   console.log("########################")
      //   console.log("   D by ",sums/b1b)

    }

    if (tx == 1 && sums / b1b > sumb / b1s && sumsf > sumbf) {
      tx = 0
      prof = bstbid - ep
      //   mon=mon+prof-0.25
      //   console.log("########################")
      //   console.log("   U ",mon)
    }


    if (tx == -1 && sums / b1b < sumb / b1s && sumsf < sumbf) {
      tx = 0
      prof = bstbid - ep
      //   mon=mon-prof-0.25
      //   console.log("########################")
      //   console.log("   D ",mon)
    }



  }, 1000)
}
async function timmercondition4() {
  var myfunc = setInterval(async function () {
    //console.log(ctimer)
    if (sumb / b1s > (sums / b1b) && sums / b1s > sumb / b1b) {
      st = ' # '
    } else if (sumb / b1s < (sums / b1b) && sums / b1s < sumb / b1b) {
      st = ' * '
    } else {
      st = ' - '
    }

    console.log("r ", bstbid, ' s= ', sums.toFixed(6), ' b= ', sumb.toFixed(6), ' sellmin ', sellmin, ' buymin ', buymin, ' book sell ', b1s, ' book buy ', b1b)



  }, 60000)
}


async function timmercondition5() {
  var myfunc = setInterval(async function () {
    //console.log(ctimer)



  }, 100000)
}

//-----------------------------------------------------------------------------------------------
const ws = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade');
ws.on('message', function incoming(data) {
  const trade = JSON.parse(data); // parsing a single-trade record
  if (trade['m'] == true) {//sell
    sellmin = sellmin + Number(trade['q']);

  } else if (trade['m'] == false) {//buy
    buymin = buymin + Number(trade['q']);

  }
  bstbidbnb = Number(trade['p'])


});
//-----------------------------------------------------------------------------------------------
const ws4 = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
ws4.on('message', function incoming(data) {
  const trade = JSON.parse(data); // parsing a single-trade record
  bstbidbtc = Number(trade['p'])


});
//-----------------------------------------------------------------------------------------------
const ws5 = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
ws5.on('message', function incoming(data) {
  const trade = JSON.parse(data); // parsing a single-trade record
  bstbideth = Number(trade['p'])


});
//-------------------------------------------------------------------------------------------------
const ws2 = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@depth5@100ms');
ws2.on('message', function incoming(data) {
  const trade = JSON.parse(data); // parsing a single-trade record
  b1s = 0
  b1b = 0
  bosf = 0
  bobf = 0
  for (i = 0; i < 5; i++) {
    if (1 == 1) {
      b1b = b1b + Number(trade['bids'][i][1])
    } else if (0 == 1) {
      bob = bob + Number(trade['bids'][i][1])
    }

    if (1 == 1) {
      b1s = b1s + Number(trade['asks'][i][1])
    } else if (0 == 1) {
      bos = bos + Number(trade['asks'][i][1])
    }
  }


});

//------------------------------------------------------------------------------------------------
// Load the necessary libraries
function corrr() {
  const regressionPoints = abnb.length;
  // Perform linear regression on the historical ETH and BNB price data
  const regressionData = [];
  for (let i = 0; i < regressionPoints; i++) {
    regressionData.push([aeth[i], abnb[i]]);
  }
  const result = regression.linear(regressionData, { precision: 6 });

  // Predict the change in BNB price based on the change in ETH price
  const dxeth = bstbideth / aeth[abnb.length - 11] - 1;
  const dxbnbp = result.equation[0] * ethChange + result.equation[1];
  dxbnb = bstbidbnb / abnb[abnb.length - 11] - 1
  dxbtc = bstbidbtc / abtc[abnb.length - 11] - 1
}

//find errors