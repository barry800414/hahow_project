Vue.component('hero-card', {
    template: "#hero-card-template",
    props: ["hero", "selected_hero"],
    data: function() {
        return {
            loaded: false,
        }
    },
    methods: {
        loadHeroByClick: function() {
            this.loadHero(this.hero.id);
            router.setRoute(`/heros/${this.hero.id}`);
        },
        loadHero: function(){
            heroProfile.loadHeroProfile(this.hero.id);
            this.$emit("select-hero", this.hero.id);
        },
        imageLoaded: function(){
            this.loaded = true;
            this.$emit("image-loaded");
        }
    }
});

var heroList = new Vue({
    el: '#hero-list',
    data: {
        heros: null,
        selected_hero: -1,
        loading: false,
        n_img_loaded: 0,
        n_img_to_load: 0,
    },
    created: function() {
        this.loading = true;
        //send request to get hero list, and update hero list interface
        this.$http.get("http://hahow-recruit.herokuapp.com/heroes").then(
            res => { return res.json(); },
            err => { alertMsg("讀取英雄列表發生錯誤:", err);
        }).then(function(data){
            this.heros = data;
            this.n_img_to_load = this.heros.length;
        });
    },
    methods: {
        reset: function() {
            this.selected_hero = -1;
        },
        imageLoadedUpdate: function() {
            this.n_img_to_load += 1;
            if(this.n_img_to_load >= this.n_img_loaded){
                this.loading = false;
            }
        },
        selectHero: function(hero_id) {
            this.selected_hero = hero_id;
        }
    },
});

var heroProfile = new Vue({
    el: "#hero-profile",
    data: {
        hero_id: 0,
        profile: null,
        remain_points: 0,
        loading: false,
    },
    methods: {
        //reset heroProfile to initial status
        reset: function() {
            this.profile = null;
            this.remain_points = 0;
            this.hero_id = 0;
        },
        loadHeroProfile: function(hero_id) {
            if(this.hero_id === hero_id) {
                return;
            }
            this.loading = true;
            this.$http.get(`http://hahow-recruit.herokuapp.com/heroes/${hero_id}/profile`).then(
                res => { return res.json(); },
                err => { alertMsg("讀取英雄檔案時發生錯誤:", err);
            }).then(function(data){
                this.profile = data;
                this.hero_id = hero_id;
                this.loading = false;
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
                alertMsg("剩餘點數應為0");
            } else {
                this.$http.patch(`http://hahow-recruit.herokuapp.com/heroes/${this.hero_id}/profile`, this.profile).then(
                    res => { alertMsg('英雄檔案更新成功'); },
                    err => { alertMsg('更新失敗:', err);
                });
            }

        }
    }
});

function alertMsg(msg){
    var el = $(`<div class="alert-message">${msg}</div>`);
    $("#alert-message-container").append(el);
    $(el).fadeIn(500, function() {
        $(this).delay(4000).fadeOut(500, function() {
            $(this).remove();
        });
    });
}

const router = Router({
  "/heros": {
    on: () => {
        heroList.reset()
        heroProfile.reset();
    },
  },
  "/heros/:hero_id": {
    on: (hero_id) => {
        heroList.selectHero(hero_id);
    },
  },
}).configure({
  notfound: () => {
    router.setRoute(`/heros`);
  },
});

// wait the event trigger
router.init(["/"]);
