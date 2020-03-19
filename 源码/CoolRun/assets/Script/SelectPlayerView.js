cc.Class({
    extends: cc.Component,

    properties: {

    },

    ctor:function()
    {
        this.m_HeroPageView = new Array();
        this.m_HeroData = new Array();

    },
    // use this for initialization
    onLoad: function () {

    },
    updateHero:function()
    {
        g_RoomScene.m_ScrollContent.removeAllChildren();
        for (var i = 0; i < g_HeroBuyData.length; i++) {

            this.m_HeroPageView[i] = cc.instantiate(g_RoomScene.m_SelHeroPrefab);
            g_RoomScene.m_ScrollContent.addChild(this.m_HeroPageView[i]);
            var prefab = this.m_HeroPageView[i].getComponent('SelBackGroupPrefab');
            prefab.setRoomScene(g_RoomScene);
            prefab.setStyle(g_HeroBuyData[i]);
        }

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
