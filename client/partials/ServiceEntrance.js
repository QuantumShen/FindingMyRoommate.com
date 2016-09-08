Template.ServiceEntrance.onCreated(function(){
    this.autorun(()=> {
        this.subscribe('RidesCount');
    });      
});
Template.ServiceEntrance.helpers({
    services:[
        {
            path:"/rides",
            imgPath:"/images/shareride.png",
            title: "Share A Ride",
            chineseTitle: "拼车",
            description:"Start or join a ride share",
            chineseDescription: "发布或寻找拼车信息",
            activeName: "Active Rides",
            activeNumber: function(){
                return Counts.get("rides-count");
            }, //todo
        },
        {
            path:"/roommates",
            imgPath:"/images/roommates.png",
            title: "Find Roommates",
            chineseTitle: "找室友",
            description:"Start or join a roommates group",
            chineseDescription: "找室友一起租房子",
            activeName: "Active Groups",
            activeNumber: 0, //todo
        },{
            path:"/subleases",
            imgPath:"/images/sublease.png",
            title: "Sublease Information",
            chineseTitle: "转租",
            description:"Provide or ask for sublease",
            chineseDescription: "提供或寻找转租",
            activeName: "Active Subleases",
            activeNumber: 0, //todo
        },

    ]
});
