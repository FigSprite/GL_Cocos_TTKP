cc.Class({
    extends: cc.Component,

    properties: {
        m_Body:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
    },

    setBodyScale:function(x,y)
    {
        this.m_Body.setScale(x,y);

    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
