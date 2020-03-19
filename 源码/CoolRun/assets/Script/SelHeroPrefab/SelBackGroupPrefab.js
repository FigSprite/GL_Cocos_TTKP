cc.Class({
    extends: cc.Component,

    properties: {
        m_BackGroup:cc.Sprite,
        m_GameUI:cc.SpriteAtlas,
        m_BtOk:cc.Node,
        m_LeftRight:[cc.Node],
        m_ScoreType:[cc.Sprite],
        m_Score:[cc.Label],
        m_TimeLable:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
    },
    setRoomScene:function(scene)
    {
        this.m_RoomScene = scene;
    },
    setHeroStyle:function(heroData)
    {
        if( this.m_RoomScene.m_HeroPrefab[heroData.id] == null )
            return ;
        var hero = cc.instantiate(this.m_RoomScene.m_HeroPrefab[heroData.id]);
        this.m_BackGroup.node.addChild(hero);
        hero = hero.getComponent('SelHeroUiPrefab');
        if( heroData.id == 1 )
        {
            hero.setBodyScale(0.3,0.65);
        }
        else{
            
            hero.setBodyScale(0.3,0.7);
        }

    },
    setStyle:function(heroData)
    {
        if( heroData == null )
            return ;
        cc.log(heroData.style);
        //黄色背景图
        if( heroData.style ==  0)
        {
            var frame = this.m_GameUI.getSpriteFrame('GameUI16');
            this.m_BackGroup.spriteFrame = frame;
            this.m_BackGroup.node.width = 104;
            this.m_BackGroup.node.height = 310;
        }
        //蓝色背景图
        else if( heroData.style == 1 )
        {
            var frame = this.m_GameUI.getSpriteFrame('GameUI17');
            this.m_BackGroup.spriteFrame = frame;
            this.m_BackGroup.node.width = 90;
            this.m_BackGroup.node.height = 310;
        }
        else{
            var frame = this.m_GameUI.getSpriteFrame('GameUI17');
            this.m_BackGroup.spriteFrame = frame;
            this.m_BackGroup.node.width = 90;
            this.m_BackGroup.node.height = 310;
        }
        this.setHeroStyle(heroData);
        this.m_HeroData = heroData;

        // this.setBuyHero(!g_UserInfoData.isHaveHero(heroData.id));
        if( g_UserInfoData.isHaveHero(heroData.id) )
        {
            this.setBuyHero(false,heroData.id);
        }
        else 
        {
            this.setBuyHero(true,heroData.id);
        }
        this.setTimeOpenBuyHero(heroData.id);
    },
    onSelHero:function()
    {
        this.m_RoomScene.setHeroEyeClipStyle(this.m_HeroData.id);
        this.m_RoomScene.onOpenMainView();
    },
    setTimeOpenBuyHero:function(heroId)
    {

        for (var i = 0; i < g_HeroBuyData.length; i++) {
            if( g_HeroBuyData[i].id == heroId)
            {
                this.m_TimeLable.active = g_HeroBuyData[i].bTimeShow;
                if(g_HeroBuyData[i].bTimeShow)
                {
                    this.m_LeftRight[0].active = false;
                    this.m_LeftRight[1].active = false;
                    this.m_BtOk.active = false;
                }
            }
        }
    },
    setBuyHero:function(buy,heroId)
    {
        if( buy )
        {
            this.m_LeftRight[0].active = true;
            this.m_LeftRight[1].active = true;
            this.m_BtOk.active = false;

            for (var i = 0; i < g_HeroBuyData.length; i++) {
                if( g_HeroBuyData[i].id == heroId)
                {
                    // money:5000,score:50
                    this.m_BuyHeroNeedData = g_HeroBuyData[i];
                    this.changeBuyHeroScoreTypeTexture(g_HeroBuyData[i]);
                    break;
                }
                
            }
        }
        else
        {
            this.m_LeftRight[0].active = false;
            this.m_LeftRight[1].active = false;
            this.m_BtOk.active = true;
        }
    },
    changeBuyHeroScoreTypeTexture:function(heroData)
    {
        var frame = null;
        var tmp=new Array();
        // var valueType = [heroData.valueType1,heroData.valueType2];
        // var value = [heroData.value1,heroData.value2];
        for (var i = 0; i < 2; i++) {
                
            var bShow = false;
            if( heroData.valueType[i] == BuyHeroScoreType)
            {
                frame = this.m_GameUI.getSpriteFrame('GameUI21');
                bShow = true;
            }
            else if( heroData.valueType[i] == BuyHeroMoneyType)
            {
                frame = this.m_GameUI.getSpriteFrame('GameUI18');
                bShow = true;

            }
            else if( heroData.valueType[i] == BuyHeroStoneType)
            {
                frame = this.m_GameUI.getSpriteFrame('01_14_14');
                bShow = true;

            }
            else if(heroData.valueType[i] == BuyTimeType)
            {
                bShow = false;
            }
            this.m_ScoreType[i].spriteFrame = frame;
            this.m_Score[i].string = ''+heroData.value[i];

            this.m_ScoreType[i].node.active = bShow;
            this.m_Score[i].node.active = bShow;

            this.m_LeftRight[i].active = bShow;
        }
    },

    onClickBuyHero:function(target,data)
    {
        // var tmpValueType=[this.m_BuyHeroNeedData.valueType1,this.m_BuyHeroNeedData.valueType2];
        // var tmpValue=[this.m_BuyHeroNeedData.value1,this.m_BuyHeroNeedData.value1];
        var index = parseInt(data);
        // if( data == 'left')
        // {
        //     index = 0;
        // }
        // else if( data == 'right')
        // {
        //     index = 1;
        // }

        if( this.m_BuyHeroNeedData.valueType[index] == BuyHeroScoreType)
        {
            
            if( g_UserInfoData.m_Score < this.m_BuyHeroNeedData.value[index] )
            {
                g_RoomScene.m_MessageBox.onShow(true);
                g_RoomScene.m_MessageBox.setText('钻石不够,还差'+ (this.m_BuyHeroNeedData.value[index] - g_UserInfoData.m_Score)+'钻石!');
                g_RoomScene.m_MessageBox.setCallBack(function()
                {
                    
                });
            }
            else{
                g_UserInfoData.m_Score -= this.m_BuyHeroNeedData.value[index];
                g_UserInfoData.m_HaveHero.push(this.m_BuyHeroNeedData.id);
            }
        }
        else if( this.m_BuyHeroNeedData.valueType[index] == BuyHeroMoneyType)
        {
            
            if( g_UserInfoData.m_Money < this.m_BuyHeroNeedData.value[index] )
            {
                g_RoomScene.m_MessageBox.onShow(true);
                g_RoomScene.m_MessageBox.setText('金币不够,还差'+ (this.m_BuyHeroNeedData.value[index] - g_UserInfoData.m_Money)+'金币!');
                g_RoomScene.m_MessageBox.setCallBack(function()
                {
                    
                });
            }
            else{
                g_UserInfoData.m_Money -= this.m_BuyHeroNeedData.value[index];
                g_UserInfoData.m_HaveHero.push(this.m_BuyHeroNeedData.id);
            }
        }
        else if( this.m_BuyHeroNeedData.valueType[index] == BuyHeroStoneType)
        {

        }

        g_RoomScene.m_SelectPlayerView.updateHero();
        g_RoomScene.m_UserDataInfo.updateUserDataInfo();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
