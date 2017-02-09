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
        profile: null,
    },
    methods: {
        loadHeroProfile: function(hero_id) {
            this.$http.get(`http://hahow-recruit.herokuapp.com/heroes/${hero_id}/profile`).then(function(res) {
                return res.json();
            }).then(function(data){
                this.profile = data;
            });
        }
    }
});
