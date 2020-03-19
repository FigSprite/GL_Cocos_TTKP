cc.Class({
    extends: cc.Component,

    properties: {
        m_Score:cc.Label,
        m_Money:cc.Label,
    },

    // use this for initialization
    onLoad: function () {

        this.updateUserDataInfo();
    },
    setScore:function(score)
    {
        this.m_Score.string = score.toString();
        
    },
    setMoney:function(money)
    {
        var value = '' + money;
        if( money > 10000 )
            value = ''+(money /10000 )+'万';
        this.m_Money.string = value;
    },
    updateUserDataInfo:function()
    {
        this.setScore(g_UserInfoData.m_Score);
        this.setMoney(g_UserInfoData.m_Money);
    },
    onAddScore:function()
    {
        g_UserInfoData.m_Score += 100;
        this.updateUserDataInfo();
    },
    onAddMoney:function()
    {
        g_UserInfoData.m_Money += 100;
        this.updateUserDataInfo();

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
