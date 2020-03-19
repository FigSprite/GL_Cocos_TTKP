cc.Class({
    extends: cc.Component,

    properties: {
        m_BtAction:[cc.Node],
        m_BtPlayerInfo:[cc.Node],
        m_MainView:cc.Node,
        m_SelPlayerView:cc.Node,
        m_RichText:cc.RichText,
        m_SelHeroPrefab:cc.Prefab,
        m_ScrollContent:cc.Node,
        m_HeroPrefab:[cc.Prefab],
        m_HeroEyeClip:cc.Node,
        m_UserDataInfo:cc.Node,
        m_MessageBoxPrefab:cc.Prefab,
        m_SelectPlayerView:cc.Node,
        m_MainViewHero:cc.Node,
        // m_btModel:[cc.Button]
    },
    // use this for initialization
    onLoad: function () {

        g_RoomScene = this;
        this.m_MessageBox = cc.instantiate(this.m_MessageBoxPrefab);
        this.node.addChild(this.m_MessageBox);
        this.m_MessageBox = this.m_MessageBox.getComponent('MessageBox');
        this.m_MessageBox.onShow(false);


        this.setHeroEyeClipStyle(0);
        
        this.m_UserDataInfo = this.m_UserDataInfo.getComponent('UserDataInfo');
        // this.m_RichText.string = '<color=#FAFCDF><outline color=#9E733D width=3>11111</outline></c>';
        this.m_MainView.setPosition(0,0);
        this.m_SelPlayerView.active = false;
        this.btStartPos = new Array();
        for (var i = 0; i < this.m_BtAction.length; i++) {
            this.btStartPos[i] = this.m_BtAction[i].getPosition();
        }


        for (var i = 0; i < this.m_BtPlayerInfo.length; i++) {
            var sprite = this.m_BtPlayerInfo[i].getChildByName('Pressed');
            sprite.active = false;
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_START,this.touchShowTexture,this);
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_END,this.touchHideTexture,this);
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_CANCEL,this.touchHideTexture,this);
        }

        
        this.m_SelectPlayerView = this.m_SelectPlayerView.getComponent('SelectPlayerView');
        this.m_SelectPlayerView.updateHero();
    },
    setHeroEyeClipStyle:function(heroID)
    {
        // var heroData ;
        // for (var i = 0; i < this.m_HeroData.length; i++) {
        //     if(this.m_HeroData[i].id == id)
        //         heroData = this.m_HeroData[i];
        // }
        g_UserInfoData.m_CurSelHeroID = heroID;
        this.m_HeroEyeClip.removeAllChildren();
        var hero = cc.instantiate(this.m_HeroPrefab[heroID]);
        this.m_HeroEyeClip.addChild(hero);
        hero = hero.getComponent('SelHeroUiPrefab');
        if( heroID == 1 )
        {
            hero.setBodyScale(0.8,0.8);
        }
        else{
            
            hero.setBodyScale(1,1);
        }

    },
    touchShowTexture:function(target)
    {
        // this.m_MountTexture.node.active = true;
        var sprite = target.target.getChildByName('Pressed');
        sprite.active = true;
    },
    touchHideTexture:function(target)
    {
        // this.m_MountTexture.node.active = false;

        var sprite = target.target.getChildByName('Pressed');
        sprite.active = false;
    },
    onChangeScene:function(){
        cc.director.loadScene("GameScene");
    },
    onActionBtOutOrIn:function(Out)
    {
        for (var i = 0; i < this.m_BtAction.length; i++) {
            var delaTime = cc.delayTime(0.1*i);
            var moveTo;
            if( Out )
            {
                moveTo = cc.moveTo(MainMoveControlTime,cc.p(350,this.btStartPos[i].y));
            }
            else{
                moveTo = cc.moveTo(MainMoveControlTime,this.btStartPos[i]);
            }
            var fun = function(target,data)
            {
                if( data.index == this.m_BtAction.length-1)
                {
                    if( data.value )
                    {
                        this.callOpenPlayerView(this);
                    }
                    else{
                        this.callOpenMainView(this);
                            
                    }
                }
            };
            
            var callBack = cc.callFunc(fun,this,{index:i,value:Out});
            var sql = cc.sequence(delaTime,moveTo,callBack);

            this.m_BtAction[i].runAction(sql);
        }

        var heroMove ;
        var fade;
        if( Out )
        {
            heroMove = cc.moveTo(MainMoveControlTime,cc.p(52,0));
            fade = cc.fadeOut(MainMoveControlTime);
        }
        else{
            heroMove = cc.moveTo(MainMoveControlTime,cc.p(-124,0));
            fade = cc.fadeIn(MainMoveControlTime);
        }

        var spawn = cc.spawn(heroMove,fade);
        this.m_MainViewHero.runAction(spawn);
    },
    callOpenPlayerView:function()
    {
        this.m_MainView.active = false;
        this.m_SelPlayerView.active = true;
    },
    onOpenPlayerView:function(){

        this.onActionBtOutOrIn(true);
    },
    callOpenMainView:function()
    {
        this.m_MainView.active = true;
        this.m_SelPlayerView.active = false;
    },
    onOpenMainView:function()
    {
        this.m_MainView.active = true;
        this.m_SelPlayerView.active = false;

        this.onActionBtOutOrIn(false);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
