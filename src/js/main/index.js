var heroList = new Vue({
    el: '#hero-list',
    data: {
        heros: null,
    },
    created: function() {
        //send request to get hero list, and update hero list interface
        this.$http.get("http://hahow-recruit.herokuapp.com/heroes").then(function(res) {
            return res.json();
        }).then(function(data){
            this.heros = data;
        });
    },
    methods: {
        loadHero: function(hero_id){
            //use router to invoke loading hero profile function
            router.setRoute(`/heros/${hero_id}`);
        }
    }
});

var heroProfile = new Vue({
    el: "#hero-profile",
    data: {
        hero_id: 0,
        profile: null,
        remain_points: 0,
    },
    methods: {
        //reset heroProfile to initial status
        resetHeroProfile: function() {
            this.profile = null;
            this.remain_points = 0;
            this.hero_id = 0;
        },
        loadHeroProfile: function(hero_id) {
            this.$http.get(`http://hahow-recruit.herokuapp.com/heroes/${hero_id}/profile`).then(function(res) {
                return res.json();
            }).then(function(data){
                this.profile = data;
                this.hero_id = hero_id;
            });
        },
        addPoint: function(type) {
            if(this.remain_points > 0){
                this.profile[type] = this.profile[type] + 1;
                this.remain_points = this.remain_points - 1;
            }
        },
        minusPoint: function(type) {
            if(this.profile[type] > 0){
                this.profile[type] = this.profile[type] - 1;
                this.remain_points = this.remain_points + 1;
            }
        },
        updateProfile: function() {
            if(this.remain_points !== 0){
                alert("剩餘點數應為0");
            } else {
                this.$http.patch(`http://hahow-recruit.herokuapp.com/heroes/${this.hero_id}/profile`, this.profile).then(function(res) {
                    alert('更新成功');
                }, function(error){
                    alert('更新失敗:', error);
                });    
            }
            
        }
    }
});

const router = Router({
  "/heros": {
    on: () => {
        heroProfile.resetHeroProfile();
    },
  },
  "/heros/:hero_id": {
    on: (hero_id) => {
        heroProfile.loadHeroProfile(hero_id);
    },
  },
}).configure({
  notfound: () => {
    router.setRoute(`/heros`);
  },
});

// wait the event trigger
router.init(["/"]);
