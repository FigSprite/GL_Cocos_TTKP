window.BackMoveTime1 = 30;
window.BackMoveTime2 = 30;
window.BackMoveTime3 = 20;
window.BackMoveTime4 = 20;
window.BackMoveTime5 = 10;
window.BackMoveFloor = 10;

window.FloorMoveTime1 = 3;

window.MainMoveControlTime = 0.3;

window.BuyHeroScoreType = 0;//积分购买
window.BuyHeroMoneyType = 1;//金币购买
window.BuyHeroStoneType = 2;//石头购买
window.BuyTimeType = 3;      //未开放

window.FloorBlockMin = 0;//中间地板快
window.FloorBlockRight = 1;//右地板快
window.FloorBlockLeft = 2;//左地板快
window.FloorBlockNode= 3;//左地板快

window.FloorWidth = 120;//地板快宽度
//角色状态
window.HAS_Run = 0;
window.HAS_Jump1 = 1;
window.HAS_Jump2 = 2;
window.HAS_Roll = 3;

window.g_HeroBuyData = new Array();
window.g_HeroBuyData[0]={id:0,style:0,bTimeShow:false,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[5000,50]};
window.g_HeroBuyData[1]={id:1,style:1,bTimeShow:false,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[5000,200]};
window.g_HeroBuyData[2]={id:2,style:1,bTimeShow:true,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[5000,50]};