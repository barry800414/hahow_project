var heroList = new Vue({
    el: '#hero-list',
    data: {
        heros: null,
    },
    created: function() {
        this.$http.get("http://hahow-recruit.herokuapp.com/heroes").then(function(res) {
            return res.json();
        }).then(function(data){
            this.heros = data;
        });
    },
    methods: {
        loadHero: function(hero_id){
            heroProfile.loadHeroProfile(hero_id);
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
            this.$http.patch(`http://hahow-recruit.herokuapp.com/heroes/${this.hero_id}/profile`, this.profile).then(function(res) {
                //update success
            }, function(error){
                //update failed
            });
        }
    }
});
