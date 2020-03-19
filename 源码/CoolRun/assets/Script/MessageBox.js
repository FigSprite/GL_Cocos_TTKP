cc.Class({
    extends: cc.Component,

    properties: {
        m_TitleLabel:cc.Label,
        m_TextLabel:cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },
    onShow:function(bShow)
    {
        this.node.active = bShow;
    },
    setTitle:function(str)
    {
        this.m_TitleLabel.string = str;
    },
    setText:function(str)
    {
        this.m_TextLabel.string = str;
    },
    setCallBack:function(callBack)
    {
        this.m_CallBack = callBack;
    },
    onClickOk:function()
    {
        if( this.m_CallBack != null )
            this.m_CallBack();

        this.onShow(false);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
