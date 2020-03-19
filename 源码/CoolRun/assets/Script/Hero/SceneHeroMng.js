cc.Class({
    extends: cc.Component,

    properties: {
        m_HeroAnim:cc.Animation,
    },

    // use this for initialization
    onLoad: function () {
        this.touchingNumber = 0;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },
    play:function(playName)
    {
        if( playName == 'Run')
        {
            g_UserInfoData.m_CurHAS_State = HAS_Run;
        }
        else  if( playName == 'Jump')
        {
            g_UserInfoData.m_CurHAS_State = HAS_Jump1;
        }
        else  if( playName == 'Roll')
        {
            g_UserInfoData.m_CurHAS_State = HAS_Roll;
        }
        var name = playName + g_UserInfoData.m_CurSelHeroID;
        this.m_HeroAnim.play(name);
    },
    getCurrentClipName:function()
    {
        return this.m_HeroAnim.currentClip.name;
    },
    //碰撞开启
    onCollisionEnter: function (other) {
        this.m_HeroAnim.node.color = cc.Color.RED;
        this.touchingNumber ++;
    },
    //碰撞进行
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    //碰撞结束
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.m_HeroAnim.node.color = cc.Color.WHITE;
        }
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
