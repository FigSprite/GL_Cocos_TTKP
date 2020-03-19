cc.Class({
    extends: cc.Component,

    properties: {
        m_FloorBlock:[cc.Prefab],
    },

    // use this for initialization
    onLoad: function () {
        this.m_offset_start = 0;
        this.m_offset_end = 0;
    },
    changeFloor:function()
    {
    //     this.node.removeAllChildren();
    //     //断崖
    //     var Cliff = false;
    //     var CliffWidth = 0;
    //     var CliffPosX = 0;
    //    if( cc.random0To1() > 0.5)
    //     {
    //         Cliff = true;
    //         CliffWidth = 140 + cc.random0To1()*140;
    //         CliffPosX = this.node.width*cc.random0To1();
    //     }
    //     var starX = g_FloorStarPosX;
    //     this.m_offset_start = starX;
    //     while( true )
    //     {
    //         var floor = cc.instantiate(this.m_FloorBlock[FloorBlockMin]);
    //         this.node.addChild(floor);
    //         var right = cc.instantiate(this.m_FloorBlock[FloorBlockRight]);
    //         this.node.addChild(right);
    //         var left = cc.instantiate(this.m_FloorBlock[FloorBlockLeft]);
    //         this.node.addChild(left);
    //         right.zIndex = 100;

    //         floor.x = starX;
    //         starX += floor.width;

    //         if( Cliff )
    //         {
    //             if( starX > CliffPosX)
    //             {
    //                 right.x = starX;
    //                 starX += CliffWidth;
    //                 left.x = starX - left.width;
    //             }
    //         }
    //         if( starX > this.node.width )
    //         {
    //             g_FloorStarPosX = starX - this.node.width;
    //             this.m_offset_end = g_FloorStarPosX;
    //             break;
    //         }
    //     }
            var starPos = 0;
            for (var i = 0; i < this.m_BaseView.m_Floor.length; i++) {
                if( this.m_BaseView.m_Floor[i] == this.node && i != 0)
                {
                    starPos = this.m_BaseView.m_Floor[i-1].x + this.m_BaseView.m_Floor[i-1].width;
                }
                
            }
            this.node.x = starPos;

            var left = cc.instantiate(this.m_FloorBlock[FloorBlockLeft]);
            this.node.addChild(left);
            left.x = 0;
            var posX = left.width;

            var count = this.myRandow(3,10);
            // count = 1;
            for (var i = 0; i < count; i++) {
                var floor = cc.instantiate(this.m_FloorBlock[FloorBlockMin]);
                this.node.addChild(floor);
                floor.x = posX;
                posX += floor.width;
            }

            var right = cc.instantiate(this.m_FloorBlock[FloorBlockRight]);
            this.node.addChild(right);
            right.x = posX;

            posX += right.width;

            this.node.width = posX+this.myRandow(100,200);

            //v = s/t
            //t = s/v
            var s = this.node.x+this.node.width;

            var move = cc.moveTo(s/100,cc.p(-(this.node.width),0));
            var sql = cc.sequence(move,cc.callFunc(function(){
                var floor = this.m_BaseView.m_Floor.shift();
                this.m_BaseView.m_Floor.push(floor);
                this.changeFloor();
            },this,this.node));
            this.node.runAction(sql);

    },
    setBaseView:function(view)
    {
        this.m_BaseView = view;
    },
    myRandow:function(min,max)
    {
        var count = cc.random0To1()*10000;
        count = count%((max-min)+min);
        return count;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
