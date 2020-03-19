var UserInfoData = cc.Class({
    extends: cc.Component,

    ctor:function(){
        this.m_Money = 10000;
        this.m_Score = 100;
        this.m_CurSelHeroID = 0;
        this.m_CurHAS_State = HAS_Run;
        this.m_HaveHero=new Array();
        this.m_HaveHero.push(this.m_CurSelHeroID);
    },
    isHaveHero:function(id)
    {
        for (var i = 0; i < this.m_HaveHero.length; i++) {
            if( this.m_HaveHero[i] == id )
            {
                return true;
            }
        }
        return false;
    },
});
window.g_UserInfoData = new UserInfoData();
window.g_RoomScene = null;
window.g_FloorStarPosX = 0;